import { __asyncGenerator, __asyncValues, __await } from "tslib";
import { OpenAIAdapter } from '../adapters/openai';
import { GroqAdapter } from '../adapters/groq';
import { AnthropicAdapter } from '../adapters/anthropic';
import { PerplexityAdapter } from '../adapters/perplexity';
export class LLMService {
    constructor() {
        this.adapters = new Map();
        this.adapters.set('openai', new OpenAIAdapter());
        this.adapters.set('groq', new GroqAdapter());
        this.adapters.set('anthropic', new AnthropicAdapter());
        this.adapters.set('perplexity', new PerplexityAdapter());
    }
    getAdapter(provider) {
        const adapter = this.adapters.get(provider);
        if (!adapter) {
            throw new Error(`Unsupported LLM provider: ${provider}`);
        }
        return adapter;
    }
    async sendMessage(message, config) {
        if (!config.provider) {
            throw new Error('LLM provider is required');
        }
        const adapter = this.getAdapter(config.provider);
        const response = await adapter.sendMessage(message, config.apiKey, config.model);
        return response.content;
    }
    sendStreamingMessage(message, config) {
        return __asyncGenerator(this, arguments, function* sendStreamingMessage_1() {
            var _a, e_1, _b, _c;
            if (!config.provider) {
                throw new Error('LLM provider is required');
            }
            const adapter = this.getAdapter(config.provider);
            try {
                for (var _d = true, _e = __asyncValues(adapter.sendStreamingMessage(message, config.apiKey, config.model)), _f; _f = yield __await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const chunk = _c;
                    if (!chunk.done) {
                        yield yield __await(chunk.content);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield __await(_b.call(_e));
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    async validateApiKey(provider, apiKey) {
        const adapter = this.getAdapter(provider);
        return adapter.validateApiKey(apiKey);
    }
    getModels(provider) {
        const adapter = this.getAdapter(provider);
        return adapter.getModels();
    }
    getSupportedProviders() {
        return Array.from(this.adapters.keys());
    }
}
export const llmService = new LLMService();
//# sourceMappingURL=llm.js.map