import { NextRequest, NextResponse } from 'next/server';
import { contentCache } from '../../services/cache/contentCache';
import { rateLimiter } from '../../services/rateLimiter';

// Contentstack service interfaces and implementation
interface ContentstackCredentials {
  apiKey: string;
  deliveryToken: string;
  environment?: string;
  region?: string;
}

interface ContentstackEntry {
  uid: string;
  title: string;
  content: string;
  contentType: string;
  metadata: Record<string, any>;
  url?: string;
}

interface ContentstackQuery {
  contentType: string;
  query?: string;
  filters?: Record<string, any>;
  limit?: number;
}

class ContentstackService {
  private apiKey: string;
  private deliveryToken: string;
  private environment: string;
  private baseUrl: string;

  constructor(credentials: ContentstackCredentials) {
    this.apiKey = credentials.apiKey;
    this.deliveryToken = credentials.deliveryToken;
    this.environment = credentials.environment || 'development';
    this.baseUrl = 'https://eu-cdn.contentstack.com/v3';
  }

  async searchContent(query: ContentstackQuery): Promise<ContentstackEntry[]> {
    try {
      const contentType = query.contentType;
      const searchQuery = query.query || '';
      const limit = query.limit || 10;
      
      let url = `${this.baseUrl}/content_types/${contentType}/entries?environment=${this.environment}&limit=${limit}`;
      
      if (searchQuery) {
        const query = JSON.stringify({"title":{"$regex":searchQuery,"$options":"i"}});
        url += `&query=${encodeURIComponent(query)}`;
      }

      if (query.filters) {
        const filterQuery = JSON.stringify(query.filters);
        url += `&query=${filterQuery}`;
      }

      const response = await fetch(url, {
        headers: {
          'api_key': this.apiKey,
          'access_token': this.deliveryToken,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Contentstack API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.entries?.map((entry: any) => ({
        uid: entry.uid,
        title: entry.title || entry.question || 'Untitled',
        content: this.extractContent(entry, contentType),
        contentType: contentType,
        metadata: {
          ...entry,
          url: entry.url || `/${contentType}/${entry.uid}`
        }
      })) || [];

    } catch (error) {
      console.error('Contentstack search error:', error);
      throw new Error(`Failed to search content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async searchAllContent(query: string, contentTypes: string[] = ['tour', 'faq', 'blog']): Promise<ContentstackEntry[]> {
    // Check cache first
    const cacheKey = contentCache.generateKey(query, contentTypes, this.environment);
    const cachedResult = contentCache.get(cacheKey);
    
    if (cachedResult) {
      console.log('Cache hit for query:', query);
      return cachedResult;
    }

    console.log('Cache miss, fetching from Contentstack for query:', query);
    const allResults: ContentstackEntry[] = [];
    
    for (const contentType of contentTypes) {
      try {
        const results = await this.searchContent({
          contentType,
          query,
          limit: 5
        });
        allResults.push(...results);
      } catch (error) {
        console.error(`Error searching ${contentType}:`, error);
        // Continue with other content types
      }
    }
    
    // Cache the results for 5 minutes
    contentCache.set(cacheKey, allResults, 5 * 60 * 1000);
    
    return allResults;
  }

  private extractContent(entry: any, contentType: string): string {
    switch (contentType) {
      case 'tour':
        return `Title: ${entry.title || 'Untitled Tour'}
Description: ${entry.description || 'No description available'}
Location: ${entry.location || 'Location not specified'}
Price: ${entry.price || 'Price not available'}
Duration: ${entry.duration || 'Duration not specified'}`;
      
      case 'faq':
        return `Question: ${entry.question || 'No question'}
Answer: ${entry.answer || 'No answer available'}
Category: ${entry.category || 'General'}`;
      
      case 'blog':
        return `Title: ${entry.title || 'Untitled Blog Post'}
Content: ${entry.content || 'No content available'}
Author: ${entry.author || 'Unknown author'}
Tags: ${entry.tags ? entry.tags.join(', ') : 'No tags'}`;
      
      default:
        return `Title: ${entry.title || 'Untitled'}
Content: ${JSON.stringify(entry, null, 2)}`;
    }
  }
}

// LLM Provider functions
async function callOpenAI(message: string, apiKey: string, model: string = 'gpt-3.5-turbo') {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: message }],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGroq(message: string, apiKey: string, model: string = 'llama3-8b-8192') {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: message }],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callAnthropic(message: string, apiKey: string, model: string = 'claude-3-sonnet-20240229') {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 1000,
      messages: [{ role: 'user', content: message }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

async function callPerplexity(message: string, apiKey: string, model: string = 'llama-3.1-sonar-small-128k-online') {
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
      headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: message }],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`Perplexity API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function POST(req: NextRequest) {
  try {
    const { 
      message, 
      llmProvider, 
      llmApiKey, 
      llmModel, 
      enableStreaming,
      contentstackApiKey,
      contentstackToken,
      contentstackEnvironment,
      contentTypes
    } = await req.json();

    if (!message || !llmProvider || !llmApiKey) {
      return NextResponse.json(
        { error: 'Missing required parameters: message, llmProvider, llmApiKey' },
        { status: 400 }
      );
    }

    // Rate limiting check
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const rateLimitKey = `api:${clientIP}`;
    
    if (!rateLimiter.isAllowed(rateLimitKey)) {
      const remainingTime = rateLimiter.getTimeUntilReset(rateLimitKey);
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.ceil(remainingTime / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil(remainingTime / 1000).toString()
          }
        }
      );
    }

    // Initialize Contentstack service if credentials are provided
    let contentstackService = null;
    
    if (contentstackApiKey && contentstackToken) {
      contentstackService = new ContentstackService({
        apiKey: contentstackApiKey,
        deliveryToken: contentstackToken,
        environment: contentstackEnvironment || 'development'
      });
    }

    // Search for relevant content from Contentstack
    let relevantContent = '';
    let searchResults: ContentstackEntry[] = [];
    
    if (contentstackService) {
      try {
        searchResults = await contentstackService.searchAllContent(
          message, 
          contentTypes || ['tour', 'faq', 'blog']
        );
        
        if (searchResults.length > 0) {
          relevantContent = '\n\nRelevant content from our knowledge base:\n';
          searchResults.forEach((entry, index) => {
            relevantContent += `\n${index + 1}. ${entry.title}\n${entry.content}\n`;
          });
        }
      } catch (error) {
        console.error('Contentstack search error:', error);
        // Continue without content if search fails
      }
    }

    // Create system prompt
    const systemPrompt = `You are a helpful assistant for a travel and tourism website. 
    You have access to information about tours, frequently asked questions, and blog posts.
    Please provide helpful, accurate, and engaging responses based on the available information.
    If you don't have specific information about something, please say so clearly.`;

    // Enhance the message with relevant content and system prompt
    const enhancedMessage = `${systemPrompt}\n\nUser question: ${message}${relevantContent}`;

    // Make the LLM API call based on the provider
    let response;
    
    try {
      switch (llmProvider) {
        case 'openai':
          response = await callOpenAI(enhancedMessage, llmApiKey, llmModel);
          break;
        case 'groq':
          response = await callGroq(enhancedMessage, llmApiKey, llmModel);
          break;
        case 'anthropic':
          response = await callAnthropic(enhancedMessage, llmApiKey, llmModel);
          break;
        case 'perplexity':
          response = await callPerplexity(enhancedMessage, llmApiKey, llmModel);
          break;
        default:
          return NextResponse.json(
            { error: `Unsupported LLM provider: ${llmProvider}` },
            { status: 400 }
          );
      }
    } catch (llmError) {
      console.log('LLM API error, returning Contentstack data directly:', llmError.message);
      
      // If we have Contentstack results, return them directly
      if (searchResults.length > 0) {
        response = `Based on our available information:\n\n${searchResults.map((entry, index) => 
          `${index + 1}. ${entry.title}\n${entry.content}\n`
        ).join('\n')}`;
      } else {
        throw llmError;
      }
    }

    return NextResponse.json({ 
      content: response,
      searchResults: searchResults.length > 0 ? searchResults : undefined,
      metadata: {
        cached: contentstackService ? contentCache.has(contentCache.generateKey(message, contentTypes || ['tour', 'faq', 'blog'], contentstackEnvironment || 'development')) : false,
        rateLimitRemaining: rateLimiter.getRemainingRequests(rateLimitKey)
      }
    });

  } catch (err: any) {
    console.error('API Error:', err);
    
    // Enhanced error handling with specific error types
    if (err.message.includes('Rate limit')) {
      return NextResponse.json({ 
        error: 'Service temporarily unavailable due to high demand. Please try again in a few minutes.',
        type: 'RATE_LIMIT'
      }, { status: 429 });
    }
    
    if (err.message.includes('API key') || err.message.includes('Unauthorized')) {
      return NextResponse.json({ 
        error: 'Invalid API credentials. Please check your API key and try again.',
        type: 'AUTH_ERROR'
      }, { status: 401 });
    }
    
    if (err.message.includes('Contentstack')) {
      return NextResponse.json({ 
        error: 'Content service temporarily unavailable. Please try again later.',
        type: 'CONTENT_ERROR'
      }, { status: 503 });
    }
    
    if (err.message.includes('timeout') || err.message.includes('ECONNRESET')) {
      return NextResponse.json({ 
        error: 'Request timeout. Please try again.',
        type: 'TIMEOUT_ERROR'
      }, { status: 408 });
    }
    
    // Generic error fallback
    return NextResponse.json({ 
      error: 'An unexpected error occurred. Please try again later.',
      type: 'UNKNOWN_ERROR',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }, { status: 500 });
  }
}
