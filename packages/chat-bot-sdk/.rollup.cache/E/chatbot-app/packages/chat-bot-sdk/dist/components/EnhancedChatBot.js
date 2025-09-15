"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { useChatBot } from '../hooks/useChatBot';
export default function EnhancedChatBot(props) {
    const [input, setInput] = useState('');
    const [isMinimized, setIsMinimized] = useState(props.isMinimized || false);
    const [showSettings, setShowSettings] = useState(false);
    const [copiedMessageId, setCopiedMessageId] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const { messages, isLoading, error, sendMessage, clearMessages, clearError } = useChatBot(props);
    const scrollToBottom = () => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    useEffect(() => {
        if (!isMinimized && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isMinimized]);
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
    const handleMinimize = () => {
        var _a;
        setIsMinimized(true);
        (_a = props.onMinimize) === null || _a === void 0 ? void 0 : _a.call(props);
    };
    const handleMaximize = () => {
        var _a;
        setIsMinimized(false);
        (_a = props.onMaximize) === null || _a === void 0 ? void 0 : _a.call(props);
    };
    const copyToClipboard = async (text, messageId) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedMessageId(messageId);
            setTimeout(() => setCopiedMessageId(null), 2000);
        }
        catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };
    const exportConversation = () => {
        const conversation = messages.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n\n');
        const blob = new Blob([conversation], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chatbot-conversation-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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
    const maxHeight = props.maxHeight || 'h-96';
    // Minimized state - just show a floating button
    if (isMinimized) {
        return (_jsx("div", { className: `${positionClasses[props.position || 'bottom-right']}`, children: _jsxs("button", { onClick: handleMaximize, className: "w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110", title: "Open chat", children: [_jsx("span", { className: "text-2xl", children: "\uD83D\uDCAC" }), messages.length > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center", children: messages.length }))] }) }));
    }
    return (_jsxs("div", { className: `${positionClasses[props.position || 'bottom-right']} w-80 ${maxHeight} flex flex-col rounded-lg shadow-lg border ${themeClasses[props.theme || 'auto']}`, children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-white text-sm font-bold", children: "\uD83E\uDD16" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: props.title || 'Chat Bot' }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: isLoading ? 'Typing...' : 'Powered by AI' })] })] }), _jsxs("div", { className: "flex gap-1", children: [props.enableExport && messages.length > 0 && (_jsx("button", { onClick: exportConversation, className: "text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700", title: "Export conversation", children: "\uD83D\uDCE5" })), _jsx("button", { onClick: clearMessages, className: "text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700", title: "Clear conversation", children: "\uD83D\uDDD1\uFE0F" }), _jsx("button", { onClick: handleMinimize, className: "text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700", title: "Minimize", children: "\u2796" })] })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [messages.length === 0 && (_jsxs("div", { className: "text-center text-gray-500 dark:text-gray-400", children: [_jsx("div", { className: "text-4xl mb-2", children: "\uD83D\uDC4B" }), _jsx("p", { className: "font-medium", children: props.customWelcomeMessage || 'Welcome!' }), _jsx("p", { className: "text-sm mt-1", children: "Ask me anything..." })] })), messages.map((message) => (_jsx("div", { className: `flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`, children: _jsxs("div", { className: `flex items-start gap-2 max-w-xs ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`, children: [_jsx("div", { className: `w-6 h-6 rounded-full flex items-center justify-center text-xs ${message.role === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`, children: message.role === 'user' ? '👤' : '🤖' }), _jsxs("div", { className: "group relative", children: [_jsxs("div", { className: `px-3 py-2 rounded-lg ${message.role === 'user'
                                                ? 'bg-blue-500 text-white rounded-br-sm'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm'}`, children: [_jsx("div", { className: "text-sm whitespace-pre-wrap leading-relaxed", children: props.enableMarkdown ? (_jsx("div", { dangerouslySetInnerHTML: {
                                                            __html: message.content.replace(/\n/g, '<br>')
                                                        } })) : (message.content) }), props.showTimestamp && (_jsx("p", { className: "text-xs opacity-70 mt-1", children: message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }))] }), props.enableCopy && (_jsx("button", { onClick: () => copyToClipboard(message.content, message.id), className: `absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity ${message.role === 'user'
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'}`, title: "Copy message", children: copiedMessageId === message.id ? '✓' : '📋' }))] })] }) }, message.id))), isLoading && props.showTypingIndicator && (_jsx("div", { className: "flex justify-start", children: _jsx("div", { className: "bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2", children: _jsxs("div", { className: "flex space-x-1", children: [_jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce" }), _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0.1s' } }), _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0.2s' } })] }) }) })), _jsx("div", { ref: messagesEndRef })] }), error && (_jsx("div", { className: "px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-sm", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { children: error }), _jsx("button", { onClick: clearError, className: "text-red-500 hover:text-red-700", children: "\u00D7" })] }) })), _jsx("form", { onSubmit: handleSubmit, className: "p-4 border-t border-gray-200 dark:border-gray-600", children: _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { ref: inputRef, type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyPress: handleKeyPress, placeholder: props.placeholder || "Type your message...", disabled: isLoading, className: "flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" }), _jsx("button", { type: "submit", disabled: !input.trim() || isLoading, className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: isLoading ? '⏳' : '📤' })] }) })] }));
}
//# sourceMappingURL=EnhancedChatBot.js.map