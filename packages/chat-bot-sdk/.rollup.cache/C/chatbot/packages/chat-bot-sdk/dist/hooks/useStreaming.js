import { useState, useCallback, useRef } from 'react';
export function useStreaming() {
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamContent, setStreamContent] = useState('');
    const [streamingMessage, setStreamingMessage] = useState(null);
    const abortControllerRef = useRef(null);
    const startStream = useCallback(() => {
        setIsStreaming(true);
        setStreamContent('');
    }, []);
    const updateStream = useCallback((content) => {
        setStreamContent(content);
    }, []);
    const endStream = useCallback(() => {
        setIsStreaming(false);
    }, []);
    const startStreaming = useCallback(async (message, apiEndpoint, options = {}) => {
        var _a, _b, _c, _d, _e;
        // Cancel any existing stream
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        // Create new abort controller
        abortControllerRef.current = new AbortController();
        setIsStreaming(true);
        setStreamContent('');
        const streamingMessage = {
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
            const reader = (_a = response.body) === null || _a === void 0 ? void 0 : _a.getReader();
            if (!reader) {
                throw new Error('No response body');
            }
            const decoder = new TextDecoder();
            let buffer = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done)
                    break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';
                for (const line of lines) {
                    if (line.trim() === '')
                        continue;
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') {
                            setIsStreaming(false);
                            const finalMessage = Object.assign(Object.assign({}, streamingMessage), { isStreaming: false });
                            setStreamingMessage(finalMessage);
                            (_b = options.onComplete) === null || _b === void 0 ? void 0 : _b.call(options, finalMessage);
                            return finalMessage;
                        }
                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.content) {
                                const newContent = streamingMessage.content + parsed.content;
                                const updatedMessage = Object.assign(Object.assign({}, streamingMessage), { content: newContent });
                                setStreamingMessage(updatedMessage);
                                setStreamContent(newContent);
                                (_c = options.onChunk) === null || _c === void 0 ? void 0 : _c.call(options, parsed.content);
                            }
                        }
                        catch (e) {
                            console.error('Error parsing streaming data:', e);
                        }
                    }
                }
            }
            // Complete the stream
            setIsStreaming(false);
            const finalMessage = Object.assign(Object.assign({}, streamingMessage), { isStreaming: false });
            setStreamingMessage(finalMessage);
            (_d = options.onComplete) === null || _d === void 0 ? void 0 : _d.call(options, finalMessage);
            return finalMessage;
        }
        catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                console.log('Streaming aborted');
            }
            else {
                console.error('Streaming error:', error);
                (_e = options.onError) === null || _e === void 0 ? void 0 : _e.call(options, error);
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
        setStreamingMessage(prev => prev ? Object.assign(Object.assign({}, prev), { isStreaming: false }) : null);
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
//# sourceMappingURL=useStreaming.js.map