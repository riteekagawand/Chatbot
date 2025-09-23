'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ContentstackEntry {
  uid: string;
  title?: string;
  question?: string;
  answers?: string;
  answer?: string;
  description?: string;
  country?: string;
  price?: number;
  duration?: string;
  [key: string]: any;
}

interface ChatBotProps {
  contentstackApiKey: string;
  contentstackToken: string;
  contentstackEnvironment: string;
  title?: string;
  placeholder?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark';
  width?: number;
  height?: number;
  region?: 'us' | 'eu' | 'azure';
  contentTypes?: string[];
  maxResults?: number;
}

class ContentstackService {
  private baseUrl: string;
  private apiKey: string;
  private deliveryToken: string;
  private environment: string;
  private region: string;

  constructor(
    apiKey: string,
    deliveryToken: string,
    environment: string,
    region: string = 'eu'
  ) {
    this.apiKey = apiKey;
    this.deliveryToken = deliveryToken;
    this.environment = environment;
    this.region = region;
    this.baseUrl = `https://${region}-cdn.contentstack.com/v3`;
  }

  async fetchEntries(contentType: string, query?: string): Promise<ContentstackEntry[]> {
    try {
      let url = `${this.baseUrl}/content_types/${contentType}/entries`;
      const params: any = {
        environment: this.environment,
        limit: 10
      };

      if (query) {
        const searchQuery = JSON.stringify({
          "$or": [
            {"title": {"$regex": query, "$options": "i"}},
            {"question": {"$regex": query, "$options": "i"}},
            {"description": {"$regex": query, "$options": "i"}},
            {"answers": {"$regex": query, "$options": "i"}},
            {"answer": {"$regex": query, "$options": "i"}}
          ]
        });
        params.query = searchQuery;
      }

      const response = await axios.get(url, {
        params,
        headers: {
          'api_key': this.apiKey,
          'access_token': this.deliveryToken,
          'Content-Type': 'application/json'
        }
      });

      return response.data.entries || [];
    } catch (error) {
      console.error(`Error fetching ${contentType} entries:`, error);
      return [];
    }
  }

  async searchAcross(contentTypes: string[], query?: string): Promise<Array<ContentstackEntry & { contentType: string }>> {
    const tasks = contentTypes.map(async (ct) => {
      const entries = await this.fetchEntries(ct, query);
      return entries.map(e => ({ ...e, contentType: ct }));
    });
    const results = await Promise.all(tasks);
    return results.flat();
  }
}

const ChatBot: React.FC<ChatBotProps> = ({
  contentstackApiKey,
  contentstackToken,
  contentstackEnvironment,
  title = 'Travel Assistant',
  placeholder = 'Ask me about tours and travel...',
  position = 'bottom-right',
  theme = 'light',
  width = 350,
  height = 500,
  contentTypes,
  maxResults
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentstackService = useRef<ContentstackService>();

  useEffect(() => {
    contentstackService.current = new ContentstackService(
      contentstackApiKey,
      contentstackToken,
      contentstackEnvironment
    );
  }, [contentstackApiKey, contentstackToken, contentstackEnvironment]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text: string, isUser: boolean) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const generateResponse = async (message: string): Promise<string> => {
    if (!contentstackService.current) {
      return "I'm having trouble connecting to the content service. Please try again later.";
    }

    try {
      const entries = await contentstackService.current.searchAcross(contentTypes || ['tour','faqs'], message);

      if (entries.length > 0) {
        const top = entries.slice(0, maxResults ?? 3);
        const lines = top.map((e: any) => {
          const title = e.title || e.question || e.name || 'Untitled';
          const snippet = (e.description || e.content || e.answer || '').toString();
          const short = snippet.length > 220 ? snippet.slice(0, 220) + '…' : snippet;
          return `• ${title}${short ? `\n  ${short}` : ''}${e.contentType ? `\n  Type: ${e.contentType}` : ''}`;
        }).join('\n\n');
        return `Here is what I found:\n\n${lines}\n\nAsk for a specific item to get more details.`;
      }

      return "I couldn't find relevant content yet. Try rephrasing or ensure your Contentstack content types and environment have published entries.";
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm having trouble connecting right now. Please try again later.";
    }
  };

  const sendMessage = async () => {
    const input = inputRef.current;
    if (!input || !input.value.trim() || isLoading) return;

    const message = input.value.trim();
    input.value = '';

    addMessage(message, true);
    setIsLoading(true);

    try {
      const response = await generateResponse(message);
      addMessage(response, false);
    } catch (error) {
      addMessage("I'm having trouble connecting right now. Please try again later.", false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const getPositionStyles = () => {
    const positions = {
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      'top-right': { top: '20px', right: '20px' },
      'top-left': { top: '20px', left: '20px' }
    };
    return positions[position];
  };

  const themeStyles = {
    light: {
      backgroundColor: '#ffffff',
      textColor: '#333333',
      borderColor: '#e0e0e0',
      buttonColor: '#007bff',
      inputColor: '#f8f9fa'
    },
    dark: {
      backgroundColor: '#2d3748',
      textColor: '#ffffff',
      borderColor: '#4a5568',
      buttonColor: '#3182ce',
      inputColor: '#4a5568'
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <div style={{ position: 'fixed', zIndex: 1000, ...getPositionStyles() }}>
      {isOpen && (
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: currentTheme.backgroundColor,
            border: `1px solid ${currentTheme.borderColor}`,
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px',
              borderBottom: `1px solid ${currentTheme.borderColor}`,
              backgroundColor: currentTheme.buttonColor,
              color: 'white',
              borderRadius: '12px 12px 0 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
              {title}
            </h3>
            <button
              onClick={toggleChat}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', color: currentTheme.textColor, opacity: 0.7 }}>
                👋 Hi! I'm your assistant. Ask about your content and I'll fetch it from Contentstack.
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '80%'
                }}
              >
                <div
                  style={{
                    backgroundColor: message.isUser ? currentTheme.buttonColor : currentTheme.inputColor,
                    color: message.isUser ? 'white' : currentTheme.textColor,
                    padding: '12px 16px',
                    borderRadius: message.isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div style={{ alignSelf: 'flex-start' }}>
                <div
                  style={{
                    backgroundColor: currentTheme.inputColor,
                    color: currentTheme.textColor,
                    padding: '12px 16px',
                    borderRadius: '18px 18px 18px 4px',
                    fontSize: '14px'
                  }}
                >
                  <span>💭 Thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '16px',
              borderTop: `1px solid ${currentTheme.borderColor}`,
              display: 'flex',
              gap: '8px'
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: `1px solid ${currentTheme.borderColor}`,
                borderRadius: '24px',
                fontSize: '14px',
                backgroundColor: currentTheme.inputColor,
                color: currentTheme.textColor,
                outline: 'none'
              }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              style={{
                padding: '12px 16px',
                backgroundColor: currentTheme.buttonColor,
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                opacity: isLoading ? 0.6 : 1
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: currentTheme.buttonColor,
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          💬
        </button>
      )}
    </div>
  );
};

export default ChatBot;
