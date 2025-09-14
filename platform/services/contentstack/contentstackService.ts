import { contentstackConfig } from '../../config/contentstack';

export interface ContentstackCredentials {
  apiKey: string;
  deliveryToken: string;
  environment?: string;
  region?: string;
}

export interface ContentstackEntry {
  uid: string;
  title: string;
  content: string;
  contentType: string;
  metadata: Record<string, any>;
  url?: string;
}

export interface ContentstackQuery {
  contentType: string;
  query?: string;
  filters?: Record<string, any>;
  limit?: number;
}

export class ContentstackService {
  private apiKey: string;
  private deliveryToken: string;
  private environment: string;
  private baseUrl: string;

  constructor(credentials: ContentstackCredentials) {
    this.apiKey = credentials.apiKey;
    this.deliveryToken = credentials.deliveryToken;
    this.environment = credentials.environment || contentstackConfig.defaultEnvironment;
    this.baseUrl = contentstackConfig.regions[credentials.region || 'us'];
  }

  async searchContent(query: ContentstackQuery): Promise<ContentstackEntry[]> {
    try {
      const contentType = query.contentType;
      const searchQuery = query.query || '';
      const limit = query.limit || 10;
      
      // Build search URL
      let url = `${this.baseUrl}/content_types/${contentType}/entries?environment=${this.environment}&limit=${limit}`;
      
      // Add search parameters if query is provided
      if (searchQuery) {
        url += `&query={"$or":[{"title":{"$regex":"${searchQuery}","$options":"i"}},{"content":{"$regex":"${searchQuery}","$options":"i"}}]}`;
      }

      // Add filters if provided
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
      
      // Transform entries to our format
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

  async getContentByType(contentType: string, limit: number = 10): Promise<ContentstackEntry[]> {
    return this.searchContent({ contentType, limit });
  }

  async searchAllContent(query: string, contentTypes: string[] = ['tour', 'faq', 'blog']): Promise<ContentstackEntry[]> {
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
        // Continue with other content types
      }
    }
    
    return allResults;
  }

  private extractContent(entry: any, contentType: string): string {
    switch (contentType) {
      case 'tour':
        return `${entry.description || ''} Location: ${entry.location || 'N/A'}. Price: ${entry.price || 'N/A'}. Duration: ${entry.duration || 'N/A'}`;
      case 'faq':
        return entry.answer || entry.content || '';
      case 'blog':
        return entry.content || entry.description || '';
      default:
        return entry.content || entry.description || entry.answer || '';
    }
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

export const contentstackService = new ContentstackService({
  apiKey: process.env.CONTENTSTACK_API_KEY || '',
  deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN || '',
  environment: process.env.CONTENTSTACK_ENVIRONMENT || 'development'
});
