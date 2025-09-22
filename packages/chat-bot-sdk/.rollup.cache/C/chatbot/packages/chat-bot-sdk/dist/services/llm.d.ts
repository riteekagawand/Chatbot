import { LLMProvider, LLMConfig } from '../types/llm';
import { LLMAdapter } from '../adapters/base';
export declare class LLMService {
    private adapters;
    constructor();
    getAdapter(provider: LLMProvider): LLMAdapter;
    sendMessage(message: string, config: LLMConfig): Promise<string>;
    sendStreamingMessage(message: string, config: LLMConfig): AsyncGenerator<string>;
    validateApiKey(provider: LLMProvider, apiKey: string): Promise<boolean>;
    getModels(provider: LLMProvider): string[];
    getSupportedProviders(): LLMProvider[];
}
export declare const llmService: LLMService;
//# sourceMappingURL=llm.d.ts.map