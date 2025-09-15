import React, { useState, useRef, useEffect } from 'react';
import { ChatBotProps, Message, ChatBotState } from '../types';
import { ContentstackService } from '../services/contentstackService';

const ChatBot: React.FC<ChatBotProps> = ({
  llmProvider = 'openai',
  llmApiKey,
  contentstackApiKey,
  contentstackToken,
  contentstackEnvironment,
  title = 'Travel Assistant',
  placeholder = 'Ask me about tours and travel...',
  position = 'bottom-right',
  theme = 'light',
  width = 350,
  height = 500
}) => {
  const [state, setState] = useState<ChatBotState>({
    messages: [],
    isOpen: false,
    isLoading: false,
    isConnected: true
  });

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
  }, [state.messages]);

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
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  };

  const generateResponse = async (message: string): Promise<string> => {
    if (!contentstackService.current) {
      return "I'm having trouble connecting to the content service. Please try again later.";
    }

    try {
      const { tours, faqs } = await contentstackService.current.searchContent(message);
      const lowerMessage = message.toLowerCase();

      // Handle specific queries
      if (lowerMessage.includes('how many tours') || lowerMessage.includes('tour count')) {
        return `We currently have ${tours.length} amazing tours available! Would you like to know more about any specific destination?`;
      }

      if (lowerMessage.includes('accommodation') || lowerMessage.includes('hotel') || lowerMessage.includes('provide')) {
        const accommodationFaq = faqs.find(faq => 
          faq.question?.toLowerCase().includes('accommodation') ||
          faq.title?.toLowerCase().includes('accommodation')
        );
        if (accommodationFaq) {
          return `**${accommodationFaq.question || accommodationFaq.title}**\n\n${accommodationFaq.answers || accommodationFaq.answer}\n\nDo you have any specific accommodation preferences?`;
        }
      }

      if (lowerMessage.includes('booking') || lowerMessage.includes('book')) {
        const bookingFaq = faqs.find(faq => 
          faq.question?.toLowerCase().includes('book')
        );
        if (bookingFaq) {
          return `**${bookingFaq.question}**\n\n${bookingFaq.answers || bookingFaq.answer}\n\nWould you like help with booking a specific tour?`;
        }
      }

      if (lowerMessage.includes('cancel')) {
        const cancelFaq = faqs.find(faq => 
          faq.question?.toLowerCase().includes('cancel')
        );
        if (cancelFaq) {
          return `**${cancelFaq.question}**\n\n${cancelFaq.answers || cancelFaq.answer}\n\nDo you need help with a specific cancellation?`;
        }
      }

      if (lowerMessage.includes('payment')) {
        const paymentFaq = faqs.find(faq => 
          faq.question?.toLowerCase().includes('payment')
        );
        if (paymentFaq) {
          return `**${paymentFaq.question}**\n\n${paymentFaq.answers || paymentFaq.answer}\n\nDo you have any other payment questions?`;
        }
      }

      if (lowerMessage.includes('insurance')) {
        const insuranceFaq = faqs.find(faq => 
          faq.question?.toLowerCase().includes('insurance')
        );
        if (insuranceFaq) {
          return `**${insuranceFaq.question}**\n\n${insuranceFaq.answers || insuranceFaq.answer}\n\nWould you like help finding travel insurance?`;
        }
      }

      if (lowerMessage.includes('flight')) {
        const flightFaq = faqs.find(faq => 
          faq.question?.toLowerCase().includes('flight')
        );
        if (flightFaq) {
          return `**${flightFaq.question}**\n\n${flightFaq.answers || flightFaq.answer}\n\nWould you like help with flight bookings?`;
        }
      }

      if (lowerMessage.includes('refund')) {
        const refundFaq = faqs.find(faq => 
          faq.question?.toLowerCase().includes('refund')
        );
        if (refundFaq) {
          return `**${refundFaq.question}**\n\n${refundFaq.answers || refundFaq.answer}\n\nDo you need help with a specific refund?`;
        }
      }

      // General tour information
      if (tours.length > 0) {
        const tourList = tours.slice(0, 3).map(tour => 
          `• **${tour.title}** - ${tour.country} (${tour.duration}, $${tour.price})`
        ).join('\n');
        
        return `Here are some of our amazing tours:\n\n${tourList}\n\nWould you like more details about any specific tour?`;
      }

      // General FAQ response
      if (faqs.length > 0) {
        const faq = faqs[0];
        return `**${faq.question || faq.title}**\n\n${faq.answers || faq.answer}\n\nIs there anything else I can help you with?`;
      }

      return "I understand you're asking about travel and tours. I can help you with information about our tours, booking, accommodation, and more. Could you be more specific? For example:\n\n• \"How many tours do you have?\"\n• \"Tell me about your tours\"\n• \"How do I book a tour?\"\n• \"What's your cancellation policy?\"\n\nWhat would you like to know?";

    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm having trouble connecting right now. Please try again later.";
    }
  };

  const sendMessage = async () => {
    const input = inputRef.current;
    if (!input || !input.value.trim() || state.isLoading) return;

    const message = input.value.trim();
    input.value = '';

    addMessage(message, true);
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await generateResponse(message);
      addMessage(response, false);
    } catch (error) {
      addMessage("I'm having trouble connecting right now. Please try again later.", false);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const toggleChat = () => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
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
      {state.isOpen && (
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
            {state.messages.length === 0 && (
              <div style={{ textAlign: 'center', color: currentTheme.textColor, opacity: 0.7 }}>
                👋 Hi! I'm your travel assistant. How can I help you today?
              </div>
            )}
            
            {state.messages.map((message) => (
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
            
            {state.isLoading && (
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
              disabled={state.isLoading}
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
              disabled={state.isLoading}
              style={{
                padding: '12px 16px',
                backgroundColor: currentTheme.buttonColor,
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                cursor: state.isLoading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                opacity: state.isLoading ? 0.6 : 1
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Chat Button */}
      {!state.isOpen && (
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
