export { ChatBotCore } from './core/ChatBotCore';
export { ContentstackService } from './services/ContentstackService';
export { ResponseGenerator } from './services/ResponseGenerator';
export { ReactChatBot } from './wrappers/ReactWrapper';
export * from './types';
import { ChatBotConfig, ChatBotEvents, ChatBotInstance } from './types';
export declare class ContentstackChatBot {
    static create(config: ChatBotConfig, events?: ChatBotEvents): ChatBotInstance;
    static createReact(config: ChatBotConfig, events?: ChatBotEvents): {
        config: ChatBotConfig;
        events: ChatBotEvents | undefined;
    };
}
export default ContentstackChatBot;
