import { Message } from '../types/chat';
export declare function useChatBot(): {
    sendMessage: (content: string) => Promise<void>;
    messages: Message[];
    isLoading: boolean;
    error: string | null;
};
//# sourceMappingURL=useChatBot.d.ts.map