"use client"
import { ChatBot } from 'chat-bot';
import { useState } from 'react';

export default function ChatBotDemo() {
  const [config, setConfig] = useState({
    llmProvider: 'openai' as 'openai' | 'groq' | 'anthropic' | 'perplexity' | 'xai',
    llmApiKey: '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',
    llmModel: 'gpt-3.5-turbo',
    theme: 'auto' as 'light' | 'dark' | 'auto',
    position: 'bottom-right' as 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left',
    enableStreaming: true,
    // Contentstack configuration
    contentstackApiKey: 'blt354ba6a0b8b7e140', // Your real API key
    contentstackToken: 'cs7f1c6103726d54fe1978f31f', // Your real delivery token
    contentstackEnvironment: 'development', // or 'production' if your content is there
    contentTypes: ['tour', 'faq', 'blog'] as string[]
  });

  const handleConfigChange = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Chat Bot SDK Demo
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Configuration
            </h2>
            
            <div className="space-y-4">
              {/* LLM Provider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LLM Provider
                </label>
                <select
                  value={config.llmProvider}
                  onChange={(e) => handleConfigChange('llmProvider', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="perplexity">Perplexity</option>
                  <option value="openai">OpenAI</option>
                  <option value="groq">Groq</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="xai">xAI Grok</option>
                </select>
              </div>

              {/* API Key */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  value={config.llmApiKey}
                  onChange={(e) => handleConfigChange('llmApiKey', e.target.value)}
                  placeholder="Enter your API key..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Model (optional)
                </label>
                <input
                  type="text"
                  value={config.llmModel}
                  onChange={(e) => handleConfigChange('llmModel', e.target.value)}
                  placeholder="Leave empty for default model"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Theme */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theme
                </label>
                <select
                  value={config.theme}
                  onChange={(e) => handleConfigChange('theme', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="auto">Auto</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Position
                </label>
                <select
                  value={config.position}
                  onChange={(e) => handleConfigChange('position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="top-left">Top Left</option>
                </select>
              </div>

              {/* Streaming */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="streaming"
                  checked={config.enableStreaming}
                  onChange={(e) => handleConfigChange('enableStreaming', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="streaming" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Enable Streaming
                </label>
              </div>
            </div>

            {/* Contentstack Configuration */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contentstack CMS (Optional)
              </h3>
              
              <div className="space-y-4">
                {/* Contentstack API Key */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contentstack API Key
                  </label>
                  <input
                    type="password"
                    value={config.contentstackApiKey}
                    onChange={(e) => handleConfigChange('contentstackApiKey', e.target.value)}
                    placeholder="blt..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Contentstack Delivery Token */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Delivery Token
                  </label>
                  <input
                    type="password"
                    value={config.contentstackToken}
                    onChange={(e) => handleConfigChange('contentstackToken', e.target.value)}
                    placeholder="cs..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Environment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Environment
                  </label>
                  <select
                    value={config.contentstackEnvironment}
                    onChange={(e) => handleConfigChange('contentstackEnvironment', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="development">Development</option>
                    <option value="staging">Staging</option>
                    <option value="production">Production</option>
                  </select>
                </div>

                {/* Content Types */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content Types to Search
                  </label>
                  <div className="space-y-2">
                    {['tour', 'faq', 'blog', 'product', 'article'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={config.contentTypes.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleConfigChange('contentTypes', [...config.contentTypes, type]);
                            } else {
                              handleConfigChange('contentTypes', config.contentTypes.filter(t => t !== type));
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                How to get API keys:
              </h3>
              <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                <li>• <strong>Perplexity:</strong> Visit <a href="https://www.perplexity.ai/settings/api" target="_blank" rel="noopener noreferrer" className="underline">perplexity.ai/settings/api</a></li>
                <li>• <strong>OpenAI:</strong> Visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">platform.openai.com</a></li>
                <li>• <strong>Groq:</strong> Visit <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="underline">console.groq.com</a></li>
                <li>• <strong>Anthropic:</strong> Visit <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="underline">console.anthropic.com</a></li>
                <li>• <strong>xAI Grok:</strong> Visit <a href="https://console.x.ai/" target="_blank" rel="noopener noreferrer" className="underline">console.x.ai</a></li>
                <li>• <strong>Contentstack:</strong> Visit <a href="https://app.contentstack.com/" target="_blank" rel="noopener noreferrer" className="underline">app.contentstack.com</a></li>
              </ul>
            </div>
          </div>

          {/* Demo Area */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Live Demo
            </h2>
            
            <div className="h-96 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p className="text-lg font-medium mb-2">Chat Bot will appear here</p>
                <p className="text-sm">Configure the settings and add your API key to test</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Bot Component */}
        {config.llmApiKey && (
          <ChatBot
            llmProvider={config.llmProvider}
            llmApiKey={config.llmApiKey}
            llmModel={config.llmModel || undefined}
            theme={config.theme}
            position={config.position}
            enableStreaming={config.enableStreaming}
            placeholder="Ask me anything..."
            contentstackApiKey={config.contentstackApiKey || undefined}
            contentstackToken={config.contentstackToken || undefined}
            contentstackEnvironment={config.contentstackEnvironment}
            contentTypes={config.contentTypes}
          />
        )}
      </div>
    </div>
  );
}
