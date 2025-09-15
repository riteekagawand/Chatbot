import { ContentstackEntry } from '../types';
export declare class ContentstackService {
    private baseUrl;
    private apiKey;
    private deliveryToken;
    private environment;
    constructor(apiKey: string, deliveryToken: string, environment: string, region?: string);
    fetchContentTypes(): Promise<string[]>;
    fetchEntries(contentType: string, query?: string): Promise<ContentstackEntry[]>;
    searchContent(message: string): Promise<{
        tours: ContentstackEntry[];
        faqs: ContentstackEntry[];
    }>;
}
