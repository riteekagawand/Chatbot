"use client"
import React, { useState } from 'react';
import { LLMProvider, LLMConfig } from '../types/llm';

interface LLMProviderSelectorProps {
  selectedProvider: LLMProvider;
  onProviderChange: (provider: LLMProvider) => void;
  onConfigChange: (config: LLMConfig) => void;
  config: LLMConfig;
  className?: string;
  theme?: 'light' | 'dark' | 'auto';
}

const providerInfo = {
  openai: {
    name: 'OpenAI',
    description: 'GPT-3.5, GPT-4, and other OpenAI models',
    icon: '🤖',
    models: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo'],
    defaultModel: 'gpt-3.5-turbo'
  },
  groq: {
    name: 'Groq',
    description: 'Fast inference with Llama models',
    icon: '⚡',
    models: ['llama3-8b-8192', 'llama3-70b-8192', 'mixtral-8x7b-32768'],
    defaultModel: 'llama3-8b-8192'
  },
  anthropic: {
    name: 'Anthropic',
    description: 'Claude models for advanced reasoning',
    icon: '🧠',
    models: ['claude-3-haiku-20240307', 'claude-3-sonnet-20240229', 'claude-3-opus-20240229'],
    defaultModel: 'claude-3-haiku-20240307'
  },
  perplexity: {
    name: 'Perplexity',
    description: 'Real-time web search capabilities',
    icon: '🔍',
    models: ['llama-3.1-sonar-small-128k-online', 'llama-3.1-sonar-large-128k-online'],
    defaultModel: 'llama-3.1-sonar-small-128k-online'
  }
};

export default function LLMProviderSelector({
  selectedProvider,
  onProviderChange,
  onConfigChange,
  config,
  className = '',
  theme = 'auto'
}: LLMProviderSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const themeClasses = {
    light: 'bg-white text-gray-900 border-gray-200',
    dark: 'bg-gray-800 text-white border-gray-600',
    auto: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600'
  };

  const handleProviderSelect = (provider: LLMProvider) => {
    const providerData = providerInfo[provider];
    onProviderChange(provider);
    onConfigChange({
      ...config,
      model: providerData.defaultModel
    });
    setIsOpen(false);
  };

  const handleModelChange = (model: string) => {
    onConfigChange({
      ...config,
      model
    });
  };

  const handleApiKeyChange = (apiKey: string) => {
    onConfigChange({
      ...config,
      apiKey
    });
  };

  const selectedProviderData = providerInfo[selectedProvider];

  return (
    <div className={`relative ${className}`}>
      {/* Provider Selector */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">LLM Provider</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full px-4 py-3 border rounded-lg flex items-center justify-between ${themeClasses[theme]} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{selectedProviderData.icon}</span>
                <div className="text-left">
                  <div className="font-medium">{selectedProviderData.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedProviderData.description}
                  </div>
                </div>
              </div>
              <svg
                className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpen && (
              <div className={`absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-10 ${themeClasses[theme]}`}>
                {Object.entries(providerInfo).map(([key, provider]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleProviderSelect(key as LLMProvider)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedProvider === key ? 'bg-blue-50 dark:bg-blue-900' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{provider.icon}</span>
                      <div>
                        <div className="font-medium">{provider.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {provider.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Model Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Model</label>
          <select
            value={config.model || selectedProviderData.defaultModel}
            onChange={(e) => handleModelChange(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {selectedProviderData.models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        {/* API Key */}
        <div>
          <label className="block text-sm font-medium mb-2">
            API Key
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="password"
            value={config.apiKey || ''}
            onChange={(e) => handleApiKeyChange(e.target.value)}
            placeholder={`Enter your ${selectedProviderData.name} API key`}
            className={`w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Your API key is stored locally and never shared
          </p>
        </div>

        {/* Advanced Settings */}
        <details className="group">
          <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Advanced Settings
          </summary>
          <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-200 dark:border-gray-600">
            <div>
              <label className="block text-sm font-medium mb-1">Temperature</label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={config.temperature || 0.7}
                onChange={(e) => onConfigChange({ ...config, temperature: parseFloat(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Focused (0)</span>
                <span>Balanced (1)</span>
                <span>Creative (2)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Max Tokens</label>
              <input
                type="number"
                min="100"
                max="4000"
                value={config.maxTokens || 1000}
                onChange={(e) => onConfigChange({ ...config, maxTokens: parseInt(e.target.value) })}
                className={`w-full px-3 py-2 border rounded ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}