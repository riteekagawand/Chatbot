import React from 'react';
import { ReactChatBot } from 'contentstack-chatbot-sdk';

// Example React component using the SDK
function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>My Travel Website</h1>
      <p>Welcome to our travel booking platform. Use the chatbot to get help!</p>
      
      <ReactChatBot 
        contentstack={{
          apiKey: 'blt354ba6a0b8b7e140',
          deliveryToken: 'cs7f1c6103726d54fe1978f31f',
          environment: 'development'
        }}
        title="Travel Assistant"
        placeholder="Ask me about tours and travel..."
        position="bottom-right"
        theme="light"
        width={350}
        height={500}
        autoOpen={false}
        showWelcomeMessage={true}
        welcomeMessage="👋 Hi! I'm your travel assistant. How can I help you today?"
        onMessage={(message) => {
          console.log('New message:', message);
        }}
        onStateChange={(state) => {
          console.log('State changed:', state);
        }}
        onError={(error) => {
          console.error('Chatbot error:', error);
        }}
        onOpen={() => {
          console.log('Chatbot opened');
        }}
        onClose={() => {
          console.log('Chatbot closed');
        }}
      />
    </div>
  );
}

export default App;

// Alternative usage with hooks
import React, { useEffect, useRef } from 'react';
import { ContentstackChatBot } from 'contentstack-chatbot-sdk';

function AppWithHooks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current) {
      chatbotRef.current = ContentstackChatBot.create({
        contentstack: {
          apiKey: 'blt354ba6a0b8b7e140',
          deliveryToken: 'cs7f1c6103726d54fe1978f31f',
          environment: 'development'
        },
        title: 'Travel Assistant',
        placeholder: 'Ask me about tours and travel...'
      }, {
        onMessage: (message) => {
          console.log('New message:', message);
        },
        onStateChange: (state) => {
          console.log('State changed:', state);
        }
      });

      chatbotRef.current.mount(containerRef.current);
    }

    return () => {
      chatbotRef.current?.destroy();
    };
  }, []);

  return (
    <div>
      <h1>My Travel Website</h1>
      <div ref={containerRef} />
    </div>
  );
}

export { AppWithHooks };
