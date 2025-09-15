<template>
  <div>
    <h1>My Vue Travel Website</h1>
    <p>Welcome to our travel booking platform. Use the chatbot to get help!</p>
    <div ref="chatbotContainer"></div>
  </div>
</template>

<script>
import { ContentstackChatBot } from 'contentstack-chatbot-sdk';

export default {
  name: 'App',
  mounted() {
    const chatbot = ContentstackChatBot.create({
      contentstack: {
        apiKey: 'blt354ba6a0b8b7e140',
        deliveryToken: 'cs7f1c6103726d54fe1978f31f',
        environment: 'development'
      },
      title: 'Travel Assistant',
      placeholder: 'Ask me about tours and travel...',
      position: 'bottom-right',
      theme: 'light',
      width: 350,
      height: 500
    }, {
      onMessage: (message) => {
        console.log('New message:', message);
      },
      onStateChange: (state) => {
        console.log('State changed:', state);
      },
      onError: (error) => {
        console.error('Chatbot error:', error);
      }
    });
    
    chatbot.mount(this.$refs.chatbotContainer);
    
    // Store reference for cleanup
    this.chatbot = chatbot;
  },
  beforeUnmount() {
    if (this.chatbot) {
      this.chatbot.destroy();
    }
  }
}
</script>

<style>
body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}

h1 {
  color: #333;
  text-align: center;
}
</style>
