import { ChatBotProps } from '../types/chat';
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
export default function EnhancedChatBot(props: EnhancedChatBotProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=EnhancedChatBot.d.ts.map