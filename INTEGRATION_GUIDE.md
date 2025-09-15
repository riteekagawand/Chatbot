# 🤖 Chatbot Integration Guide

This guide will help you integrate the chatbot into your existing website that's connected to Contentstack CMS.

## 📋 Prerequisites

- Your website is already connected to Contentstack CMS
- You have the Contentstack API credentials (API Key, Delivery Token, Environment)
- Your website supports React components (or can be modified to support them)

## 🚀 Integration Options

### Option 1: Direct SDK Integration (Recommended)

If your website is built with React/Next.js or can support React components:

#### Step 1: Install the Chatbot SDK

```bash
# If using npm
npm install chat-bot

# If using yarn
yarn add chat-bot

# If using pnpm
pnpm add chat-bot
```

#### Step 2: Basic Integration

```tsx
import { ChatBot } from 'chat-bot';

function App() {
  return (
    <div>
      {/* Your existing website content */}
      <ChatBot 
        llmProvider="openai"  // or "groq", "anthropic", "perplexity"
        llmApiKey="your-openai-api-key"
        contentstackApiKey="blt354ba6a0b8b7e140"  // Your Contentstack API Key
        contentstackToken="cs7f1c6103726d54fe1978f31f"  // Your Delivery Token
        contentstackEnvironment="development"  // Your environment
        title="Travel Assistant"
        placeholder="Ask me about tours and travel..."
        theme="light"  // or "dark", "auto"
        position="bottom-right"
      />
    </div>
  );
}
```

#### Step 3: Advanced Integration with Custom Configuration

```tsx
import { EnhancedChatBot } from 'chat-bot';

function App() {
  return (
    <div>
      {/* Your existing website content */}
      <EnhancedChatBot 
        llmProvider="openai"
        llmApiKey="your-openai-api-key"
        llmModel="gpt-3.5-turbo"
        llmTemperature={0.7}
        contentstackApiKey="blt354ba6a0b8b7e140"
        contentstackToken="cs7f1c6103726d54fe1978f31f"
        contentstackEnvironment="development"
        contentTypes={['tour', 'faqs']}  // Specify which content types to search
        title="Travel Assistant"
        placeholder="Ask me about our tours, FAQs, or any travel questions..."
        theme="auto"
        position="bottom-right"
        customWelcomeMessage="Hi! I'm your travel assistant. I can help you with information about our tours, answer FAQs, and assist with travel planning. How can I help you today?"
        enableMarkdown={true}
        showTimestamp={true}
        enableCopy={true}
        maxHeight="500px"
        onMessage={(message) => console.log('New message:', message)}
        onError={(error) => console.error('Chatbot error:', error)}
      />
    </div>
  );
}
```

### Option 2: Iframe Integration (For Non-React Websites)

If your website doesn't support React components, you can embed the chatbot using an iframe:

#### Step 1: Deploy the Chatbot as a Standalone App

Create a simple HTML page that loads the chatbot:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Travel Chatbot</title>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/chat-bot/dist/index.js"></script>
</head>
<body>
    <div id="chatbot-root"></div>
    <script>
        const { ChatBot } = window.ChatBot;
        
        ReactDOM.render(
            React.createElement(ChatBot, {
                llmProvider: "openai",
                llmApiKey: "your-openai-api-key",
                contentstackApiKey: "blt354ba6a0b8b7e140",
                contentstackToken: "cs7f1c6103726d54fe1978f31f",
                contentstackEnvironment: "development",
                title: "Travel Assistant",
                placeholder: "Ask me about tours and travel...",
                theme: "light",
                position: "bottom-right"
            }),
            document.getElementById('chatbot-root')
        );
    </script>
</body>
</html>
```

#### Step 2: Embed in Your Website

Add this iframe to your website:

```html
<iframe 
    src="https://your-domain.com/chatbot.html" 
    width="400" 
    height="600" 
    frameborder="0"
    style="position: fixed; bottom: 20px; right: 20px; z-index: 1000; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
</iframe>
```

### Option 3: API Integration (Custom Implementation)

If you want to build a custom chatbot interface, you can use the API endpoints:

#### Step 1: Use the Chat API

```javascript
// Example API call to your chatbot
async function sendMessage(message) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: message,
            llmProvider: 'openai',
            llmApiKey: 'your-openai-api-key',
            contentstackApiKey: 'blt354ba6a0b8b7e140',
            contentstackToken: 'cs7f1c6103726d54fe1978f31f',
            contentstackEnvironment: 'development'
        })
    });
    
    return await response.json();
}

// Usage
sendMessage("Tell me about tours in Switzerland")
    .then(response => console.log(response.content))
    .catch(error => console.error(error));
```

## 🔧 Configuration Options

### LLM Providers

The chatbot supports multiple LLM providers:

- **OpenAI**: `llmProvider="openai"` (requires OpenAI API key)
- **Groq**: `llmProvider="groq"` (requires Groq API key)
- **Anthropic**: `llmProvider="anthropic"` (requires Anthropic API key)
- **Perplexity**: `llmProvider="perplexity"` (requires Perplexity API key)

### Contentstack Configuration

```tsx
<ChatBot 
    // Your Contentstack credentials
    contentstackApiKey="blt354ba6a0b8b7e140"
    contentstackToken="cs7f1c6103726d54fe1978f31f"
    contentstackEnvironment="development"  // or "production"
    
    // Specify which content types to search
    contentTypes={['tour', 'faqs']}  // Based on your Contentstack setup
    
    // Optional: Custom search behavior
    maxMessages={50}
    enableStreaming={true}
/>
```

### UI Customization

```tsx
<ChatBot 
    // Visual customization
    theme="light"  // "light", "dark", or "auto"
    position="bottom-right"  // "bottom-right", "bottom-left", "top-right", "top-left"
    title="Travel Assistant"
    placeholder="Ask me about tours and travel..."
    
    // Advanced UI options (EnhancedChatBot only)
    customWelcomeMessage="Welcome! How can I help you today?"
    enableMarkdown={true}
    showTimestamp={true}
    enableCopy={true}
    maxHeight="500px"
    showTypingIndicator={true}
/>
```

## 🎨 Styling Integration

### CSS Customization

The chatbot comes with built-in styles, but you can customize them:

```css
/* Custom chatbot styles */
.chatbot-container {
    --chatbot-primary-color: #your-brand-color;
    --chatbot-background: #ffffff;
    --chatbot-text-color: #333333;
    --chatbot-border-radius: 12px;
    --chatbot-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .chatbot-container {
        width: 100% !important;
        height: 100vh !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        border-radius: 0 !important;
    }
}
```

## 🔐 Security Considerations

### Environment Variables

Store sensitive credentials in environment variables:

```bash
# .env.local
OPENAI_API_KEY=your-openai-api-key
CONTENTSTACK_API_KEY=blt354ba6a0b8b7e140
CONTENTSTACK_DELIVERY_TOKEN=cs7f1c6103726d54fe1978f31f
CONTENTSTACK_ENVIRONMENT=development
```

### API Key Management

```tsx
<ChatBot 
    llmApiKey={process.env.OPENAI_API_KEY}
    contentstackApiKey={process.env.CONTENTSTACK_API_KEY}
    contentstackToken={process.env.CONTENTSTACK_DELIVERY_TOKEN}
    contentstackEnvironment={process.env.CONTENTSTACK_ENVIRONMENT}
/>
```

## 📱 Mobile Optimization

The chatbot is fully responsive and mobile-optimized:

- Automatically adjusts to mobile screen sizes
- Touch-friendly interface
- Optimized for both portrait and landscape orientations
- Supports mobile-specific features like copy-to-clipboard

## 🚀 Deployment

### For React/Next.js Websites

1. Install the SDK: `npm install chat-bot`
2. Import and use the component
3. Deploy as part of your existing website

### For Static Websites

1. Deploy the chatbot as a separate service
2. Embed using iframe or JavaScript
3. Configure CORS if needed

### For WordPress/Other CMS

1. Use the iframe integration method
2. Add the iframe code to your theme
3. Customize styling to match your site

## 🧪 Testing

### Test the Integration

```tsx
// Test component
function TestChatbot() {
    return (
        <ChatBot 
            llmProvider="openai"
            llmApiKey="test-key"
            contentstackApiKey="blt354ba6a0b8b7e140"
            contentstackToken="cs7f1c6103726d54fe1978f31f"
            contentstackEnvironment="development"
            title="Test Chatbot"
            placeholder="Test the chatbot..."
        />
    );
}
```

### Test Questions

Try these test questions to verify the integration:

- "What tours do you have available?"
- "Tell me about the Swiss Alps Adventure tour"
- "What is your cancellation policy?"
- "How can I book a tour?"

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your API endpoints allow cross-origin requests
2. **API Key Issues**: Verify your API keys are correct and have proper permissions
3. **Contentstack Connection**: Check that your Contentstack credentials are valid
4. **Styling Conflicts**: Use CSS specificity to override conflicting styles

### Debug Mode

Enable debug mode to see detailed logs:

```tsx
<ChatBot 
    // ... other props
    onError={(error) => console.error('Chatbot Error:', error)}
    onMessage={(message) => console.log('Chatbot Message:', message)}
/>
```

## 📞 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify your API credentials
3. Test the Contentstack connection using the explorer: `/contentstack-explorer`
4. Check the network tab for failed API calls

## 🎯 Next Steps

1. Choose the integration method that best fits your website
2. Install and configure the chatbot
3. Test with your Contentstack data
4. Customize the appearance to match your brand
5. Deploy and monitor performance

Your chatbot is now ready to help your website visitors with information from your Contentstack CMS!
