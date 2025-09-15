import axios, { AxiosInstance } from 'axios';
import { ContentstackConfig, ContentstackEntry, ContentstackService as IContentstackService } from '../types';

export class ContentstackService implements IContentstackService {
  private httpClient: AxiosInstance;
  private config: ContentstackConfig;

  constructor(config: ContentstackConfig) {
    this.config = config;
    this.httpClient = axios.create({
      baseURL: this.getBaseUrl(),
      headers: {
        'api_key': config.apiKey,
        'access_token': config.deliveryToken,
        'Content-Type': 'application/json'
      }
    });
  }

  private getBaseUrl(): string {
    if (this.config.baseUrl) {
      return this.config.baseUrl;
    }

    const regionUrls = {
      us: 'https://cdn.contentstack.io/v3',
      eu: 'https://eu-cdn.contentstack.io/v3',
      azure: 'https://azure-cdn.contentstack.io/v3'
    };

    return regionUrls[this.config.region || 'eu'];
  }

  async fetchContentTypes(): Promise<string[]> {
    try {
      const response = await this.httpClient.get('/content_types', {
        params: { environment: this.config.environment }
      });
      return response.data.content_types?.map((ct: any) => ct.uid) || [];
    } catch (error) {
      console.error('Error fetching content types:', error);
      return ['tour', 'faqs']; // Fallback
    }
  }

  async fetchEntries(contentType: string, query?: string): Promise<ContentstackEntry[]> {
    try {
      const params: any = {
        environment: this.config.environment,
        limit: 10
      };

      if (query) {
        const searchQuery = JSON.stringify({
          "$or": [
            {"title": {"$regex": query, "$options": "i"}},
            {"question": {"$regex": query, "$options": "i"}},
            {"description": {"$regex": query, "$options": "i"}},
            {"answers": {"$regex": query, "$options": "i"}},
            {"answer": {"$regex": query, "$options": "i"}}
          ]
        });
        params.query = searchQuery;
      }

      const response = await this.httpClient.get(`/content_types/${contentType}/entries`, { params });
      return response.data.entries || [];
    } catch (error) {
      console.error(`Error fetching ${contentType} entries:`, error);
      return [];
    }
  }

  async searchContent(message: string): Promise<{ tours: ContentstackEntry[], faqs: ContentstackEntry[] }> {
    const lowerMessage = message.toLowerCase();
    
    try {
      // Fetch tours and FAQs in parallel
      const [tours, faqs] = await Promise.all([
        this.fetchEntries('tour'),
        this.fetchEntries('faqs')
      ]);

      // Filter based on message content
      const relevantTours = tours.filter(tour => 
        lowerMessage.includes('tour') || 
        lowerMessage.includes('travel') ||
        lowerMessage.includes('destination') ||
        lowerMessage.includes('country') ||
        lowerMessage.includes('package') ||
        lowerMessage.includes('trip')
      );

      const relevantFaqs = faqs.filter(faq => {
        const question = faq.question?.toLowerCase() || '';
        const answer = faq.answers?.toLowerCase() || faq.answer?.toLowerCase() || '';
        const title = faq.title?.toLowerCase() || '';
        
        return (
          // Accommodation queries
          (lowerMessage.includes('accommodation') && (question.includes('accommodation') || title.includes('accommodation'))) ||
          (lowerMessage.includes('hotel') && (question.includes('accommodation') || answer.includes('hotel'))) ||
          (lowerMessage.includes('provide') && question.includes('accommodation')) ||
          
          // Booking queries
          (lowerMessage.includes('booking') && question.includes('book')) ||
          (lowerMessage.includes('book') && question.includes('book')) ||
          
          // Cancellation queries
          (lowerMessage.includes('cancel') && question.includes('cancel')) ||
          (lowerMessage.includes('cancellation') && question.includes('cancel')) ||
          
          // Payment queries
          (lowerMessage.includes('payment') && question.includes('payment')) ||
          (lowerMessage.includes('pay') && question.includes('payment')) ||
          
          // Insurance queries
          (lowerMessage.includes('insurance') && question.includes('insurance')) ||
          
          // Flight queries
          (lowerMessage.includes('flight') && question.includes('flight')) ||
          (lowerMessage.includes('flights') && question.includes('flight')) ||
          
          // Refund queries
          (lowerMessage.includes('refund') && question.includes('refund')) ||
          
          // General queries
          (lowerMessage.includes('how') && (question.includes('how') || answer.includes('how'))) ||
          (lowerMessage.includes('what') && (question.includes('what') || answer.includes('what'))) ||
          (lowerMessage.includes('when') && (question.includes('when') || answer.includes('when')))
        );
      });

      return { tours: relevantTours, faqs: relevantFaqs };
    } catch (error) {
      console.error('Error searching content:', error);
      return { tours: [], faqs: [] };
    }
  }

  updateConfig(newConfig: Partial<ContentstackConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.httpClient = axios.create({
      baseURL: this.getBaseUrl(),
      headers: {
        'api_key': this.config.apiKey,
        'access_token': this.config.deliveryToken,
        'Content-Type': 'application/json'
      }
    });
  }
}
