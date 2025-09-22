import { Message, ChatBotProps } from '../types/chat';
export declare function useChatBot(props: ChatBotProps): {
    sendMessage: (content: string) => Promise<void>;
    clearMessages: () => void;
    clearError: () => void;
    messages: Message[];
    isLoading: boolean;
    error: string | null;
};
//# sourceMappingURL=useChatBot.d.ts.map