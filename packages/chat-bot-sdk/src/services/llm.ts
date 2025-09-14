import { LLMProvider, LLMConfig } from '../types/llm';
import { OpenAIAdapter } from '../adapters/openai';
import { GroqAdapter } from '../adapters/groq';
import { AnthropicAdapter } from '../adapters/anthropic';
import { PerplexityAdapter } from '../adapters/perplexity';
import { LLMAdapter } from '../adapters/base';

export class LLMService {
  private adapters: Map<LLMProvider, LLMAdapter> = new Map();

  constructor() {
    this.adapters.set('openai', new OpenAIAdapter());
    this.adapters.set('groq', new GroqAdapter());
    this.adapters.set('anthropic', new AnthropicAdapter());
    this.adapters.set('perplexity', new PerplexityAdapter());
  }

  getAdapter(provider: LLMProvider): LLMAdapter {
    const adapter = this.adapters.get(provider);
    if (!adapter) {
      throw new Error(`Unsupported LLM provider: ${provider}`);
    }
    return adapter;
  }

  async sendMessage(message: string, config: LLMConfig): Promise<string> {
    const adapter = this.getAdapter(config.provider);
    const response = await adapter.sendMessage(message, config.apiKey, config.model);
    return response.content;
  }

  async* sendStreamingMessage(message: string, config: LLMConfig): AsyncGenerator<string> {
    const adapter = this.getAdapter(config.provider);
    for await (const chunk of adapter.sendStreamingMessage(message, config.apiKey, config.model)) {
      if (!chunk.done) {
        yield chunk.content;
      }
    }
  }

  async validateApiKey(provider: LLMProvider, apiKey: string): Promise<boolean> {
    const adapter = this.getAdapter(provider);
    return adapter.validateApiKey(apiKey);
  }

  getModels(provider: LLMProvider): string[] {
    const adapter = this.getAdapter(provider);
    return adapter.getModels();
  }

  getSupportedProviders(): LLMProvider[] {
    return Array.from(this.adapters.keys());
  }
}

export const llmService = new LLMService();
