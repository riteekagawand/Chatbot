import React from 'react';
import { ChatBot } from '../dist/index.js';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Travel Booking Website</h1>
      <p>Welcome to our travel booking platform. Use the chatbot in the bottom right to get help!</p>
      
      <ChatBot 
        contentstackApiKey="blt354ba6a0b8b7e140"
        contentstackToken="cs7f1c6103726d54fe1978f31f"
        contentstackEnvironment="development"
        title="Travel Assistant"
        placeholder="Ask me about tours and travel..."
        position="bottom-right"
        theme="light"
      />
    </div>
  );
}

export default App;
