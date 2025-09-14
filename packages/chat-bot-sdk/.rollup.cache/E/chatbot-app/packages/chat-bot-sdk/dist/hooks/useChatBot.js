import { useState } from 'react';
export function useChatBot() {
    const [state, setState] = useState({
        messages: [],
        isLoading: false,
        error: null
    });
    const sendMessage = async (content) => {
        // TODO: Implement message sending
        console.log('Sending message:', content);
    };
    return Object.assign(Object.assign({}, state), { sendMessage });
}
//# sourceMappingURL=useChatBot.js.map