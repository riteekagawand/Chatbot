"use client"
import React, { useState, useRef, useEffect } from 'react';
import { ChatBotProps } from '../types/chat';
import { useChatBot } from '../hooks/useChatBot';

interface EnhancedChatBotProps extends ChatBotProps {
  isMinimized?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  showTypingIndicator?: boolean;
  enableMarkdown?: boolean;
  customWelcomeMessage?: string;
  maxHeight?: string;
  showTimestamp?: boolean;
  enableCopy?: boolean;
  enableExport?: boolean;
}

export default function EnhancedChatBot(props: EnhancedChatBotProps) {
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(props.isMinimized || false);
  const [showSettings, setShowSettings] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { 
    messages, 
    isLoading, 
    error, 
    sendMessage, 
    clearMessages, 
    clearError 
  } = useChatBot(props);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMinimized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    props.onMinimize?.();
  };

  const handleMaximize = () => {
    setIsMinimized(false);
    props.onMaximize?.();
  };

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const exportConversation = () => {
    const conversation = messages.map(msg => 
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n\n');
    
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
    return (
      <div className={`${positionClasses[props.position || 'bottom-right']}`}>
        <button
          onClick={handleMaximize}
          className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          title="Open chat"
        >
          <span className="text-2xl">💬</span>
          {messages.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {messages.length}
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className={`${positionClasses[props.position || 'bottom-right']} w-80 ${maxHeight} flex flex-col rounded-lg shadow-lg border ${themeClasses[props.theme || 'auto']}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">🤖</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{props.title || 'Chat Bot'}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isLoading ? 'Typing...' : 'Powered by AI'}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          {props.enableExport && messages.length > 0 && (
            <button
              onClick={exportConversation}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Export conversation"
            >
              📥
            </button>
          )}
          <button
            onClick={clearMessages}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Clear conversation"
          >
            🗑️
          </button>
          <button
            onClick={handleMinimize}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Minimize"
          >
            ➖
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-2">👋</div>
            <p className="font-medium">{props.customWelcomeMessage || 'Welcome!'}</p>
            <p className="text-sm mt-1">Ask me anything...</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-2 max-w-xs ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                message.role === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}>
                {message.role === 'user' ? '👤' : '🤖'}
              </div>
              
              {/* Message bubble */}
              <div className="group relative">
                <div
                  className={`px-3 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white rounded-br-sm'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {props.enableMarkdown ? (
                      <div dangerouslySetInnerHTML={{ 
                        __html: message.content.replace(/\n/g, '<br>') 
                      }} />
                    ) : (
                      message.content
                    )}
                  </div>
                  {props.showTimestamp && (
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
                
                {/* Copy button */}
                {props.enableCopy && (
                  <button
                    onClick={() => copyToClipboard(message.content, message.id)}
                    className={`absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                    }`}
                    title="Copy message"
                  >
                    {copiedMessageId === message.id ? '✓' : '📋'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isLoading && props.showTypingIndicator && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-sm">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button onClick={clearError} className="text-red-500 hover:text-red-700">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={props.placeholder || "Type your message..."}
            disabled={isLoading}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '⏳' : '📤'}
          </button>
        </div>
      </form>
    </div>
  );
}



