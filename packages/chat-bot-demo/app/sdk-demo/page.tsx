"use client"
export const dynamic = 'force-dynamic';
import React, { useState } from 'react';
import { 
  EnhancedChatBot, 
  ConfigForm, 
  ThemeProvider, 
  ThemeSelector,
  LLMProviderSelector,
  useTheme 
} from 'chat-bot';
import type { LLMProvider, LLMConfig } from 'chat-bot';
import type { ContentstackConfig } from 'chat-bot';

interface ChatConfig {
  llm: { provider: LLMProvider; config: LLMConfig };
  contentstack?: ContentstackConfig;
}

export default function SDKDemoPage() {
  const isClient = typeof window !== 'undefined';
  const [config, setConfig] = useState<ChatConfig | null>(null);
  const [showConfig, setShowConfig] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right');
  const [selectedTheme, setSelectedTheme] = useState<string>('light');

  const handleConfigSubmit = (newConfig: ChatConfig) => {
    setConfig(newConfig);
    setShowConfig(false);
  };

  const resetConfig = () => {
    setConfig(null);
    setShowConfig(true);
  };

  return (
    <ThemeProvider defaultTheme={selectedTheme} enableSystemTheme={true}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  ChatBot SDK Demo
                </h1>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                  Phase 3 Complete
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <ThemeSelector />
                <button
                  onClick={resetConfig}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Reset Config
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {showConfig ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <ConfigForm
                  onConfigSubmit={handleConfigSubmit}
                  theme="auto"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Configuration Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Current Configuration
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                      LLM Provider
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {config?.llm.provider === 'openai' && '🤖'}
                        {config?.llm.provider === 'groq' && '⚡'}
                        {config?.llm.provider === 'anthropic' && '🧠'}
                        {config?.llm.provider === 'perplexity' && '🔍'}
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {config?.llm.provider.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Model: {config?.llm.config.model}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Content Integration
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📚</span>
                      <span className="text-gray-900 dark:text-white">
                        {config?.contentstack ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    {config?.contentstack && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Types: {(config.contentstack.contentTypes || []).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ChatBot Controls */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  ChatBot Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Position
                    </label>
                    <select
                      value={selectedPosition}
                      onChange={(e) => setSelectedPosition(e.target.value as any)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="bottom-right">Bottom Right</option>
                      <option value="bottom-left">Bottom Left</option>
                      <option value="top-right">Top Right</option>
                      <option value="top-left">Top Left</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Theme
                    </label>
                    <select
                      value={selectedTheme}
                      onChange={(e) => setSelectedTheme(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="purple">Purple</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Feature Showcase */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  SDK Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { icon: '🤖', title: 'LLM Providers', desc: 'OpenAI, Groq, Anthropic, Perplexity' },
                    { icon: '📚', title: 'Content Integration', desc: 'Contentstack with smart search' },
                    { icon: '🎨', title: 'Themes', desc: '5 beautiful themes + system theme' },
                    { icon: '⚡', title: 'Streaming', desc: 'Real-time response streaming' },
                    { icon: '📱', title: 'Responsive', desc: 'Works on all devices' },
                    { icon: '🔧', title: 'Configurable', desc: 'Easy setup and customization' },
                  ].map((feature, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl mb-2">{feature.icon}</div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  🚀 Try the ChatBot!
                </h3>
                <p className="text-blue-800 dark:text-blue-200">
                  The ChatBot is now active in the {selectedPosition.replace('-', ' ')} corner. 
                  Click on it to start chatting! You can ask about tours, FAQs, or any general questions.
                </p>
              </div>
            </div>
          )}
        </main>

        {/* ChatBot Component */}
        {config && isClient && (
          <EnhancedChatBot
            llmProvider={config.llm.provider}
            llmApiKey={config.llm.config.apiKey}
            llmModel={config.llm.config.model}
            llmTemperature={config.llm.config.temperature}
            llmMaxTokens={config.llm.config.maxTokens}
            contentstackApiKey={config.contentstack?.apiKey}
            contentstackToken={config.contentstack?.deliveryToken}
            contentstackEnvironment={config.contentstack?.environment}
            contentTypes={config.contentstack?.contentTypes}
            position={selectedPosition}
            theme={selectedTheme as any}
            title="SDK Demo Bot"
            placeholder="Ask me anything..."
            customWelcomeMessage="Welcome to the ChatBot SDK Demo! I'm powered by the latest Phase 3 features. Try asking about tours, FAQs, or anything else!"
            showTypingIndicator={true}
            enableMarkdown={true}
            showTimestamp={true}
            enableCopy={true}
            enableExport={true}
            maxHeight="h-96"
          />
        )}
      </div>
    </ThemeProvider>
  );
}
