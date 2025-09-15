import { useState, useCallback, useRef } from 'react';

interface StreamingMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isStreaming?: boolean;
}

interface StreamingOptions {
  onChunk?: (chunk: string) => void;
  onComplete?: (message: StreamingMessage) => void;
  onError?: (error: Error) => void;
}

export function useStreaming() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState('');
  const [streamingMessage, setStreamingMessage] = useState<StreamingMessage | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

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

  const startStreaming = useCallback(async (
    message: string, 
    apiEndpoint: string, 
    options: StreamingOptions = {}
  ) => {
    // Cancel any existing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();
    
    setIsStreaming(true);
    setStreamContent('');
    
    const streamingMessage: StreamingMessage = {
      id: Date.now().toString(),
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      isStreaming: true
    };
    
    setStreamingMessage(streamingMessage);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message,
          stream: true // Request streaming response
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === '') continue;
          
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              setIsStreaming(false);
              const finalMessage = { ...streamingMessage, isStreaming: false };
              setStreamingMessage(finalMessage);
              options.onComplete?.(finalMessage);
              return finalMessage;
            }
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                const newContent = streamingMessage.content + parsed.content;
                const updatedMessage = { ...streamingMessage, content: newContent };
                setStreamingMessage(updatedMessage);
                setStreamContent(newContent);
                options.onChunk?.(parsed.content);
              }
            } catch (e) {
              console.error('Error parsing streaming data:', e);
            }
          }
        }
      }

      // Complete the stream
      setIsStreaming(false);
      const finalMessage = { ...streamingMessage, isStreaming: false };
      setStreamingMessage(finalMessage);
      options.onComplete?.(finalMessage);
      return finalMessage;

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Streaming aborted');
      } else {
        console.error('Streaming error:', error);
        options.onError?.(error as Error);
      }
      setIsStreaming(false);
      setStreamingMessage(null);
      throw error;
    }
  }, []);

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsStreaming(false);
    setStreamingMessage(prev => prev ? { ...prev, isStreaming: false } : null);
  }, []);

  const clearStreamingMessage = useCallback(() => {
    setStreamingMessage(null);
    setStreamContent('');
  }, []);

  return {
    isStreaming,
    streamContent,
    streamingMessage,
    startStream,
    updateStream,
    endStream,
    startStreaming,
    stopStreaming,
    clearStreamingMessage
  };
}
