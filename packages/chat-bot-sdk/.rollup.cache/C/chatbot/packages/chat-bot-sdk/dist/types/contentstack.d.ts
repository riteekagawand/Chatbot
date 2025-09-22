export interface ContentstackConfig {
    apiKey: string;
    deliveryToken: string;
    environment?: string;
    region?: string;
    contentTypes?: string[];
}
export interface ContentItem {
    uid: string;
    title: string;
    content: string;
    contentType: string;
    metadata: Record<string, any>;
}
export interface ContentQuery {
    contentType: string;
    query?: string;
    filters?: Record<string, any>;
    limit?: number;
}
//# sourceMappingURL=contentstack.d.ts.map