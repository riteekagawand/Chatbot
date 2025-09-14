export const llmConfig = {
  providers: {
    openai: {
      baseUrl: 'https://api.openai.com/v1',
      models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
      defaultModel: 'gpt-4'
    },
    groq: {
      baseUrl: 'https://api.groq.com/openai/v1',
      models: ['llama3-8b-8192', 'llama3-70b-8192', 'mixtral-8x7b-32768'],
      defaultModel: 'llama3-8b-8192'
    },
    anthropic: {
      baseUrl: 'https://api.anthropic.com/v1',
      models: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
      defaultModel: 'claude-3-sonnet-20240229'
    }
  },
  
  // Rate limiting
  rateLimits: {
    requestsPerMinute: 60,
    tokensPerMinute: 100000
  }
};
