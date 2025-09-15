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

  async getContentByType(contentType: string, limit: number = 10): Promise<ContentstackEntry[]> {
    return this.searchContent({ contentType, limit });
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
      return data.content_types?.map((ct: any) => ct.uid) || [];
    } catch (error) {
      console.error('Contentstack get content types error:', error);
      return ['tour', 'faq', 'blog']; // Fallback to default types
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
    const action = searchParams.get('action') || 'all'; // 'all', 'types', 'content'
    const contentType = searchParams.get('type') || '';
    const query = searchParams.get('q') || '';
    
    console.log('Contentstack action:', action);
    
    // Initialize Contentstack service
    const contentstackService = new ContentstackService({
      apiKey: 'blt354ba6a0b8b7e140',
      deliveryToken: 'cs7f1c6103726d54fe1978f31f',
      environment: 'development'
    });

    if (action === 'types') {
      // Get all content types
      const contentTypes = await contentstackService.getContentTypes();
      console.log('Found content types:', contentTypes);
      
      return NextResponse.json({ 
        contentTypes,
        count: contentTypes.length,
        message: `Found ${contentTypes.length} content types in your Contentstack space`
      });
    }

    if (action === 'content' && contentType) {
      // Get content for specific type
      const contentResults = await contentstackService.getContentByType(contentType, 50);
      console.log(`Found ${contentResults.length} entries for ${contentType}`);
      
      return NextResponse.json({ 
        contentType,
        entries: contentResults,
        count: contentResults.length,
        message: `Found ${contentResults.length} entries for content type: ${contentType}`
      });
    }

    if (action === 'all') {
      // Get all content types and their content
      const contentTypes = await contentstackService.getContentTypes();
      console.log('Found content types:', contentTypes);
      
      const allContent: Record<string, any[]> = {};
      const contentSummary: Record<string, any> = {};
      
      for (const type of contentTypes) {
        try {
          const entries = await contentstackService.getContentByType(type, 20);
          allContent[type] = entries;
          contentSummary[type] = {
            count: entries.length,
            sampleFields: entries.length > 0 ? Object.keys(entries[0].metadata) : [],
            lastModified: entries.length > 0 ? entries[0].metadata.updated_at : null
          };
          console.log(`Fetched ${entries.length} entries for ${type}`);
        } catch (error) {
          console.warn(`Failed to fetch content for ${type}:`, error);
          allContent[type] = [];
          contentSummary[type] = { count: 0, error: error instanceof Error ? error.message : 'Unknown error' };
        }
      }

      // Create detailed response
      const response = `# Contentstack Content Analysis

## Content Types Found: ${contentTypes.length}

${contentTypes.map((type: string) => {
  const summary = contentSummary[type];
  return `### ${type.toUpperCase()}
- **Entries**: ${summary.count}
- **Sample Fields**: ${summary.sampleFields?.join(', ') || 'N/A'}
- **Last Modified**: ${summary.lastModified || 'N/A'}
${summary.error ? `- **Error**: ${summary.error}` : ''}`;
}).join('\n\n')}

## Detailed Content by Type

${Object.entries(allContent).map(([type, entries]) => {
  if (entries.length === 0) return `### ${type.toUpperCase()}\nNo content found or error occurred.\n`;
  
  return `### ${type.toUpperCase()} (${entries.length} entries)
${entries.slice(0, 3).map((entry, index) => {
  return `${index + 1}. **${entry.title}**
   - UID: ${entry.uid}
   - Content: ${entry.content.substring(0, 200)}${entry.content.length > 200 ? '...' : ''}
   - Metadata: ${JSON.stringify(entry.metadata, null, 2).substring(0, 300)}${JSON.stringify(entry.metadata).length > 300 ? '...' : ''}`;
}).join('\n\n')}
${entries.length > 3 ? `\n... and ${entries.length - 3} more entries` : ''}`;
}).join('\n\n')}`;

      return NextResponse.json({ 
        content: response,
        contentTypes,
        contentSummary,
        allContent,
        totalEntries: Object.values(allContent).reduce((sum, entries) => sum + entries.length, 0),
        message: `Analyzed ${contentTypes.length} content types with ${Object.values(allContent).reduce((sum, entries) => sum + entries.length, 0)} total entries`
      });
    }

    // Default: search with query
    const searchResults = await contentstackService.searchContent({
      contentType: 'tour',
      query: query || 'Swiss Alps',
      limit: 5
    });

    console.log('Found results:', searchResults.length);

    const response = `Based on our tour database, here's the information I found for "${query || 'Swiss Alps'}":\n\n${searchResults.map((item, index) => {
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