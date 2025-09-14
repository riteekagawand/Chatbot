export interface ContentstackConfig {
  apiKey: string;
  token: string;
  environment?: string;
  region?: string;
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
