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
export declare function useStreaming(): {
    isStreaming: boolean;
    streamContent: string;
    streamingMessage: StreamingMessage | null;
    startStream: () => void;
    updateStream: (content: string) => void;
    endStream: () => void;
    startStreaming: (message: string, apiEndpoint: string, options?: StreamingOptions) => Promise<{
        isStreaming: boolean;
        id: string;
        content: string;
        role: "user" | "assistant";
        timestamp: Date;
    }>;
    stopStreaming: () => void;
    clearStreamingMessage: () => void;
};
export {};
//# sourceMappingURL=useStreaming.d.ts.map