"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import LLMProviderSelector from './LLMProviderSelector';
export default function ConfigForm({ onConfigSubmit, initialConfig, className = '', theme = 'auto' }) {
    var _a;
    const [llmProvider, setLlmProvider] = useState((initialConfig === null || initialConfig === void 0 ? void 0 : initialConfig.llm.provider) || 'openai');
    const [llmConfig, setLlmConfig] = useState((initialConfig === null || initialConfig === void 0 ? void 0 : initialConfig.llm.config) || {
        apiKey: '',
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 1000
    });
    const [contentstackConfig, setContentstackConfig] = useState((initialConfig === null || initialConfig === void 0 ? void 0 : initialConfig.contentstack) || {
        apiKey: '',
        deliveryToken: '',
        environment: 'development',
        contentTypes: ['tour', 'faqs']
    });
    const [isContentstackEnabled, setIsContentstackEnabled] = useState(!!((_a = initialConfig === null || initialConfig === void 0 ? void 0 : initialConfig.contentstack) === null || _a === void 0 ? void 0 : _a.apiKey));
    const themeClasses = {
        light: 'bg-white text-gray-900 border-gray-200',
        dark: 'bg-gray-800 text-white border-gray-600',
        auto: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600'
    };
    const handleSubmit = (e) => {
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
    const handleContentstackChange = (field, value) => {
        setContentstackConfig(prev => (Object.assign(Object.assign({}, prev), { [field]: value })));
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: `space-y-6 ${className}`, children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "ChatBot Configuration" }), _jsx("p", { className: "text-gray-600 dark:text-gray-400", children: "Configure your AI chatbot with LLM and content integration" })] }), _jsxs("div", { className: `p-6 border rounded-lg ${themeClasses[theme]}`, children: [_jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [_jsx("span", { className: "text-2xl", children: "\uD83E\uDD16" }), "LLM Configuration"] }), _jsx(LLMProviderSelector, { selectedProvider: llmProvider, onProviderChange: setLlmProvider, onConfigChange: setLlmConfig, config: llmConfig, theme: theme })] }), _jsxs("div", { className: `p-6 border rounded-lg ${themeClasses[theme]}`, children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [_jsx("span", { className: "text-2xl", children: "\uD83D\uDCDA" }), "Content Integration"] }), _jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: isContentstackEnabled, onChange: (e) => setIsContentstackEnabled(e.target.checked), className: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" }), _jsx("span", { className: "text-sm font-medium", children: "Enable Content Integration" })] })] }), isContentstackEnabled && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-2", children: ["Contentstack API Key", _jsx("span", { className: "text-red-500 ml-1", children: "*" })] }), _jsx("input", { type: "text", value: contentstackConfig.apiKey, onChange: (e) => handleContentstackChange('apiKey', e.target.value), placeholder: "blt...", className: `w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500` })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-2", children: ["Delivery Token", _jsx("span", { className: "text-red-500 ml-1", children: "*" })] }), _jsx("input", { type: "password", value: contentstackConfig.deliveryToken, onChange: (e) => handleContentstackChange('deliveryToken', e.target.value), placeholder: "cs...", className: `w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500` })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Environment" }), _jsxs("select", { value: contentstackConfig.environment, onChange: (e) => handleContentstackChange('environment', e.target.value), className: `w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`, children: [_jsx("option", { value: "development", children: "Development" }), _jsx("option", { value: "staging", children: "Staging" }), _jsx("option", { value: "production", children: "Production" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Content Types" }), _jsx("div", { className: "space-y-2", children: ['tour', 'faqs', 'blog', 'product', 'article'].map((type) => {
                                            var _a;
                                            return (_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: ((_a = contentstackConfig.contentTypes) === null || _a === void 0 ? void 0 : _a.includes(type)) || false, onChange: (e) => {
                                                            const currentTypes = contentstackConfig.contentTypes || [];
                                                            const newTypes = e.target.checked
                                                                ? [...currentTypes, type]
                                                                : currentTypes.filter((t) => t !== type);
                                                            handleContentstackChange('contentTypes', newTypes);
                                                        }, className: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" }), _jsx("span", { className: "text-sm capitalize", children: type })] }, type));
                                        }) })] })] }))] }), _jsxs("div", { className: `p-6 border rounded-lg ${themeClasses[theme]}`, children: [_jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [_jsx("span", { className: "text-2xl", children: "\u2699\uFE0F" }), "ChatBot Settings"] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Position" }), _jsxs("select", { className: `w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`, children: [_jsx("option", { value: "bottom-right", children: "Bottom Right" }), _jsx("option", { value: "bottom-left", children: "Bottom Left" }), _jsx("option", { value: "top-right", children: "Top Right" }), _jsx("option", { value: "top-left", children: "Top Left" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Theme" }), _jsxs("select", { className: `w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`, children: [_jsx("option", { value: "auto", children: "Auto (System)" }), _jsx("option", { value: "light", children: "Light" }), _jsx("option", { value: "dark", children: "Dark" })] })] })] }), _jsxs("div", { className: "mt-4", children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Welcome Message" }), _jsx("textarea", { placeholder: "Enter a custom welcome message...", className: `w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`, rows: 3 })] })] }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { type: "submit", className: "px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium", children: "Save Configuration" }) })] }));
}
//# sourceMappingURL=ConfigForm.js.map