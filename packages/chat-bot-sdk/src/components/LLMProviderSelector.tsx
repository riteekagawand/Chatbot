"use client"
import React from 'react';
import { LLMProvider } from '../types/llm';

interface LLMProviderSelectorProps {
  value: LLMProvider;
  onChange: (provider: LLMProvider) => void;
  disabled?: boolean;
  className?: string;
}

const providerInfo = {
  openai: {
    name: 'OpenAI',
    description: 'GPT-4, GPT-3.5 Turbo',
    icon: '🤖',
    color: 'bg-green-500'
  },
  groq: {
    name: 'Groq',
    description: 'Llama 3, Mixtral',
    icon: '⚡',
    color: 'bg-blue-500'
  },
  anthropic: {
    name: 'Anthropic',
    description: 'Claude 3 Opus, Sonnet, Haiku',
    icon: '🧠',
    color: 'bg-purple-500'
  },
  perplexity: {
    name: 'Perplexity',
    description: 'Real-time web search',
    icon: '🔍',
    color: 'bg-orange-500'
  }
};

export default function LLMProviderSelector({ 
  value, 
  onChange, 
  disabled = false, 
  className = '' 
}: LLMProviderSelectorProps) {
  const providers = Object.keys(providerInfo) as LLMProvider[];

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        LLM Provider
      </label>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {providers.map((provider) => {
          const info = providerInfo[provider];
          const isSelected = value === provider;
          
          return (
            <button
              key={provider}
              type="button"
              onClick={() => !disabled && onChange(provider)}
              disabled={disabled}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-200
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${!disabled && !isSelected ? 'hover:shadow-md' : ''}
              `}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-white text-lg
                  ${info.color}
                `}>
                  {info.icon}
                </div>
                
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {info.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {info.description}
                  </div>
                </div>
                
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Choose the LLM provider that best fits your needs. Each provider has different models and pricing.
      </div>
    </div>
  );
}

