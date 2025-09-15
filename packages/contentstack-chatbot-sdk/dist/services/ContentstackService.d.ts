import { ContentstackConfig, ContentstackEntry, ContentstackService as IContentstackService } from '../types';
export declare class ContentstackService implements IContentstackService {
    private httpClient;
    private config;
    constructor(config: ContentstackConfig);
    private getBaseUrl;
    fetchContentTypes(): Promise<string[]>;
    fetchEntries(contentType: string, query?: string): Promise<ContentstackEntry[]>;
    searchContent(message: string): Promise<{
        tours: ContentstackEntry[];
        faqs: ContentstackEntry[];
    }>;
    updateConfig(newConfig: Partial<ContentstackConfig>): void;
}
