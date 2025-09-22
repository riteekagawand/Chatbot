export class BaseLLMAdapter {
    getModels() {
        return [this.defaultModel];
    }
    async makeRequest(url, options) {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`LLM API Error: ${response.status} ${response.statusText}`);
        }
        return response;
    }
}
//# sourceMappingURL=base.js.map