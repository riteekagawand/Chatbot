import React, { useEffect, useRef, useState } from 'react';
import { ChatBotCore } from '../core/ChatBotCore';
import { ChatBotConfig, ChatBotEvents, ChatBotState } from '../types';

interface ReactChatBotProps extends ChatBotConfig {
  onMessage?: (message: any) => void;
  onStateChange?: (state: ChatBotState) => void;
  onError?: (error: Error) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export const ReactChatBot: React.FC<ReactChatBotProps> = ({
  onMessage,
  onStateChange,
  onError,
  onOpen,
  onClose,
  ...config
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<ChatBotCore | null>(null);
  const [state, setState] = useState<ChatBotState>({
    messages: [],
    isOpen: config.autoOpen || false,
    isLoading: false,
    isConnected: true
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const events: ChatBotEvents = {
      onMessage: (message) => {
        setState(prev => ({ ...prev, messages: [...prev.messages, message] }));
        onMessage?.(message);
      },
      onStateChange: (newState) => {
        setState(newState);
        onStateChange?.(newState);
      },
      onError: (error) => {
        onError?.(error);
      },
      onOpen: () => {
        onOpen?.();
      },
      onClose: () => {
        onClose?.();
      }
    };

    chatbotRef.current = new ChatBotCore(config, events);
    chatbotRef.current.mount(containerRef.current);

    return () => {
      chatbotRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (chatbotRef.current) {
      chatbotRef.current.updateConfig(config);
    }
  }, [config]);

  return <div ref={containerRef} />;
};

export default ReactChatBot;
