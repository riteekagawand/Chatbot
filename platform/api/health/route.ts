import { NextRequest, NextResponse } from 'next/server';
import { contentCache } from '../../services/cache/contentCache';
import { rateLimiter } from '../../services/rateLimiter';

export async function GET(req: NextRequest) {
  try {
    const cacheStats = contentCache.getStats();
    const rateLimitStats = rateLimiter.getStats();
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        cache: {
          status: 'operational',
          entries: cacheStats.size,
          keys: cacheStats.keys.slice(0, 5) // Show first 5 keys for debugging
        },
        rateLimiter: {
          status: 'operational',
          activeLimits: Object.keys(rateLimitStats).length,
          limits: rateLimitStats
        },
        api: {
          status: 'operational',
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          version: process.version
        }
      },
      environment: process.env.NODE_ENV || 'development'
    };

    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      services: {
        cache: { status: 'error' },
        rateLimiter: { status: 'error' },
        api: { status: 'error' }
      }
    }, { status: 503 });
  }
}

