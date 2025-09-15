"use client"
import React, { useState } from 'react';
import { LLMProvider, LLMConfig } from '../types/llm';
import { ContentstackConfig } from '../types/contentstack';
import LLMProviderSelector from './LLMProviderSelector';

interface ConfigFormProps {
  onConfigSubmit: (config: {
    llm: { provider: LLMProvider; config: LLMConfig };
    contentstack?: ContentstackConfig;
  }) => void;
  initialConfig?: {
    llm: { provider: LLMProvider; config: LLMConfig };
    contentstack?: ContentstackConfig;
  };
  className?: string;
  theme?: 'light' | 'dark' | 'auto';
}

export default function ConfigForm({
  onConfigSubmit,
  initialConfig,
  className = '',
  theme = 'auto'
}: ConfigFormProps) {
  const [llmProvider, setLlmProvider] = useState<LLMProvider>(
    initialConfig?.llm.provider || 'openai'
  );
  const [llmConfig, setLlmConfig] = useState<LLMConfig>(
    initialConfig?.llm.config || {
      apiKey: '',
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      maxTokens: 1000
    }
  );
  const [contentstackConfig, setContentstackConfig] = useState<ContentstackConfig>(
    initialConfig?.contentstack || {
      apiKey: '',
      deliveryToken: '',
      environment: 'development',
      contentTypes: ['tour', 'faqs']
    }
  );
  const [isContentstackEnabled, setIsContentstackEnabled] = useState(
    !!(initialConfig?.contentstack?.apiKey)
  );

  const themeClasses = {
    light: 'bg-white text-gray-900 border-gray-200',
    dark: 'bg-gray-800 text-white border-gray-600',
    auto: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const config = {
      llm: {
        provider: llmProvider,
        config: llmConfig
      },
      contentstack: isContentstackEnabled ? contentstackConfig : undefined
    };
    
    onConfigSubmit(config);
  };

  const handleContentstackChange = (field: keyof ContentstackConfig, value: string | string[]) => {
    setContentstackConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">ChatBot Configuration</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Configure your AI chatbot with LLM and content integration
        </p>
      </div>

      {/* LLM Configuration */}
      <div className={`p-6 border rounded-lg ${themeClasses[theme]}`}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          LLM Configuration
        </h3>
        <LLMProviderSelector
          selectedProvider={llmProvider}
          onProviderChange={setLlmProvider}
          onConfigChange={setLlmConfig}
          config={llmConfig}
          theme={theme}
        />
      </div>

      {/* Contentstack Configuration */}
      <div className={`p-6 border rounded-lg ${themeClasses[theme]}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span className="text-2xl">📚</span>
            Content Integration
          </h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isContentstackEnabled}
              onChange={(e) => setIsContentstackEnabled(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="text-sm font-medium">Enable Content Integration</span>
          </label>
        </div>

        {isContentstackEnabled && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Contentstack API Key
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                value={contentstackConfig.apiKey}
                onChange={(e) => handleContentstackChange('apiKey', e.target.value)}
                placeholder="blt..."
                className={`w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Delivery Token
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="password"
                value={contentstackConfig.deliveryToken}
                onChange={(e) => handleContentstackChange('deliveryToken', e.target.value)}
                placeholder="cs..."
                className={`w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Environment</label>
              <select
                value={contentstackConfig.environment}
                onChange={(e) => handleContentstackChange('environment', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="development">Development</option>
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content Types</label>
              <div className="space-y-2">
                {['tour', 'faqs', 'blog', 'product', 'article'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={contentstackConfig.contentTypes?.includes(type) || false}
                      onChange={(e) => {
                        const currentTypes = contentstackConfig.contentTypes || [];
                        const newTypes = e.target.checked
                          ? [...currentTypes, type]
                          : currentTypes.filter((t: string) => t !== type);
                        handleContentstackChange('contentTypes', newTypes);
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-sm capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ChatBot Settings */}
      <div className={`p-6 border rounded-lg ${themeClasses[theme]}`}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">⚙️</span>
          ChatBot Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Position</label>
            <select
              className={`w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="top-right">Top Right</option>
              <option value="top-left">Top Left</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            <select
              className={`w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="auto">Auto (System)</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Welcome Message</label>
          <textarea
            placeholder="Enter a custom welcome message..."
            className={`w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            rows={3}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
        >
          Save Configuration
        </button>
      </div>
    </form>
  );
}
