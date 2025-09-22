"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
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
export default function LLMProviderSelector({ selectedProvider, onProviderChange, onConfigChange, config, className = '', theme = 'auto' }) {
    const [isOpen, setIsOpen] = useState(false);
    const themeClasses = {
        light: 'bg-white text-gray-900 border-gray-200',
        dark: 'bg-gray-800 text-white border-gray-600',
        auto: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600'
    };
    const handleProviderSelect = (provider) => {
        const providerData = providerInfo[provider];
        onProviderChange(provider);
        onConfigChange(Object.assign(Object.assign({}, config), { model: providerData.defaultModel }));
        setIsOpen(false);
    };
    const handleModelChange = (model) => {
        onConfigChange(Object.assign(Object.assign({}, config), { model }));
    };
    const handleApiKeyChange = (apiKey) => {
        onConfigChange(Object.assign(Object.assign({}, config), { apiKey }));
    };
    const selectedProviderData = providerInfo[selectedProvider];
    return (_jsx("div", { className: `relative ${className}`, children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "LLM Provider" }), _jsxs("div", { className: "relative", children: [_jsxs("button", { type: "button", onClick: () => setIsOpen(!isOpen), className: `w-full px-4 py-3 border rounded-lg flex items-center justify-between ${themeClasses[theme]} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-xl", children: selectedProviderData.icon }), _jsxs("div", { className: "text-left", children: [_jsx("div", { className: "font-medium", children: selectedProviderData.name }), _jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: selectedProviderData.description })] })] }), _jsx("svg", { className: `w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })] }), isOpen && (_jsx("div", { className: `absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-10 ${themeClasses[theme]}`, children: Object.entries(providerInfo).map(([key, provider]) => (_jsx("button", { type: "button", onClick: () => handleProviderSelect(key), className: `w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${selectedProvider === key ? 'bg-blue-50 dark:bg-blue-900' : ''}`, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-xl", children: provider.icon }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: provider.name }), _jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: provider.description })] })] }) }, key))) }))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Model" }), _jsx("select", { value: config.model || selectedProviderData.defaultModel, onChange: (e) => handleModelChange(e.target.value), className: `w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`, children: selectedProviderData.models.map((model) => (_jsx("option", { value: model, children: model }, model))) })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-2", children: ["API Key", _jsx("span", { className: "text-red-500 ml-1", children: "*" })] }), _jsx("input", { type: "password", value: config.apiKey || '', onChange: (e) => handleApiKeyChange(e.target.value), placeholder: `Enter your ${selectedProviderData.name} API key`, className: `w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500` }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1", children: "Your API key is stored locally and never shared" })] }), _jsxs("details", { className: "group", children: [_jsx("summary", { className: "cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white", children: "Advanced Settings" }), _jsxs("div", { className: "mt-3 space-y-3 pl-4 border-l-2 border-gray-200 dark:border-gray-600", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Temperature" }), _jsx("input", { type: "range", min: "0", max: "2", step: "0.1", value: config.temperature || 0.7, onChange: (e) => onConfigChange(Object.assign(Object.assign({}, config), { temperature: parseFloat(e.target.value) })), className: "w-full" }), _jsxs("div", { className: "flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1", children: [_jsx("span", { children: "Focused (0)" }), _jsx("span", { children: "Balanced (1)" }), _jsx("span", { children: "Creative (2)" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Max Tokens" }), _jsx("input", { type: "number", min: "100", max: "4000", value: config.maxTokens || 1000, onChange: (e) => onConfigChange(Object.assign(Object.assign({}, config), { maxTokens: parseInt(e.target.value) })), className: `w-full px-3 py-2 border rounded ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500` })] })] })] })] }) }));
}
//# sourceMappingURL=LLMProviderSelector.js.map