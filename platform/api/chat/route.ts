import { NextRequest, NextResponse } from 'next/server';
import { llmConfig } from '../../config/llm';
import { contentstackConfig } from '../../config/contentstack';
import { redisCache } from '../../services/cache/redisCache';
import { rateLimiter } from '../../services/rateLimiter';
import { retryService } from '../../services/retryService';
import { relevanceService } from '../../services/relevanceService';

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
    const regionKey = (credentials.region || 'us') as keyof typeof contentstackConfig.regions;
    this.baseUrl = contentstackConfig.regions[regionKey] || contentstackConfig.regions.us;
  }

  async searchContent(query: ContentstackQuery): Promise<ContentstackEntry[]> {
    return retryService.executeWithRetry(
      async () => {
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
      },
      {
        retryCondition: retryService.isRetryableContentstackError
      }
    );
  }

  async searchAllContent(query: string, contentTypes: string[] = ['tour', 'faqs']): Promise<ContentstackEntry[]> {
    // Check cache first
    const cacheKey = redisCache.generateKey(query, contentTypes, this.environment);
    const cachedResult = await redisCache.get(cacheKey);
    
    if (cachedResult) {
      console.log('Cache hit for query:', query);
      return cachedResult;
    }

    console.log('Cache miss, fetching from Contentstack for query:', query);
    const allResults: ContentstackEntry[] = [];
    
    // If no specific content types provided, get all available types
    let typesToSearch = contentTypes;
    if (!contentTypes || contentTypes.length === 0) {
      try {
        typesToSearch = await this.getContentTypes();
        console.log('Auto-detected content types:', typesToSearch);
      } catch (error) {
        console.error('Error getting content types, using defaults:', error);
        typesToSearch = ['tour', 'faqs'];
      }
    }
    
    // Search all content types in parallel for better performance
    const searchPromises = typesToSearch.map(async (contentType) => {
      try {
        const results = await this.searchContent({
          contentType,
          query,
          limit: 5
        });
        return results;
      } catch (error) {
        console.error(`Error searching ${contentType}:`, error);
        return [];
      }
    });
    
    const searchResults = await Promise.all(searchPromises);
    searchResults.forEach(results => allResults.push(...results));
    
    // Apply relevance scoring and ranking
    const scoredResults = relevanceService.calculateRelevance(query, allResults);
    const topResults = relevanceService.getTopResults(scoredResults, 10);
    const rankedResults = topResults.map(scored => scored.entry);
    
    console.log('Relevance scoring applied:', {
      totalResults: allResults.length,
      topResults: rankedResults.length,
      averageScore: relevanceService.getRelevanceSummary(scoredResults).averageScore
    });
    
    // Cache the ranked results for 5 minutes
    await redisCache.set(cacheKey, rankedResults, 5 * 60 * 1000);
    
    return rankedResults;
  }

  async getContentTypes(): Promise<string[]> {
    try {
      const url = `${this.baseUrl}/content_types?environment=${this.environment}`;
      
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
      const contentTypes = data.content_types?.map((ct: any) => ct.uid) || [];
      console.log('Available content types from Contentstack:', contentTypes);
      return contentTypes;
    } catch (error) {
      console.error('Contentstack get content types error:', error);
      return ['tour', 'faq', 'blog']; // Fallback to default types
    }
  }

  private extractContent(entry: any, contentType: string): string {
    // Handle known content types with specific formatting
    switch (contentType) {
      case 'tour':
        return `Title: ${entry.title || 'Untitled Tour'}
Description: ${entry.description || 'No description available'}
Country: ${entry.country || 'Country not specified'}
Price: ${entry.price || 'Price not available'}
Duration: ${entry.duration || 'Duration not specified'}`;
      
      case 'faqs':
        return `Question: ${entry.question || 'No question'}
Answer: ${entry.answers || 'No answer available'}
Category: ${entry.tags ? entry.tags.join(', ') : 'General'}`;
      
      case 'blog':
        return `Title: ${entry.title || 'Untitled Blog Post'}
Content: ${entry.content || 'No content available'}
Author: ${entry.author || 'Unknown author'}
Tags: ${entry.tags ? entry.tags.join(', ') : 'No tags'}`;
      
      case 'product':
        return `Title: ${entry.title || 'Untitled Product'}
Description: ${entry.description || 'No description available'}
Price: ${entry.price || 'Price not available'}
Category: ${entry.category || 'General'}
SKU: ${entry.sku || 'No SKU'}`;
      
      case 'article':
        return `Title: ${entry.title || 'Untitled Article'}
Content: ${entry.content || 'No content available'}
Author: ${entry.author || 'Unknown author'}
Published: ${entry.publish_date || 'No date'}
Tags: ${entry.tags ? entry.tags.join(', ') : 'No tags'}`;
      
      default:
        // Dynamic content extraction for any content type
        const title = entry.title || entry.name || entry.question || 'Untitled';
        const description = entry.description || entry.content || entry.answer || '';
        const additionalFields = this.extractAdditionalFields(entry, contentType);
        
        return `Title: ${title}
${description ? `Description: ${description}` : ''}
${additionalFields}`;
    }
  }

  private extractAdditionalFields(entry: any, contentType: string): string {
    const fields = [];
    
    // Common fields to extract
    const commonFields = ['price', 'location', 'category', 'author', 'tags', 'status', 'date', 'url'];
    
    for (const field of commonFields) {
      if (entry[field] && entry[field] !== '') {
        const value = Array.isArray(entry[field]) 
          ? entry[field].join(', ') 
          : entry[field];
        fields.push(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${value}`);
      }
    }
    
    // Add any other fields that might be relevant
    for (const [key, value] of Object.entries(entry)) {
      if (!commonFields.includes(key) && 
          !['title', 'name', 'question', 'description', 'content', 'answer', 'uid', 'created_at', 'updated_at'].includes(key) &&
          value && value !== '') {
        const displayValue = Array.isArray(value) 
          ? value.join(', ') 
          : String(value);
        if (displayValue.length < 200) { // Only include reasonable length fields
          fields.push(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${displayValue}`);
        }
      }
    }
    
    return fields.length > 0 ? fields.join('\n') : '';
  }
}

// LLM Provider functions with retry mechanisms
async function callOpenAI(message: string, apiKey: string, model: string = 'gpt-3.5-turbo') {
  return retryService.executeWithRetry(
    async () => {
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
    },
    {
      retryCondition: retryService.isRetryableLLMError
    }
  );
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
      contentstackRegion,
      contentTypes,
      stream
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
        environment: contentstackEnvironment || 'development',
        region: contentstackRegion || 'us'
      });
    }

    // Search for relevant content from Contentstack
    let relevantContent = '';
    let searchResults: ContentstackEntry[] = [];
    
    if (contentstackService) {
      try {
        console.log('🔍 Starting Contentstack search for:', message);
        console.log('📋 Content types:', contentTypes || ['tour', 'faqs']);
        
        searchResults = await contentstackService.searchAllContent(
          message, 
          contentTypes || ['tour', 'faqs']
        );
        
        console.log('📊 Search results count:', searchResults.length);
        console.log('📊 Search results:', searchResults.map(r => ({ title: r.title, contentType: r.contentType })));
        
        if (searchResults.length > 0) {
          relevantContent = '\n\nRelevant content from our knowledge base:\n';
          searchResults.forEach((entry, index) => {
            relevantContent += `\n${index + 1}. ${entry.title}\n${entry.content}\n`;
          });
          console.log('📝 Relevant content length:', relevantContent.length);
        } else {
          console.log('⚠️ No search results found');
        }
      } catch (error) {
        console.error('❌ Contentstack search error:', error);
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

    // Resolve provider and model defaults
    let provider = llmProvider;
    let model = llmModel;
    if (llmConfig.providers[provider as keyof typeof llmConfig.providers]) {
      const providerCfg = llmConfig.providers[provider as keyof typeof llmConfig.providers] as any;
      if (!model) {
        model = providerCfg.defaultModel;
      }
    }

    // Make the LLM API call based on the provider
    let response;
    
    try {
      switch (provider) {
        case 'openai':
          response = await callOpenAI(enhancedMessage, llmApiKey, model);
          break;
        case 'groq':
          response = await callGroq(enhancedMessage, llmApiKey, model);
          break;
        case 'anthropic':
          response = await callAnthropic(enhancedMessage, llmApiKey, model);
          break;
        case 'perplexity':
          response = await callPerplexity(enhancedMessage, llmApiKey, model);
          break;
        default:
          return NextResponse.json(
            { error: `Unsupported LLM provider: ${provider}` },
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

    // Streaming support via Server-Sent Events (SSE)
    if (enableStreaming || stream) {
      const encoder = new TextEncoder();
      const streamBody = new ReadableStream({
        start(controller) {
          // Naive chunking of the full response to simulate streaming
          const text = String(response || '');
          const chunkSize = 80;
          let index = 0;
          function pushChunk() {
            if (index >= text.length) {
              controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
              controller.close();
              return;
            }
            const next = text.slice(index, index + chunkSize);
            index += chunkSize;
            const payload = JSON.stringify({ content: next });
            controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
            setTimeout(pushChunk, 20);
          }
          // Also include minimal metadata as first message
          const meta = {
            model: model,
            provider: provider,
            cached: !!(contentstackService && redisCache.has(redisCache.generateKey(message, contentTypes || ['tour', 'faqs'], contentstackEnvironment || 'development')))
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ metadata: meta })}\n\n`));
          pushChunk();
        }
      });

      return new NextResponse(streamBody, {
        status: 200,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
          'X-Accel-Buffering': 'no'
        }
      });
    }

    return NextResponse.json({ 
      content: response,
      searchResults: searchResults.length > 0 ? searchResults : undefined,
      metadata: {
        cached: contentstackService ? await redisCache.has(redisCache.generateKey(message, contentTypes || ['tour', 'faqs'], contentstackEnvironment || 'development')) : false,
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
