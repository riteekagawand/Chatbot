# Getting Started

## Overview

The Chat Bot Platform consists of two main parts:

1. **Chat Bot SDK** - A React component library for developers
2. **Platform Backend** - Handles Contentstack integration and LLM processing

## Quick Start

### 1. Install the SDK

```bash
npm install chat-bot
```

### 2. Basic Usage

```tsx
import { ChatBot } from 'chat-bot';

function App() {
  return (
    <ChatBot 
      llmProvider="openai"
      llmApiKey="sk-..."
      contentstackApiKey="blt..."
      contentstackToken="cs..."
    />
  );
}
```

### 3. Advanced Configuration

```tsx
<ChatBot 
  llmProvider="groq"
  llmApiKey="gsk_..."
  llmModel="llama3-8b-8192"
  contentstackApiKey="blt..."
  contentstackToken="cs..."
  contentstackEnvironment="production"
  contentTypes={["tour", "faq", "blog"]}
  theme="dark"
  position="bottom-right"
  enableStreaming={true}
/>
```

## Development

### Running the Demo

```bash
cd packages/chat-bot-demo
npm run dev
```

### Building the SDK

```bash
cd packages/chat-bot-sdk
npm run build
```

## Architecture

- **SDK**: React components and hooks
- **Platform**: Backend API and Contentstack integration
- **Demo**: Example implementation
