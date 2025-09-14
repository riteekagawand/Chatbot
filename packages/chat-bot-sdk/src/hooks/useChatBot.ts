import { useState } from 'react';
import { ChatState, Message } from '../types/chat';

export function useChatBot() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null
  });

  const sendMessage = async (content: string) => {
    // TODO: Implement message sending
    console.log('Sending message:', content);
  };

  return {
    ...state,
    sendMessage
  };
}
