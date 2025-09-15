// Core SDK
export { ChatBotCore } from './core/ChatBotCore';
export { ContentstackService } from './services/ContentstackService';
export { ResponseGenerator } from './services/ResponseGenerator';

// React Wrapper
export { ReactChatBot } from './wrappers/ReactWrapper';

// Types
export * from './types';

// Main SDK Class
import { ChatBotCore } from './core/ChatBotCore';
import { ChatBotConfig, ChatBotEvents, ChatBotInstance } from './types';

export class ContentstackChatBot {
  static create(config: ChatBotConfig, events?: ChatBotEvents): ChatBotInstance {
    return new ChatBotCore(config, events);
  }

  static createReact(config: ChatBotConfig, events?: ChatBotEvents) {
    // This will be used by React wrapper
    return { config, events };
  }
}

// Default export for easy importing
export default ContentstackChatBot;
