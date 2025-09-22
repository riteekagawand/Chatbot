import { __asyncGenerator, __await } from "tslib";
import { BaseLLMAdapter } from './base';
export class GroqAdapter extends BaseLLMAdapter {
    constructor() {
        super(...arguments);
        this.name = 'groq';
        this.baseUrl = 'https://api.groq.com/openai/v1';
        this.defaultModel = 'llama3-8b-8192';
    }
    async sendMessage(message, apiKey, model = this.defaultModel) {
        const response = await this.makeRequest(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                messages: [{ role: 'user', content: message }],
                max_tokens: 1000,
                temperature: 0.7,
            }),
        });
        const data = await response.json();
        return {
            content: data.choices[0].message.content,
            usage: data.usage ? {
                promptTokens: data.usage.prompt_tokens,
                completionTokens: data.usage.completion_tokens,
                totalTokens: data.usage.total_tokens,
            } : undefined,
        };
    }
    sendStreamingMessage(message_1, apiKey_1) {
        return __asyncGenerator(this, arguments, function* sendStreamingMessage_1(message, apiKey, model = this.defaultModel) {
            var _a, _b, _c, _d;
            const response = yield __await(this.makeRequest(`${this.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model,
                    messages: [{ role: 'user', content: message }],
                    max_tokens: 1000,
                    temperature: 0.7,
                    stream: true,
                }),
            }));
            const reader = (_a = response.body) === null || _a === void 0 ? void 0 : _a.getReader();
            if (!reader)
                throw new Error('No response body');
            const decoder = new TextDecoder();
            let buffer = '';
            try {
                while (true) {
                    const { done, value } = yield __await(reader.read());
                    if (done)
                        break;
                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split('\n');
                    buffer = lines.pop() || '';
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);
                            if (data === '[DONE]') {
                                yield yield __await({ content: '', done: true });
                                return yield __await(void 0);
                            }
                            try {
                                const parsed = JSON.parse(data);
                                const content = ((_d = (_c = (_b = parsed.choices) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.delta) === null || _d === void 0 ? void 0 : _d.content) || '';
                                if (content) {
                                    yield yield __await({ content, done: false });
                                }
                            }
                            catch (e) {
                                // Ignore parsing errors for incomplete chunks
                            }
                        }
                    }
                }
            }
            finally {
                reader.releaseLock();
            }
        });
    }
    async validateApiKey(apiKey) {
        try {
            const response = await this.makeRequest(`${this.baseUrl}/models`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                },
            });
            return response.ok;
        }
        catch (_a) {
            return false;
        }
    }
    getModels() {
        return ['llama3-8b-8192', 'llama3-70b-8192', 'mixtral-8x7b-32768'];
    }
}
//# sourceMappingURL=groq.js.map