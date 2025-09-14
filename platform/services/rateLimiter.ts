interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();
  private defaultLimits = {
    requestsPerMinute: 60,
    tokensPerMinute: 100000
  };

  // Check if request is within rate limits
  isAllowed(key: string, limits: { requestsPerMinute?: number; tokensPerMinute?: number } = {}): boolean {
    const now = Date.now();
    const requestsPerMinute = limits.requestsPerMinute || this.defaultLimits.requestsPerMinute;
    const tokensPerMinute = limits.tokensPerMinute || this.defaultLimits.tokensPerMinute;
    
    const entry = this.limits.get(key);
    
    if (!entry) {
      // First request
      this.limits.set(key, {
        count: 1,
        resetTime: now + 60000 // Reset in 1 minute
      });
      return true;
    }

    // Check if window has expired
    if (now > entry.resetTime) {
      // Reset the counter
      this.limits.set(key, {
        count: 1,
        resetTime: now + 60000
      });
      return true;
    }

    // Check if within limits
    if (entry.count >= requestsPerMinute) {
      return false;
    }

    // Increment counter
    entry.count++;
    return true;
  }

  // Get remaining requests for a key
  getRemainingRequests(key: string, requestsPerMinute: number = this.defaultLimits.requestsPerMinute): number {
    const entry = this.limits.get(key);
    
    if (!entry) {
      return requestsPerMinute;
    }

    const now = Date.now();
    if (now > entry.resetTime) {
      return requestsPerMinute;
    }

    return Math.max(0, requestsPerMinute - entry.count);
  }

  // Get time until reset
  getTimeUntilReset(key: string): number {
    const entry = this.limits.get(key);
    
    if (!entry) {
      return 0;
    }

    const now = Date.now();
    return Math.max(0, entry.resetTime - now);
  }

  // Clear expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(key);
      }
    }
  }

  // Get all active limits
  getStats(): Record<string, RateLimitEntry> {
    return Object.fromEntries(this.limits.entries());
  }
}

export const rateLimiter = new RateLimiter();

// Cleanup expired entries every 5 minutes
setInterval(() => {
  rateLimiter.cleanup();
}, 5 * 60 * 1000);

