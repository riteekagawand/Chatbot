import { BaseLLMAdapter } from './base';
import { LLMProvider, LLMResponse, StreamingResponse } from '../types/llm';
export declare class AnthropicAdapter extends BaseLLMAdapter {
    name: LLMProvider;
    baseUrl: string;
    defaultModel: string;
    sendMessage(message: string, apiKey: string, model?: string): Promise<LLMResponse>;
    sendStreamingMessage(message: string, apiKey: string, model?: string): AsyncGenerator<StreamingResponse>;
    validateApiKey(apiKey: string): Promise<boolean>;
    getModels(): string[];
}
//# sourceMappingURL=anthropic.d.ts.map