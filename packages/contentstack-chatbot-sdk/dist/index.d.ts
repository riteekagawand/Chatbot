import React from 'react';

interface ContentstackConfig {
    apiKey: string;
    deliveryToken: string;
    environment: string;
    region?: 'us' | 'eu' | 'azure';
    baseUrl?: string;
}
interface ChatBotConfig {
    contentstack: ContentstackConfig;
    title?: string;
    placeholder?: string;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    theme?: 'light' | 'dark';
    width?: number;
    height?: number;
    autoOpen?: boolean;
    showWelcomeMessage?: boolean;
    welcomeMessage?: string;
}
interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
    metadata?: Record<string, any>;
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
    error?: string;
}
interface ChatBotEvents {
    onMessage?: (message: Message) => void;
    onStateChange?: (state: ChatBotState) => void;
    onError?: (error: Error) => void;
    onOpen?: () => void;
    onClose?: () => void;
}
interface ChatBotInstance {
    mount: (container: HTMLElement) => void;
    unmount: () => void;
    open: () => void;
    close: () => void;
    sendMessage: (message: string) => Promise<void>;
    getState: () => ChatBotState;
    updateConfig: (config: Partial<ChatBotConfig>) => void;
    destroy: () => void;
}
interface ContentstackService$1 {
    fetchContentTypes: () => Promise<string[]>;
    fetchEntries: (contentType: string, query?: string) => Promise<ContentstackEntry[]>;
    searchContent: (message: string) => Promise<{
        tours: ContentstackEntry[];
        faqs: ContentstackEntry[];
    }>;
}
interface ResponseGenerator$1 {
    generateResponse: (message: string, content: {
        tours: ContentstackEntry[];
        faqs: ContentstackEntry[];
    }) => string;
}

declare class ChatBotCore implements ChatBotInstance {
    private config;
    private state;
    private events;
    private contentstackService;
    private responseGenerator;
    private container;
    private chatElement;
    constructor(config: ChatBotConfig, events?: ChatBotEvents);
    private initializeState;
    mount(container: HTMLElement): void;
    unmount(): void;
    open(): void;
    close(): void;
    sendMessage(message: string): Promise<void>;
    getState(): ChatBotState;
    updateConfig(newConfig: Partial<ChatBotConfig>): void;
    destroy(): void;
    private setState;
    private addMessage;
    private createChatElement;
    private getPositionStyles;
    private render;
    private renderChatWindow;
    private renderHeader;
    private renderMessages;
    private renderInput;
    private renderChatButton;
    private getThemeStyles;
    private attachEventListeners;
    private handleSendMessage;
}

declare class ContentstackService implements ContentstackService$1 {
    private httpClient;
    private config;
    constructor(config: ContentstackConfig);
    private getBaseUrl;
    fetchContentTypes(): Promise<string[]>;
    fetchEntries(contentType: string, query?: string): Promise<ContentstackEntry[]>;
    searchContent(message: string): Promise<{
        tours: ContentstackEntry[];
        faqs: ContentstackEntry[];
    }>;
    updateConfig(newConfig: Partial<ContentstackConfig>): void;
}

declare class ResponseGenerator implements ResponseGenerator$1 {
    generateResponse(message: string, content: {
        tours: ContentstackEntry[];
        faqs: ContentstackEntry[];
    }): string;
}

interface ReactChatBotProps extends ChatBotConfig {
    onMessage?: (message: any) => void;
    onStateChange?: (state: ChatBotState) => void;
    onError?: (error: Error) => void;
    onOpen?: () => void;
    onClose?: () => void;
}
declare const ReactChatBot: React.FC<ReactChatBotProps>;

declare class ContentstackChatBot {
    static create(config: ChatBotConfig, events?: ChatBotEvents): ChatBotInstance;
    static createReact(config: ChatBotConfig, events?: ChatBotEvents): {
        config: ChatBotConfig;
        events: ChatBotEvents | undefined;
    };
}

export { ChatBotCore, ContentstackChatBot, ContentstackService, ReactChatBot, ResponseGenerator, ContentstackChatBot as default };
export type { ChatBotConfig, ChatBotEvents, ChatBotInstance, ChatBotState, ContentstackConfig, ContentstackEntry, Message };
