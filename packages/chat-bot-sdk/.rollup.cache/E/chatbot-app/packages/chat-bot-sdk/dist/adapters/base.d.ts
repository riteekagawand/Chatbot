import { LLMProvider, LLMResponse, StreamingResponse } from '../types/llm';
export interface LLMAdapter {
    name: LLMProvider;
    sendMessage: (message: string, apiKey: string, model?: string) => Promise<LLMResponse>;
    sendStreamingMessage: (message: string, apiKey: string, model?: string) => AsyncGenerator<StreamingResponse>;
    validateApiKey: (apiKey: string) => Promise<boolean>;
    getModels: () => string[];
}
export declare abstract class BaseLLMAdapter implements LLMAdapter {
    abstract name: LLMProvider;
    abstract baseUrl: string;
    abstract defaultModel: string;
    abstract sendMessage(message: string, apiKey: string, model?: string): Promise<LLMResponse>;
    abstract sendStreamingMessage(message: string, apiKey: string, model?: string): AsyncGenerator<StreamingResponse>;
    abstract validateApiKey(apiKey: string): Promise<boolean>;
    getModels(): string[];
    protected makeRequest(url: string, options: RequestInit): Promise<Response>;
}
//# sourceMappingURL=base.d.ts.map