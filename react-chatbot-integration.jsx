// React Chatbot Integration
// Add this to your React website

import React from 'react';
import { ChatBot } from 'chat-bot'; // If you install the SDK

// Or create a custom React component
function TravelChatbot() {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      width: '400px',
      height: '600px',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      overflow: 'hidden'
    }}>
      <iframe
        src="/standalone-chatbot.html"
        width="100%"
        height="100%"
        frameBorder="0"
        title="Travel Assistant Chatbot"
      />
    </div>
  );
}

// Usage in your main App component
function App() {
  return (
    <div>
      {/* Your existing website content */}
      <TravelChatbot />
    </div>
  );
}

export default App;
