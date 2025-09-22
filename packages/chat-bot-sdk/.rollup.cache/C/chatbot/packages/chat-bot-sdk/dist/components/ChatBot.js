"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { useChatBot } from '../hooks/useChatBot';
export default function ChatBot(props) {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const { messages, isLoading, error, sendMessage, clearMessages, clearError } = useChatBot(props);
    const scrollToBottom = () => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading)
            return;
        const message = input.trim();
        setInput('');
        await sendMessage(message);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };
    const positionClasses = {
        'bottom-right': 'fixed bottom-4 right-4',
        'bottom-left': 'fixed bottom-4 left-4',
        'top-right': 'fixed top-4 right-4',
        'top-left': 'fixed top-4 left-4',
    };
    const themeClasses = {
        light: 'bg-white text-gray-900 border-gray-200',
        dark: 'bg-gray-800 text-white border-gray-600',
        auto: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600'
    };
    return (_jsxs("div", { className: `${positionClasses[props.position || 'bottom-right']} w-80 h-96 flex flex-col rounded-lg shadow-lg border ${themeClasses[props.theme || 'auto']}`, children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-white text-sm font-bold", children: "\uD83E\uDD16" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: "Chat Bot" }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Powered by AI" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: clearMessages, className: "text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700", title: "Clear conversation", children: "Clear" }), _jsx("button", { onClick: () => { }, className: "text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700", title: "Minimize", children: "\u2212" })] })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [messages.length === 0 && (_jsxs("div", { className: "text-center text-gray-500 dark:text-gray-400", children: [_jsx("p", { children: "Start a conversation!" }), _jsx("p", { className: "text-sm mt-1", children: "Ask me anything..." })] })), messages.map((message) => (_jsx("div", { className: `flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`, children: _jsxs("div", { className: `flex items-start gap-2 max-w-xs ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`, children: [_jsx("div", { className: `w-6 h-6 rounded-full flex items-center justify-center text-xs ${message.role === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`, children: message.role === 'user' ? '👤' : '🤖' }), _jsxs("div", { className: `px-3 py-2 rounded-lg ${message.role === 'user'
                                        ? 'bg-blue-500 text-white rounded-br-sm'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm'}`, children: [_jsx("p", { className: "text-sm whitespace-pre-wrap leading-relaxed", children: message.content }), _jsx("p", { className: "text-xs opacity-70 mt-1", children: message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })] })] }) }, message.id))), isLoading && (_jsx("div", { className: "flex justify-start", children: _jsx("div", { className: "bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2", children: _jsxs("div", { className: "flex space-x-1", children: [_jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce" }), _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0.1s' } }), _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0.2s' } })] }) }) })), _jsx("div", { ref: messagesEndRef })] }), error && (_jsx("div", { className: "px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-sm", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { children: error }), _jsx("button", { onClick: clearError, className: "text-red-500 hover:text-red-700", children: "\u00D7" })] }) })), _jsx("form", { onSubmit: handleSubmit, className: "p-4 border-t border-gray-200 dark:border-gray-600", children: _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyPress: handleKeyPress, placeholder: props.placeholder || "Type your message...", disabled: isLoading, className: "flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" }), _jsx("button", { type: "submit", disabled: !input.trim() || isLoading, className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed", children: "Send" })] }) })] }));
}
//# sourceMappingURL=ChatBot.js.map