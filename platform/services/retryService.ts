interface RetryOptions {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryCondition?: (error: any) => boolean;
}

class RetryService {
  private defaultOptions: RetryOptions = {
    maxAttempts: 3,
    baseDelay: 1000, // 1 second
    maxDelay: 10000, // 10 seconds
    backoffMultiplier: 2
  };

  async executeWithRetry<T>(
    operation: () => Promise<T>,
    options: Partial<RetryOptions> = {}
  ): Promise<T> {
    const config = { ...this.defaultOptions, ...options };
    let lastError: any;

    for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
      try {
        const result = await operation();
        
        if (attempt > 1) {
          console.log(`✅ Operation succeeded on attempt ${attempt}`);
        }
        
        return result;
      } catch (error) {
        lastError = error;
        
        // Check if we should retry this error
        if (config.retryCondition && !config.retryCondition(error)) {
          console.log(`❌ Error not retryable: ${error.message}`);
          throw error;
        }

        if (attempt === config.maxAttempts) {
          console.log(`❌ Operation failed after ${config.maxAttempts} attempts`);
          throw error;
        }

        const delay = Math.min(
          config.baseDelay * Math.pow(config.backoffMultiplier, attempt - 1),
          config.maxDelay
        );

        console.log(`⚠️ Attempt ${attempt} failed: ${error.message}. Retrying in ${delay}ms...`);
        await this.sleep(delay);
      }
    }

    throw lastError;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Specific retry conditions for different services
  isRetryableContentstackError(error: any): boolean {
    const retryableErrors = [
      'ECONNRESET',
      'ETIMEDOUT',
      'ENOTFOUND',
      'ECONNREFUSED',
      'timeout',
      'network',
      'temporary'
    ];

    const errorMessage = error.message?.toLowerCase() || '';
    return retryableErrors.some(retryableError => 
      errorMessage.includes(retryableError)
    );
  }

  isRetryableLLMError(error: any): boolean {
    const retryableErrors = [
      'rate limit',
      'timeout',
      'network',
      'temporary',
      'service unavailable',
      '502',
      '503',
      '504'
    ];

    const errorMessage = error.message?.toLowerCase() || '';
    return retryableErrors.some(retryableError => 
      errorMessage.includes(retryableError)
    );
  }

  // Circuit breaker pattern
  private circuitBreakerStates = new Map<string, {
    state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
    failureCount: number;
    lastFailureTime: number;
    successCount: number;
  }>();

  async executeWithCircuitBreaker<T>(
    key: string,
    operation: () => Promise<T>,
    options: {
      failureThreshold: number;
      recoveryTimeout: number;
      successThreshold: number;
    } = {
      failureThreshold: 5,
      recoveryTimeout: 60000, // 1 minute
      successThreshold: 3
    }
  ): Promise<T> {
    const state = this.circuitBreakerStates.get(key) || {
      state: 'CLOSED' as const,
      failureCount: 0,
      lastFailureTime: 0,
      successCount: 0
    };

    // Check if circuit is open
    if (state.state === 'OPEN') {
      if (Date.now() - state.lastFailureTime > options.recoveryTimeout) {
        state.state = 'HALF_OPEN';
        state.successCount = 0;
        console.log(`🔄 Circuit breaker for ${key} moved to HALF_OPEN`);
      } else {
        throw new Error(`Circuit breaker is OPEN for ${key}. Service temporarily unavailable.`);
      }
    }

    try {
      const result = await operation();
      
      // Success - reset failure count
      state.failureCount = 0;
      state.successCount++;
      
      if (state.state === 'HALF_OPEN' && state.successCount >= options.successThreshold) {
        state.state = 'CLOSED';
        console.log(`✅ Circuit breaker for ${key} moved to CLOSED`);
      }
      
      this.circuitBreakerStates.set(key, state);
      return result;
    } catch (error) {
      state.failureCount++;
      state.lastFailureTime = Date.now();
      
      if (state.failureCount >= options.failureThreshold) {
        state.state = 'OPEN';
        console.log(`❌ Circuit breaker for ${key} moved to OPEN`);
      }
      
      this.circuitBreakerStates.set(key, state);
      throw error;
    }
  }
}

export const retryService = new RetryService();
