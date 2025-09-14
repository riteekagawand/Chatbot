import { useState } from 'react';
import { ContentstackConfig } from '../types/contentstack';

export function useContentstack() {
  const [config, setConfig] = useState<ContentstackConfig | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = async (newConfig: ContentstackConfig) => {
    // TODO: Implement Contentstack connection
    setConfig(newConfig);
    setIsConnected(true);
  };

  const disconnect = () => {
    setConfig(null);
    setIsConnected(false);
  };

  return {
    config,
    isConnected,
    connect,
    disconnect
  };
}
