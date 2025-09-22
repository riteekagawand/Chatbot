import { __asyncGenerator, __await } from "tslib";
import { BaseLLMAdapter } from './base';
export class AnthropicAdapter extends BaseLLMAdapter {
    constructor() {
        super(...arguments);
        this.name = 'anthropic';
        this.baseUrl = 'https://api.anthropic.com/v1';
        this.defaultModel = 'claude-3-sonnet-20240229';
    }
    async sendMessage(message, apiKey, model = this.defaultModel) {
        const response = await this.makeRequest(`${this.baseUrl}/messages`, {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json',
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model,
                max_tokens: 1000,
                messages: [{ role: 'user', content: message }],
            }),
        });
        const data = await response.json();
        return {
            content: data.content[0].text,
            usage: data.usage ? {
                promptTokens: data.usage.input_tokens,
                completionTokens: data.usage.output_tokens,
                totalTokens: data.usage.input_tokens + data.usage.output_tokens,
            } : undefined,
        };
    }
    sendStreamingMessage(message_1, apiKey_1) {
        return __asyncGenerator(this, arguments, function* sendStreamingMessage_1(message, apiKey, model = this.defaultModel) {
            var _a, _b;
            const response = yield __await(this.makeRequest(`${this.baseUrl}/messages`, {
                method: 'POST',
                headers: {
                    'x-api-key': apiKey,
                    'Content-Type': 'application/json',
                    'anthropic-version': '2023-06-01',
                },
                body: JSON.stringify({
                    model,
                    max_tokens: 1000,
                    messages: [{ role: 'user', content: message }],
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
                                if (parsed.type === 'content_block_delta') {
                                    const content = ((_b = parsed.delta) === null || _b === void 0 ? void 0 : _b.text) || '';
                                    if (content) {
                                        yield yield __await({ content, done: false });
                                    }
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
            const response = await this.makeRequest(`${this.baseUrl}/messages`, {
                method: 'POST',
                headers: {
                    'x-api-key': apiKey,
                    'Content-Type': 'application/json',
                    'anthropic-version': '2023-06-01',
                },
                body: JSON.stringify({
                    model: this.defaultModel,
                    max_tokens: 1,
                    messages: [{ role: 'user', content: 'test' }],
                }),
            });
            return response.ok;
        }
        catch (_a) {
            return false;
        }
    }
    getModels() {
        return ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'];
    }
}
//# sourceMappingURL=anthropic.js.map