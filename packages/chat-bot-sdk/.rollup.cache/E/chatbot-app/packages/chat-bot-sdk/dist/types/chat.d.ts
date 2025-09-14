export interface ChatBotProps {
    llmProvider?: 'openai' | 'groq' | 'anthropic';
    llmApiKey?: string;
    llmModel?: string;
    contentstackApiKey?: string;
    contentstackToken?: string;
    contentstackEnvironment?: string;
    theme?: 'light' | 'dark' | 'auto';
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    placeholder?: string;
    contentTypes?: string[];
    maxMessages?: number;
    enableStreaming?: boolean;
    onMessage?: (message: string) => void;
    onError?: (error: Error) => void;
}
export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}
export interface ChatState {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
}
//# sourceMappingURL=chat.d.ts.map