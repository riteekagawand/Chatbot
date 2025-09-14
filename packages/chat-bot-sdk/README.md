# Chat Bot SDK

A plug-and-play chat bot SDK for React applications with Contentstack integration.

## Installation

```bash
npm install chat-bot
```

## Quick Start

```tsx
import { ChatBot } from 'chat-bot';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <ChatBot 
        llmProvider="openai"
        llmApiKey="sk-..."
        contentstackApiKey="blt..."
        contentstackToken="cs..."
      />
    </div>
  );
}
```

## Features

- 🤖 Multi-LLM support (OpenAI, Groq, Anthropic)
- 📦 Contentstack CMS integration
- ⚡ Streaming responses
- 🎨 Customizable themes
- 🔧 Zero configuration setup
- 📱 Responsive design

## Documentation

See the main README.md for complete documentation.
