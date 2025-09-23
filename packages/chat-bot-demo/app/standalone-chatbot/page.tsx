'use client';

import { ChatBot } from '../../../chat-bot-sdk';

export default function StandaloneChatbot() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      margin: 0, 
      padding: 0,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <ChatBot 
        llmProvider="openai"
        llmApiKey={process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'your-openai-api-key'}
        contentstackApiKey="blt354ba6a0b8b7e140"
        contentstackToken="cs7f1c6103726d54fe1978f31f"
        contentstackEnvironment="development"
        contentTypes={['tour', 'faqs']}
      />
    </div>
  );
}
