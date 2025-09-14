import { useState, useCallback } from 'react';

export function useStreaming() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState('');

  const startStream = useCallback(() => {
    setIsStreaming(true);
    setStreamContent('');
  }, []);

  const updateStream = useCallback((content: string) => {
    setStreamContent(content);
  }, []);

  const endStream = useCallback(() => {
    setIsStreaming(false);
  }, []);

  return {
    isStreaming,
    streamContent,
    startStream,
    updateStream,
    endStream
  };
}
