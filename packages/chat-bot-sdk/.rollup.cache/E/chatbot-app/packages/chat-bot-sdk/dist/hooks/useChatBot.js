import { useState, useCallback } from 'react';
export function useChatBot(props) {
    const [state, setState] = useState({
        messages: [],
        isLoading: false,
        error: null
    });
    // Conversation context for better responses
    const getConversationContext = useCallback(() => {
        const recentMessages = state.messages.slice(-6); // Last 6 messages for context
        return recentMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    }, [state.messages]);
    const sendMessage = useCallback(async (content) => {
        if (!props.llmProvider || !props.llmApiKey) {
            setState(prev => (Object.assign(Object.assign({}, prev), { error: 'LLM provider or API key not configured' })));
            return;
        }
        const userMessage = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date()
        };
        setState(prev => (Object.assign(Object.assign({}, prev), { messages: [...prev.messages, userMessage], isLoading: true, error: null })));
        try {
            // Make API call to the chat endpoint
            const apiResponse = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: content,
                    llmProvider: props.llmProvider,
                    llmApiKey: props.llmApiKey,
                    llmModel: props.llmModel,
                    enableStreaming: props.enableStreaming,
                    contentstackApiKey: props.contentstackApiKey,
                    contentstackToken: props.contentstackToken,
                    contentstackEnvironment: props.contentstackEnvironment,
                    contentTypes: props.contentTypes,
                    conversationContext: getConversationContext()
                }),
            });
            if (!apiResponse.ok) {
                const errorData = await apiResponse.json().catch(() => ({}));
                // Handle specific error types
                if (errorData.type === 'RATE_LIMIT') {
                    throw new Error(`Rate limit exceeded. Please wait ${errorData.retryAfter || 60} seconds before trying again.`);
                }
                if (errorData.type === 'AUTH_ERROR') {
                    throw new Error('Invalid API credentials. Please check your API key and try again.');
                }
                if (errorData.type === 'CONTENT_ERROR') {
                    throw new Error('Content service temporarily unavailable. Please try again later.');
                }
                if (errorData.type === 'TIMEOUT_ERROR') {
                    throw new Error('Request timeout. Please try again.');
                }
                throw new Error(errorData.error || `HTTP error! status: ${apiResponse.status}`);
            }
            const data = await apiResponse.json();
            const response = data.content;
            const assistantMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date()
            };
            setState(prev => (Object.assign(Object.assign({}, prev), { messages: [...prev.messages, assistantMessage], isLoading: false })));
        }
        catch (error) {
            setState(prev => (Object.assign(Object.assign({}, prev), { isLoading: false, error: error instanceof Error ? error.message : 'Failed to send message' })));
        }
    }, [props.llmProvider, props.llmApiKey, props.llmModel, props.enableStreaming]);
    const clearMessages = useCallback(() => {
        setState(prev => (Object.assign(Object.assign({}, prev), { messages: [] })));
    }, []);
    const clearError = useCallback(() => {
        setState(prev => (Object.assign(Object.assign({}, prev), { error: null })));
    }, []);
    return Object.assign(Object.assign({}, state), { sendMessage,
        clearMessages,
        clearError });
}
//# sourceMappingURL=useChatBot.js.map