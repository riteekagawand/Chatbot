import { NextRequest, NextResponse } from 'next/server';

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
        // Use different search fields based on content type
        let searchField = "title";
        if (contentType === 'faqs') {
          searchField = "question";
        }
        
        const query = JSON.stringify({[searchField]:{"$regex":searchQuery,"$options":"i"}});
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
        title: contentType === 'faqs' ? (entry.question || 'Untitled') : (entry.title || 'Untitled'),
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

  async searchAllContent(query: string, contentTypes: string[] = ['tour', 'faqs']): Promise<ContentstackEntry[]> {
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
        console.warn(`Failed to search ${contentType}:`, error);
      }
    }
    
    return allResults;
  }

  // Enhanced search with location and preference filtering
  async searchToursWithPreferences(query: string, preferences?: {
    location?: string;
    budget?: string;
    duration?: string;
    difficulty?: string;
    season?: string;
  }): Promise<ContentstackEntry[]> {
    try {
      // Start with general search
      let searchQuery = query;
      
      // Add location filter if specified
      if (preferences?.location) {
        searchQuery += ` ${preferences.location}`;
      }
      
      // Search for tours
      const results = await this.searchContent({
        contentType: 'tour',
        query: searchQuery,
        limit: 10
      });
      
      // Filter results based on preferences
      let filteredResults = results;
      
      if (preferences?.budget) {
        filteredResults = filteredResults.filter(tour => {
          const price = tour.metadata.price;
          if (!price) return true;
          
          const priceNum = parseFloat(price.replace(/[^0-9.]/g, ''));
          if (isNaN(priceNum)) return true;
          
          if (preferences.budget === 'low' && priceNum < 100) return true;
          if (preferences.budget === 'medium' && priceNum >= 100 && priceNum < 500) return true;
          if (preferences.budget === 'high' && priceNum >= 500) return true;
          
          return false;
        });
      }
      
      if (preferences?.duration) {
        filteredResults = filteredResults.filter(tour => {
          const duration = tour.metadata.duration;
          if (!duration) return true;
          
          const durationLower = duration.toLowerCase();
          if (preferences.duration === 'short' && (durationLower.includes('day') || durationLower.includes('hour'))) return true;
          if (preferences.duration === 'medium' && durationLower.includes('week')) return true;
          if (preferences.duration === 'long' && (durationLower.includes('month') || durationLower.includes('extended'))) return true;
          
          return false;
        });
      }
      
      return filteredResults.slice(0, 5); // Return top 5 results
    } catch (error) {
      console.error('Enhanced tour search failed:', error);
      return [];
    }
  }

  private extractContent(entry: any, contentType: string): string {
    switch (contentType) {
      case 'tour':
        const tourInfo = [];
        if (entry.description) tourInfo.push(`Description: ${entry.description}`);
        if (entry.location) tourInfo.push(`Location: ${entry.location}`);
        if (entry.price) tourInfo.push(`Price: ${entry.price}`);
        if (entry.duration) tourInfo.push(`Duration: ${entry.duration}`);
        if (entry.difficulty) tourInfo.push(`Difficulty: ${entry.difficulty}`);
        if (entry.highlights && Array.isArray(entry.highlights)) {
          tourInfo.push(`Highlights: ${entry.highlights.join(', ')}`);
        }
        if (entry.included && Array.isArray(entry.included)) {
          tourInfo.push(`Included: ${entry.included.join(', ')}`);
        }
        if (entry.requirements) tourInfo.push(`Requirements: ${entry.requirements}`);
        if (entry.season) tourInfo.push(`Best Season: ${entry.season}`);
        return tourInfo.join('. ') + (tourInfo.length > 0 ? '.' : '');
      case 'faqs':
        return entry.answers || entry.content || '';
      case 'blog':
        return entry.content || entry.description || '';
      default:
        return entry.content || entry.description || entry.answer || '';
    }
  }
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

    // Initialize Contentstack service if credentials are provided
    let contentstackService = null;
    console.log('Contentstack credentials check:', {
      hasApiKey: !!contentstackApiKey,
      hasToken: !!contentstackToken,
      environment: contentstackEnvironment
    });
    
    if (contentstackApiKey && contentstackToken) {
      console.log('Initializing Contentstack service...');
      contentstackService = new ContentstackService({
        apiKey: contentstackApiKey,
        deliveryToken: contentstackToken,
        environment: contentstackEnvironment || 'development'
      });
      console.log('Contentstack service initialized successfully');
    } else {
      console.log('Contentstack service not initialized - missing credentials');
    }

    // Search for relevant content from Contentstack
    let relevantContent = '';
    let searchResults: ContentstackEntry[] = [];
    
    // Check if this is a tour-related query
    const isTourQuery = /\b(tour|trip|travel|visit|explore|adventure|journey|excursion|destination|vacation|holiday|swiss|alps|price|cost)\b/i.test(message);
    
    if (contentstackService) {
      try {
        console.log('Searching Contentstack for:', message);
        
        if (isTourQuery) {
          console.log('Detected tour query, searching tours');
          
          // Extract key terms from the message for better searching
          const keyTerms = message.toLowerCase().match(/\b(swiss|alps|adventure|tour|price|cost|matterhorn|jungfraujoch|zermatt|interlaken|dolomites|italy|austria|hallstatt|salzburg)\b/g) || [];
          console.log('Key terms found:', keyTerms);
          
          let searchQuery = message;
          if (keyTerms.length > 0) {
            // Use the first key term that might match
            searchQuery = keyTerms.find(term => ['swiss', 'alps', 'adventure', 'tour', 'dolomites', 'italy', 'austria'].includes(term)) || keyTerms[0];
            console.log('Using search query:', searchQuery);
          }
          
          // Search for tours and FAQs
          const tourResults = await contentstackService.searchContent({
            contentType: 'tour',
            query: searchQuery,
            limit: 5
          });
          
          const faqResults = await contentstackService.searchContent({
            contentType: 'faqs',
            query: searchQuery,
            limit: 3
          });
          
          searchResults.push(...tourResults, ...faqResults);
          console.log('Tour search results:', tourResults.length);
          console.log('FAQ search results:', faqResults.length);
          console.log('Total search results:', searchResults.length);
        } else {
          console.log('Non-tour query, searching all content types');
          // For general questions, search all available content types
          const allResults = await contentstackService.searchAllContent(message, contentTypes || ['tour', 'faqs']);
          searchResults.push(...allResults);
          console.log('General search results (all content):', searchResults.length);
          
          // If no results found, try with broader search terms
          if (searchResults.length === 0) {
            console.log('No results found, trying broader search...');
            
            // Extract key terms and try individual searches with fuzzy matching
            const keyTerms = message.toLowerCase().match(/\b(accommodation|accomodation|hotel|refund|insurance|flight|booking|emergency|contact|tour|travel|swiss|alps|italy|france)\b/g) || [];
            console.log('Key terms found:', keyTerms);
            
            // Map common typos to correct terms
            const termMappings = {
              'accomodation': 'accommodation',
              'accomodations': 'accommodation',
              'accomodate': 'accommodation'
            };
            
            for (const term of keyTerms) {
              const searchTerm = termMappings[term] || term;
              console.log(`Searching for: ${searchTerm} (original: ${term})`);
              
              const termResults = await contentstackService.searchAllContent(searchTerm, contentTypes || ['tour', 'faqs']);
              searchResults.push(...termResults);
              if (searchResults.length > 0) break; // Stop at first successful search
            }
            
            console.log('Broader search results:', searchResults.length);
          }
        }
        
        if (searchResults.length > 0) {
          console.log('Found Contentstack results:', searchResults.map(r => ({ title: r.title, contentType: r.contentType })));
        } else {
          console.log('No Contentstack results found');
        }
      } catch (error) {
        console.error('Contentstack search failed:', error);
        searchResults = [];
      }
    } else {
      console.log('Contentstack service not initialized');
    }
    
    // Format the relevant content
    if (searchResults.length > 0) {
      console.log('Found results:', searchResults.map(r => ({ title: r.title, contentType: r.contentType })));
      relevantContent = '\n\nRelevant content from our tour database:\n';
      searchResults.slice(0, 3).forEach((item, index) => {
        relevantContent += `${index + 1}. ${item.title}\n${item.content}\n\n`;
      });
    } else {
      console.log('No results found in Contentstack or mock data');
      if (isTourQuery) {
        relevantContent = '\n\nNote: I don\'t have specific information about this tour in our current database, but I can still help you with general travel advice and suggestions!';
      } else {
        relevantContent = '\n\nNote: I can provide general travel advice and suggestions. For specific tour information, please ensure the Contentstack CMS is properly configured.';
      }
    }

    // Create a system prompt for tour assistance
    const systemPrompt = `You are a helpful travel assistant for a tourism portal. You help users find information about tours, destinations, and travel experiences. 

When users ask about tours, you should:
- Provide detailed information about available tours from the knowledge base
- Suggest tours based on their interests, location preferences, and budget
- Help them compare different tour options
- Answer questions about tour details, requirements, and logistics
- Be enthusiastic and helpful about travel experiences

If you have relevant tour information from the knowledge base, use it to provide specific, helpful answers. If you don't have specific tour information, you can still provide general travel advice and suggestions.`;

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
        case 'xai':
          response = await callXAI(enhancedMessage, llmApiKey, llmModel);
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
        let directResponse;
        
        // Check if this is a general question about tours
        const isGeneralTourQuestion = /\b(how many|how much|what tours|list tours|show tours|available tours|all tours)\b/i.test(message);
        
        if (isGeneralTourQuestion) {
          directResponse = `We have ${searchResults.length} tours available in our database:\n\n${searchResults.map((item, index) => {
            return `${index + 1}. **${item.title}**\n${item.content}\n`;
          }).join('\n\n')}\n\nWould you like more details about any specific tour?`;
        } else {
          directResponse = `Based on our tour database, here's the information I found:\n\n${searchResults.map((item, index) => {
            return `${index + 1}. **${item.title}**\n${item.content}\n`;
          }).join('\n\n')}`;
        }
        
        return NextResponse.json({ 
          content: directResponse,
          searchResults: searchResults,
          usage: undefined
        });
      } else {
        // If no Contentstack results, return a helpful message
        return NextResponse.json({ 
          content: "I'm having trouble accessing our tour database right now, but I can still help you with general travel advice. Please try again later or contact our support team for immediate assistance.",
          usage: undefined
        });
      }
    }

    return NextResponse.json({ 
      content: response,
      searchResults: searchResults.length > 0 ? searchResults : undefined,
      usage: undefined // Could be added later if needed
    });

  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

async function callOpenAI(message: string, apiKey: string, model?: string) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful travel assistant for a tourism portal. You help users find information about tours, destinations, and travel experiences.' },
          { role: 'user', content: message }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.log('OpenAI API call failed:', error.message);
    throw error;
  }
}

async function callGroq(message: string, apiKey: string, model?: string) {
  // Debug: Log the API key format (first 10 chars only for security)
  console.log(`Groq API key format: ${apiKey.substring(0, 10)}... (length: ${apiKey.length})`);
  
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model || 'llama3-8b-8192',
      messages: [
        { role: 'system', content: 'You are a helpful travel assistant for a tourism portal. You help users find information about tours, destinations, and travel experiences.' },
        { role: 'user', content: message }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log('Groq API error details:', errorData);
    throw new Error(`Groq API error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callAnthropic(message: string, apiKey: string, model?: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: model || 'claude-3-haiku-20240307',
      max_tokens: 1000,
      messages: [
        { role: 'user', content: `You are a helpful travel assistant for a tourism portal. You help users find information about tours, destinations, and travel experiences.\n\n${message}` }
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Anthropic API error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

async function callPerplexity(message: string, apiKey: string, model?: string) {
  // Debug: Log the API key format (first 10 chars only for security)
  console.log(`Perplexity API key format: ${apiKey.substring(0, 10)}... (length: ${apiKey.length})`);
  
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model || 'llama-3.1-sonar-small-128k-online',
      messages: [
        { role: 'system', content: 'You are a helpful travel assistant for a tourism portal. You help users find information about tours, destinations, and travel experiences.' },
        { role: 'user', content: message }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log('Perplexity API error details:', errorData);
    throw new Error(`Perplexity API error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callXAI(message: string, apiKey: string, model?: string) {
  // Debug: Log the API key format (first 10 chars only for security)
  console.log(`xAI API key format: ${apiKey.substring(0, 10)}... (length: ${apiKey.length})`);
  
  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model || 'grok-beta',
      messages: [
        { role: 'system', content: 'You are a helpful travel assistant for a tourism portal. You help users find information about tours, destinations, and travel experiences.' },
        { role: 'user', content: message }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log('xAI API error details:', errorData);
    throw new Error(`xAI API error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
