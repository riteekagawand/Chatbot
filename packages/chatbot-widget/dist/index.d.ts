import React from 'react';

interface ChatBotProps {
    llmProvider?: 'openai' | 'groq' | 'anthropic' | 'perplexity';
    llmApiKey?: string;
    contentstackApiKey: string;
    contentstackToken: string;
    contentstackEnvironment: string;
    title?: string;
    placeholder?: string;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    theme?: 'light' | 'dark';
    width?: number;
    height?: number;
}
interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}
interface ContentstackEntry {
    uid: string;
    title?: string;
    question?: string;
    answers?: string;
    answer?: string;
    description?: string;
    country?: string;
    price?: number;
    duration?: string;
    [key: string]: any;
}
interface ChatBotState {
    messages: Message[];
    isOpen: boolean;
    isLoading: boolean;
    isConnected: boolean;
}

declare const ChatBot: React.FC<ChatBotProps>;

declare class ContentstackService {
    private baseUrl;
    private apiKey;
    private deliveryToken;
    private environment;
    constructor(apiKey: string, deliveryToken: string, environment: string, region?: string);
    fetchContentTypes(): Promise<string[]>;
    fetchEntries(contentType: string, query?: string): Promise<ContentstackEntry[]>;
    searchContent(message: string): Promise<{
        tours: ContentstackEntry[];
        faqs: ContentstackEntry[];
    }>;
}

export { ChatBot, ContentstackService };
export type { ChatBotProps, ChatBotState, ContentstackEntry, Message };
