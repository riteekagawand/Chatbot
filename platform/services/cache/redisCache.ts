interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
}

class RedisCache {
  private redis: any = null;
  private isConnected: boolean = false;
  private fallbackCache: Map<string, CacheEntry> = new Map();
  private defaultTTL: number = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.initializeRedis();
  }

  private async initializeRedis() {
    try {
      // Try to import Redis (will work if redis is installed)
      const redis = await import('redis');
      this.redis = redis.createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
      });
      
      this.redis.on('error', (err: Error) => {
        console.warn('Redis connection error, falling back to in-memory cache:', err.message);
        this.isConnected = false;
      });
      
      this.redis.on('connect', () => {
        console.log('✅ Redis connected successfully');
        this.isConnected = true;
      });
      
      await this.redis.connect();
    } catch (error) {
      console.warn('Redis not available, using in-memory cache:', error);
      this.isConnected = false;
    }
  }

  async set(key: string, data: any, ttl?: number): Promise<void> {
    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    };

    if (this.isConnected && this.redis) {
      try {
        await this.redis.setEx(key, Math.ceil((ttl || this.defaultTTL) / 1000), JSON.stringify(entry));
        return;
      } catch (error) {
        console.warn('Redis set failed, using fallback cache:', error);
      }
    }

    // Fallback to in-memory cache
    this.fallbackCache.set(key, entry);
  }

  async get(key: string): Promise<any | null> {
    if (this.isConnected && this.redis) {
      try {
        const cached = await this.redis.get(key);
        if (cached) {
          const entry: CacheEntry = JSON.parse(cached);
          if (Date.now() - entry.timestamp < entry.ttl) {
            return entry.data;
          } else {
            await this.redis.del(key);
          }
        }
        return null;
      } catch (error) {
        console.warn('Redis get failed, using fallback cache:', error);
      }
    }

    // Fallback to in-memory cache
    const entry = this.fallbackCache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.fallbackCache.delete(key);
      return null;
    }

    return entry.data;
  }

  async has(key: string): Promise<boolean> {
    const result = await this.get(key);
    return result !== null;
  }

  async delete(key: string): Promise<boolean> {
    if (this.isConnected && this.redis) {
      try {
        const result = await this.redis.del(key);
        return result > 0;
      } catch (error) {
        console.warn('Redis delete failed, using fallback cache:', error);
      }
    }

    return this.fallbackCache.delete(key);
  }

  async clear(): Promise<void> {
    if (this.isConnected && this.redis) {
      try {
        await this.redis.flushAll();
        return;
      } catch (error) {
        console.warn('Redis clear failed, using fallback cache:', error);
      }
    }

    this.fallbackCache.clear();
  }

  generateKey(query: string, contentTypes: string[], environment: string): string {
    const sortedTypes = contentTypes.sort().join(',');
    return `contentstack:${environment}:${sortedTypes}:${query}`;
  }

  async getStats(): Promise<{ type: string; size: number; keys?: string[] }> {
    if (this.isConnected && this.redis) {
      try {
        const keys = await this.redis.keys('contentstack:*');
        return {
          type: 'redis',
          size: keys.length,
          keys: keys.slice(0, 10) // Show first 10 keys
        };
      } catch (error) {
        console.warn('Redis stats failed:', error);
      }
    }

    return {
      type: 'memory',
      size: this.fallbackCache.size,
      keys: Array.from(this.fallbackCache.keys()).slice(0, 10)
    };
  }

  async disconnect(): Promise<void> {
    if (this.isConnected && this.redis) {
      try {
        await this.redis.quit();
        this.isConnected = false;
      } catch (error) {
        console.warn('Redis disconnect failed:', error);
      }
    }
  }
}

export const redisCache = new RedisCache();
