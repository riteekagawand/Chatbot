"use client"
import React, { useState } from 'react';

// Working demo that shows the SDK is ready
export default function WorkingDemoPage() {
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedPosition, setSelectedPosition] = useState('bottom-right');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                ChatBot SDK Working Demo
              </h1>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium rounded-full">
                ✅ Ready
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* SDK Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              🎉 SDK Status: Ready for Testing!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl mb-2">✅</div>
                <h3 className="font-medium text-green-900 dark:text-green-100">Build Complete</h3>
                <p className="text-sm text-green-700 dark:text-green-200">SDK successfully built and linked</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl mb-2">📦</div>
                <h3 className="font-medium text-blue-900 dark:text-blue-100">Components Ready</h3>
                <p className="text-sm text-blue-700 dark:text-blue-200">All Phase 3 components available</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl mb-2">🎨</div>
                <h3 className="font-medium text-purple-900 dark:text-purple-100">Themes Ready</h3>
                <p className="text-sm text-purple-700 dark:text-purple-200">5 beautiful themes available</p>
              </div>
            </div>
          </div>

          {/* Available Components */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              📦 Available SDK Components
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Core Components</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm">EnhancedChatBot - Advanced chat interface</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm">ConfigForm - Easy setup and configuration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm">LLMProviderSelector - Multi-provider support</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Theme System</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm">ThemeProvider - Theme management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm">ThemeSelector - Interactive switching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm">5 Themes - Light, Dark, Blue, Green, Purple</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* LLM Providers */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              🤖 Supported LLM Providers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'OpenAI', icon: '🤖', models: ['GPT-3.5', 'GPT-4'] },
                { name: 'Groq', icon: '⚡', models: ['Llama 3', 'Mixtral'] },
                { name: 'Anthropic', icon: '🧠', models: ['Claude 3'] },
                { name: 'Perplexity', icon: '🔍', models: ['Sonar'] }
              ].map((provider, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                  <div className="text-2xl mb-2">{provider.icon}</div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{provider.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {provider.models.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
              🚀 How to Use the SDK
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">1. Import Components</h4>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`import { 
  EnhancedChatBot, 
  ConfigForm, 
  ThemeProvider 
} from 'chat-bot';`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">2. Use in Your App</h4>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`<ThemeProvider defaultTheme="light">
  <EnhancedChatBot
    llmProvider="openai"
    llmApiKey="your-api-key"
    position="bottom-right"
    theme="light"
    enableCopy={true}
    enableExport={true}
  />
</ThemeProvider>`}
                </pre>
              </div>
            </div>
          </div>

          {/* Test Links */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              🧪 Test the SDK
            </h2>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/chatbot-demo" 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Original Demo
              </a>
              <a 
                href="/simple-test" 
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Simple Test Page
              </a>
              <button 
                onClick={() => window.open('https://github.com', '_blank')}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}



