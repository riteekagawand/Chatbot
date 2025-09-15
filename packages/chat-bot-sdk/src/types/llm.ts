export type LLMProvider = 'openai' | 'groq' | 'anthropic' | 'perplexity';

export interface LLMConfig {
  provider?: LLMProvider;
  apiKey: string;
  model?: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface LLMResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface StreamingResponse {
  content: string;
  done: boolean;
}
