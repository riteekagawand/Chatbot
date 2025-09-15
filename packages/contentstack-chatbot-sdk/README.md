# Contentstack ChatBot SDK

A universal SDK for integrating Contentstack-powered chatbots into any project. Works with React, Vue, Angular, vanilla JavaScript, and more.

## Features

- ✅ **Universal Compatibility** - Works with any framework or vanilla JavaScript
- ✅ **Contentstack Integration** - Fetches real-time data from your Contentstack CMS
- ✅ **Smart Responses** - Intelligent responses based on your content
- ✅ **Customizable** - Themes, positions, and styling options
- ✅ **TypeScript Support** - Full TypeScript definitions
- ✅ **Lightweight** - Minimal dependencies, fast loading
- ✅ **Framework Wrappers** - React, Vue, Angular support

## Installation

```bash
npm install contentstack-chatbot-sdk
```

## Quick Start

### Vanilla JavaScript

```javascript
import { ContentstackChatBot } from 'contentstack-chatbot-sdk';

const chatbot = ContentstackChatBot.create({
  contentstack: {
    apiKey: 'your-api-key',
    deliveryToken: 'your-delivery-token',
    environment: 'development'
  },
  title: 'Travel Assistant',
  placeholder: 'Ask me about tours and travel...'
});

// Mount to your page
chatbot.mount(document.body);
```

### React

```jsx
import React from 'react';
import { ReactChatBot } from 'contentstack-chatbot-sdk';

function App() {
  return (
    <div>
      <h1>My Website</h1>
      
      <ReactChatBot 
        contentstack={{
          apiKey: 'your-api-key',
          deliveryToken: 'your-delivery-token',
          environment: 'development'
        }}
        title="Travel Assistant"
        placeholder="Ask me about tours and travel..."
        position="bottom-right"
        theme="light"
      />
    </div>
  );
}
```

### Vue.js

```vue
<template>
  <div>
    <h1>My Vue App</h1>
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
        apiKey: 'your-api-key',
        deliveryToken: 'your-delivery-token',
        environment: 'development'
      },
      title: 'Travel Assistant',
      placeholder: 'Ask me about tours and travel...'
    });
    
    this.$refs.chatbotContainer.appendChild(chatbot.element);
  }
}
</script>
```

### Angular

```typescript
import { Component, OnInit } from '@angular/core';
import { ContentstackChatBot } from 'contentstack-chatbot-sdk';

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
    const chatbot = ContentstackChatBot.create({
      contentstack: {
        apiKey: 'your-api-key',
        deliveryToken: 'your-delivery-token',
        environment: 'development'
      },
      title: 'Travel Assistant',
      placeholder: 'Ask me about tours and travel...'
    });
    
    this.chatbotContainer.nativeElement.appendChild(chatbot.element);
  }
}
```

## Configuration

### ChatBotConfig

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `contentstack` | `ContentstackConfig` | - | **Required** - Contentstack configuration |
| `title` | `string` | `'Travel Assistant'` | Chatbot title |
| `placeholder` | `string` | `'Ask me about tours and travel...'` | Input placeholder |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Chatbot position |
| `theme` | `'light' \| 'dark'` | `'light'` | Chatbot theme |
| `width` | `number` | `350` | Chatbot width in pixels |
| `height` | `number` | `500` | Chatbot height in pixels |
| `autoOpen` | `boolean` | `false` | Auto-open chatbot on load |
| `showWelcomeMessage` | `boolean` | `true` | Show welcome message |
| `welcomeMessage` | `string` | `'👋 Hi! I'm your travel assistant...'` | Custom welcome message |

### ContentstackConfig

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | `string` | - | **Required** - Your Contentstack API key |
| `deliveryToken` | `string` | - | **Required** - Your Contentstack delivery token |
| `environment` | `string` | - | **Required** - Your Contentstack environment |
| `region` | `'us' \| 'eu' \| 'azure'` | `'eu'` | Contentstack region |
| `baseUrl` | `string` | - | Custom base URL (overrides region) |

## Events

```javascript
const chatbot = ContentstackChatBot.create(config, {
  onMessage: (message) => {
    console.log('New message:', message);
  },
  onStateChange: (state) => {
    console.log('State changed:', state);
  },
  onError: (error) => {
    console.error('Chatbot error:', error);
  },
  onOpen: () => {
    console.log('Chatbot opened');
  },
  onClose: () => {
    console.log('Chatbot closed');
  }
});
```

## API Methods

### ChatBotInstance

```javascript
const chatbot = ContentstackChatBot.create(config);

// Mount to DOM
chatbot.mount(document.body);

// Control chatbot
chatbot.open();
chatbot.close();
chatbot.sendMessage('Hello!');

// Get current state
const state = chatbot.getState();

// Update configuration
chatbot.updateConfig({
  title: 'New Title',
  theme: 'dark'
});

// Cleanup
chatbot.destroy();
```

## Contentstack Setup

### Required Content Types

#### Tour Content Type
```json
{
  "title": "Tour Title",
  "description": "Tour description",
  "country": "Country name",
  "price": 1000,
  "duration": "7 days"
}
```

#### FAQ Content Type
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

## Advanced Usage

### Custom Response Generator

```javascript
import { ResponseGenerator } from 'contentstack-chatbot-sdk';

class CustomResponseGenerator extends ResponseGenerator {
  generateResponse(message, content) {
    // Your custom logic here
    return super.generateResponse(message, content);
  }
}
```

### Custom Contentstack Service

```javascript
import { ContentstackService } from 'contentstack-chatbot-sdk';

class CustomContentstackService extends ContentstackService {
  async searchContent(message) {
    // Your custom search logic here
    return super.searchContent(message);
  }
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT

## Support

For issues or questions, please check the documentation or create an issue in the repository.
