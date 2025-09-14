import { useState } from 'react';
import { LLMProvider, LLMConfig } from '../types/llm';

export function useLLMProvider() {
  const [provider, setProvider] = useState<LLMProvider>('openai');
  const [config, setConfig] = useState<LLMConfig | null>(null);

  const updateProvider = (newProvider: LLMProvider) => {
    setProvider(newProvider);
  };

  const updateConfig = (newConfig: LLMConfig) => {
    setConfig(newConfig);
  };

  return {
    provider,
    config,
    updateProvider,
    updateConfig
  };
}
