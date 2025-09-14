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
    this.environment = credentials.environment || 'development';
    this.baseUrl = 'https://eu-cdn.contentstack.com/v3';
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
        // Use simple text search with URL encoding
        const query = JSON.stringify({"title":{"$regex":searchQuery,"$options":"i"}});
        url += `&query=${encodeURIComponent(query)}`;
      }

      // Add filters if provided
      if (query.filters) {
        const filterQuery = JSON.stringify(query.filters);
        url += `&query=${filterQuery}`;
      }

      console.log('Contentstack API URL:', url);
      
      const response = await fetch(url, {
        headers: {
          'api_key': this.apiKey,
          'access_token': this.deliveryToken,
          'Content-Type': 'application/json'
        }
      });

      console.log('Contentstack API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Contentstack API error response:', errorText);
        throw new Error(`Contentstack API error: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Contentstack API response data:', JSON.stringify(data, null, 2));
      
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
