import axios from 'axios';
import { ContentstackEntry } from '../types';

export class ContentstackService {
  private baseUrl: string;
  private apiKey: string;
  private deliveryToken: string;
  private environment: string;

  constructor(
    apiKey: string,
    deliveryToken: string,
    environment: string,
    region: string = 'eu'
  ) {
    this.apiKey = apiKey;
    this.deliveryToken = deliveryToken;
    this.environment = environment;
    this.baseUrl = `https://${region}-cdn.contentstack.com/v3`;
  }

  async fetchContentTypes(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/content_types`, {
        params: { environment: this.environment },
        headers: {
          'api_key': this.apiKey,
          'access_token': this.deliveryToken,
          'Content-Type': 'application/json'
        }
      });
      return response.data.content_types?.map((ct: any) => ct.uid) || [];
    } catch (error) {
      console.error('Error fetching content types:', error);
      return ['tour', 'faqs']; // Fallback
    }
  }

  async fetchEntries(contentType: string, query?: string): Promise<ContentstackEntry[]> {
    try {
      let url = `${this.baseUrl}/content_types/${contentType}/entries`;
      const params: any = {
        environment: this.environment,
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

      const response = await axios.get(url, {
        params,
        headers: {
          'api_key': this.apiKey,
          'access_token': this.deliveryToken,
          'Content-Type': 'application/json'
        }
      });

      return response.data.entries || [];
    } catch (error) {
      console.error(`Error fetching ${contentType} entries:`, error);
      return [];
    }
  }

  async searchContent(message: string): Promise<{ tours: ContentstackEntry[], faqs: ContentstackEntry[] }> {
    const lowerMessage = message.toLowerCase();
    
    // Fetch tours and FAQs
    const [tours, faqs] = await Promise.all([
      this.fetchEntries('tour'),
      this.fetchEntries('faqs')
    ]);

    // Filter based on message content
    const relevantTours = tours.filter(tour => 
      lowerMessage.includes('tour') || 
      lowerMessage.includes('travel') ||
      lowerMessage.includes('destination') ||
      lowerMessage.includes('country')
    );

    const relevantFaqs = faqs.filter(faq => {
      const question = faq.question?.toLowerCase() || '';
      const answer = faq.answers?.toLowerCase() || faq.answer?.toLowerCase() || '';
      
      return lowerMessage.includes('accommodation') && question.includes('accommodation') ||
             lowerMessage.includes('hotel') && (question.includes('accommodation') || answer.includes('hotel')) ||
             lowerMessage.includes('booking') && question.includes('book') ||
             lowerMessage.includes('cancel') && question.includes('cancel') ||
             lowerMessage.includes('payment') && question.includes('payment') ||
             lowerMessage.includes('insurance') && question.includes('insurance') ||
             lowerMessage.includes('flight') && question.includes('flight') ||
             lowerMessage.includes('refund') && question.includes('refund');
    });

    return { tours: relevantTours, faqs: relevantFaqs };
  }
}
