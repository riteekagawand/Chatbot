import React from 'react';
import { ChatBotConfig, ChatBotState } from '../types';
interface ReactChatBotProps extends Partial<ChatBotConfig> {
    agentId?: string;
    configUrl?: string;
    onMessage?: (message: any) => void;
    onStateChange?: (state: ChatBotState) => void;
    onError?: (error: Error) => void;
    onOpen?: () => void;
    onClose?: () => void;
}
export declare const ReactChatBot: React.FC<ReactChatBotProps>;
export default ReactChatBot;
