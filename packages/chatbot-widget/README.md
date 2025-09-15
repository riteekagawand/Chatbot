# Contentstack ChatBot

A React chatbot component that integrates with Contentstack CMS to provide intelligent responses based on your content.

## Installation

```bash
npm install contentstack-chatbot
```

## Usage

```jsx
import React from 'react';
import { ChatBot } from 'contentstack-chatbot';

function App() {
  return (
    <div>
      <h1>My Website</h1>
      
      <ChatBot 
        llmProvider="openai"
        llmApiKey="your-openai-api-key"
        contentstackApiKey="blt354ba6a0b8b7e140"
        contentstackToken="cs7f1c6103726d54fe1978f31f"
        contentstackEnvironment="development"
        title="Travel Assistant"
        placeholder="Ask me about tours and travel..."
      />
    </div>
  );
}

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `llmProvider` | `'openai' \| 'groq' \| 'anthropic' \| 'perplexity'` | `'openai'` | LLM provider (currently not used) |
| `llmApiKey` | `string` | - | LLM API key (currently not used) |
| `contentstackApiKey` | `string` | - | **Required** - Your Contentstack API key |
| `contentstackToken` | `string` | - | **Required** - Your Contentstack delivery token |
| `contentstackEnvironment` | `string` | - | **Required** - Your Contentstack environment |
| `title` | `string` | `'Travel Assistant'` | Chatbot title |
| `placeholder` | `string` | `'Ask me about tours and travel...'` | Input placeholder text |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Chatbot position |
| `theme` | `'light' \| 'dark'` | `'light'` | Chatbot theme |
| `width` | `number` | `350` | Chatbot width in pixels |
| `height` | `number` | `500` | Chatbot height in pixels |

## Features

- ✅ **Contentstack Integration** - Fetches real-time data from your Contentstack CMS
- ✅ **Smart Responses** - Provides intelligent answers based on your content
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Customizable** - Multiple themes, positions, and styling options
- ✅ **TypeScript Support** - Full TypeScript definitions included
- ✅ **Lightweight** - Minimal dependencies, fast loading

## Content Types Supported

The chatbot automatically works with these Contentstack content types:

- **`tour`** - Travel tours and packages
- **`faqs`** - Frequently asked questions

## Example Queries

The chatbot can handle questions like:

- "How many tours do you have?"
- "What type of accommodation do you provide?"
- "How can I book a tour?"
- "What's your cancellation policy?"
- "What payment methods do you accept?"
- "Are flights included?"
- "Is travel insurance included?"

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Development mode
npm run dev
```

## License

MIT
