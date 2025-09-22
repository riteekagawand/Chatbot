import { LLMProvider, LLMConfig } from '../types/llm';
export declare function useLLMProvider(): {
    provider: LLMProvider;
    config: LLMConfig | null;
    updateProvider: (newProvider: LLMProvider) => void;
    updateConfig: (newConfig: LLMConfig) => void;
};
//# sourceMappingURL=useLLMProvider.d.ts.map