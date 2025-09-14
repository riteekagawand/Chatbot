"use client"
import React from 'react';
import { ChatBotProps } from '../types/chat';

export default function ChatBot(props: ChatBotProps) {
  return (
    <div className="chat-bot-container">
      <div className="chat-bot-header">
        <h3>Chat Bot</h3>
      </div>
      <div className="chat-bot-messages">
        <p>Chat bot component - coming soon!</p>
      </div>
      <div className="chat-bot-input">
        <input 
          type="text" 
          placeholder="Type your message..." 
          disabled 
        />
        <button disabled>Send</button>
      </div>
    </div>
  );
}
