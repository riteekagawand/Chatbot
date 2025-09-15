# Contentstack ChatBot - Usage Guide

## Installation

```bash
npm install contentstack-chatbot
```

## Usage Examples

### 1. React Project

```jsx
import React from 'react';
import { ChatBot } from 'contentstack-chatbot';

function App() {
  return (
    <div>
      <h1>My Website</h1>
      
      <ChatBot 
        contentstackApiKey="your-api-key"
        contentstackToken="your-delivery-token"
        contentstackEnvironment="development"
        title="Travel Assistant"
        placeholder="Ask me about tours and travel..."
      />
    </div>
  );
}

export default App;
```

### 2. Next.js Project

```jsx
'use client';

import { ChatBot } from 'contentstack-chatbot';

export default function HomePage() {
  return (
    <div>
      <h1>My Next.js App</h1>
      
      <ChatBot 
        contentstackApiKey="your-api-key"
        contentstackToken="your-delivery-token"
        contentstackEnvironment="development"
        title="Travel Assistant"
        placeholder="Ask me about tours and travel..."
        position="bottom-right"
        theme="light"
      />
    </div>
  );
}
```

### 3. Vanilla JavaScript/HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
    <script src="https://unpkg.com/contentstack-chatbot@latest/dist/index.js"></script>
</head>
<body>
    <h1>My Website</h1>
    
    <script>
        // Initialize the chatbot
        const chatbot = new ContentstackChatBot({
            contentstackApiKey: 'your-api-key',
            contentstackToken: 'your-delivery-token',
            contentstackEnvironment: 'development',
            title: 'Travel Assistant',
            placeholder: 'Ask me about tours and travel...'
        });
        
        // Mount the chatbot
        chatbot.mount(document.body);
    </script>
</body>
</html>
```

### 4. Vue.js Project

```vue
<template>
  <div>
    <h1>My Vue App</h1>
    <div ref="chatbotContainer"></div>
  </div>
</template>

<script>
import { ChatBot } from 'contentstack-chatbot';

export default {
  name: 'App',
  mounted() {
    // Create chatbot instance
    const chatbot = new ChatBot({
      contentstackApiKey: 'your-api-key',
      contentstackToken: 'your-delivery-token',
      contentstackEnvironment: 'development',
      title: 'Travel Assistant',
      placeholder: 'Ask me about tours and travel...'
    });
    
    // Mount to container
    this.$refs.chatbotContainer.appendChild(chatbot.element);
  }
}
</script>
```

### 5. Angular Project

```typescript
import { Component, OnInit } from '@angular/core';
import { ChatBot } from 'contentstack-chatbot';

@Component({
  selector: 'app-root',
  template: `
    <h1>My Angular App</h1>
    <div #chatbotContainer></div>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('chatbotContainer', { static: true }) chatbotContainer!: ElementRef;

  ngOnInit() {
    const chatbot = new ChatBot({
      contentstackApiKey: 'your-api-key',
      contentstackToken: 'your-delivery-token',
      contentstackEnvironment: 'development',
      title: 'Travel Assistant',
      placeholder: 'Ask me about tours and travel...'
    });
    
    this.chatbotContainer.nativeElement.appendChild(chatbot.element);
  }
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `contentstackApiKey` | `string` | - | **Required** - Your Contentstack API key |
| `contentstackToken` | `string` | - | **Required** - Your Contentstack delivery token |
| `contentstackEnvironment` | `string` | - | **Required** - Your Contentstack environment |
| `title` | `string` | `'Travel Assistant'` | Chatbot title |
| `placeholder` | `string` | `'Ask me about tours and travel...'` | Input placeholder |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Chatbot position |
| `theme` | `'light' \| 'dark'` | `'light'` | Chatbot theme |
| `width` | `number` | `350` | Chatbot width in pixels |
| `height` | `number` | `500` | Chatbot height in pixels |

## Contentstack Setup

Make sure your Contentstack has these content types:

### Tour Content Type
```json
{
  "title": "Tour Title",
  "description": "Tour description",
  "country": "Country name",
  "price": 1000,
  "duration": "7 days"
}
```

### FAQ Content Type
```json
{
  "question": "What type of accommodation is provided?",
  "answers": "We offer 3-star and 4-star hotels with options to upgrade based on your preference.",
  "title": "Accommodation"
}
```

## Example Queries

The chatbot can handle questions like:

- "How many tours do you have?"
- "What type of accommodation do you provide?"
- "How can I book a tour?"
- "What's your cancellation policy?"
- "What payment methods do you accept?"
- "Are flights included?"
- "Is travel insurance included?"

## Troubleshooting

### Common Issues

1. **Module not found**: Make sure you've installed the package with `npm install contentstack-chatbot`
2. **CORS errors**: Ensure your Contentstack API allows requests from your domain
3. **No responses**: Check your API keys and environment settings

### Support

For issues or questions, please check the documentation or create an issue in the repository.
