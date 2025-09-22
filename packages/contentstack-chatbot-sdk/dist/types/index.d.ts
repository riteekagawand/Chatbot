export interface ContentstackConfig {
    apiKey: string;
    deliveryToken: string;
    environment: string;
    region?: 'us' | 'eu' | 'azure';
    baseUrl?: string;
}
export interface ChatBotConfig {
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
export type AgentConfig = ChatBotConfig;
export interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
    metadata?: Record<string, any>;
}
export interface ContentstackEntry {
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
export interface ChatBotState {
    messages: Message[];
    isOpen: boolean;
    isLoading: boolean;
    isConnected: boolean;
    error?: string;
}
export interface ChatBotEvents {
    onMessage?: (message: Message) => void;
    onStateChange?: (state: ChatBotState) => void;
    onError?: (error: Error) => void;
    onOpen?: () => void;
    onClose?: () => void;
}
export interface ChatBotInstance {
    mount: (container: HTMLElement) => void;
    unmount: () => void;
    open: () => void;
    close: () => void;
    sendMessage: (message: string) => Promise<void>;
    getState: () => ChatBotState;
    updateConfig: (config: Partial<ChatBotConfig>) => void;
    destroy: () => void;
}
export interface ContentstackService {
    fetchContentTypes: () => Promise<string[]>;
    fetchEntries: (contentType: string, query?: string) => Promise<ContentstackEntry[]>;
    searchContent: (message: string) => Promise<{
        tours: ContentstackEntry[];
        faqs: ContentstackEntry[];
    }>;
}
export interface ResponseGenerator {
    generateResponse: (message: string, content: {
        tours: ContentstackEntry[];
        faqs: ContentstackEntry[];
    }) => string;
}
