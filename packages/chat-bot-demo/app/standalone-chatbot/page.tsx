'use client';

import { EnhancedChatBot } from '../../../chat-bot-sdk/src/components/EnhancedChatBot';

export default function StandaloneChatbot() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      margin: 0, 
      padding: 0,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <EnhancedChatBot 
        llmProvider="openai"
        llmApiKey={process.env.NEXT_PUBLIC_OPENAI_API_KEY || "your-openai-api-key"}
        contentstackApiKey="blt354ba6a0b8b7e140"
        contentstackToken="cs7f1c6103726d54fe1978f31f"
        contentstackEnvironment="development"
        contentTypes={['tour', 'faqs']}
        title="Travel Assistant"
        placeholder="Ask me about tours, FAQs, or any travel questions..."
        theme="light"
        position="bottom-right"
        customWelcomeMessage="Hi! I'm your travel assistant. I can help you with information about our tours, answer FAQs, and assist with travel planning. How can I help you today?"
        enableMarkdown={true}
        showTimestamp={true}
        enableCopy={true}
        maxHeight="100vh"
        showTypingIndicator={true}
        onMessage={(message) => console.log('New message:', message)}
        onError={(error) => console.error('Chatbot error:', error)}
      />
    </div>
  );
}
