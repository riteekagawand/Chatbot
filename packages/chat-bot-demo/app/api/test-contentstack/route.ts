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
        // Use simple text search with URL encoding
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
      case 'faq':
        return entry.answer || entry.content || '';
      case 'blog':
        return entry.content || entry.description || '';
      default:
        return entry.content || entry.description || entry.answer || '';
    }
  }
}

interface ContentstackQuery {
  contentType: string;
  query?: string;
  filters?: Record<string, any>;
  limit?: number;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || 'Swiss Alps';
    
    console.log('Testing Contentstack with query:', query);
    
    // Initialize Contentstack service
    const contentstackService = new ContentstackService({
      apiKey: 'blt354ba6a0b8b7e140',
      deliveryToken: 'cs7f1c6103726d54fe1978f31f',
      environment: 'development'
    });

    // Search for tours
    const searchResults = await contentstackService.searchContent({
      contentType: 'tour',
      query: query,
      limit: 5
    });

    console.log('Found results:', searchResults.length);

    // Format response
    const response = `Based on our tour database, here's the information I found for "${query}":\n\n${searchResults.map((item, index) => {
      return `${index + 1}. **${item.title}**\n${item.content}\n`;
    }).join('\n\n')}`;

    return NextResponse.json({ 
      content: response,
      results: searchResults,
      count: searchResults.length
    });

  } catch (error: any) {
    console.error('Test Contentstack error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to test Contentstack' },
      { status: 500 }
    );
  }
}