import React, { useEffect, useRef, useState } from 'react';
import { ChatBotCore } from '../core/ChatBotCore';
import { ChatBotConfig, ChatBotEvents, ChatBotState, AgentConfig } from '../types';

interface ReactChatBotProps extends Partial<ChatBotConfig> {
  agentId?: string;
  configUrl?: string; // optional override for hosted config endpoint
  onMessage?: (message: any) => void;
  onStateChange?: (state: ChatBotState) => void;
  onError?: (error: Error) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export const ReactChatBot: React.FC<ReactChatBotProps> = ({
  agentId,
  configUrl,
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
  const [resolvedConfig, setResolvedConfig] = useState<ChatBotConfig | null>(null);

  // Resolve configuration: agentId → fetch; else window → fallback; else props
  useEffect(() => {
    let cancelled = false;

    const resolve = async () => {
      try {
        // 1) If agentId provided, fetch hosted config
        if (agentId) {
          const url = configUrl || `/api/agents/${agentId}/config`;
          const res = await fetch(url, { credentials: 'include' });
          if (!res.ok) throw new Error(`Failed to load agent config: ${res.status}`);
          const data: AgentConfig = await res.json();
          if (!cancelled) setResolvedConfig(data as ChatBotConfig);
          return;
        }
        // 2) If global window-based config exists (script embed)
        const w: any = typeof window !== 'undefined' ? window : undefined;
        if (w && w.ContentstackChatBotConfig && w.ContentstackChatBotConfig.agentConfig) {
          if (!cancelled) setResolvedConfig(w.ContentstackChatBotConfig.agentConfig as ChatBotConfig);
          return;
        }
        // 3) Fallback to props-based config
        if (!cancelled) setResolvedConfig(config as ChatBotConfig);
      } catch (e) {
        onError?.(e as Error);
        if (!cancelled) setResolvedConfig(config as ChatBotConfig);
      }
    };

    resolve();
    return () => { cancelled = true; };
  }, [agentId, configUrl]);

  useEffect(() => {
    if (!containerRef.current || !resolvedConfig) return;

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

    chatbotRef.current = new ChatBotCore(resolvedConfig, events);
    chatbotRef.current.mount(containerRef.current);

    return () => {
      chatbotRef.current?.destroy();
    };
  }, [resolvedConfig]);

  useEffect(() => {
    if (chatbotRef.current && resolvedConfig) {
      chatbotRef.current.updateConfig(resolvedConfig);
    }
  }, [resolvedConfig]);

  return <div ref={containerRef} />;
};

export default ReactChatBot;
