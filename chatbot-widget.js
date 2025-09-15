// Travel Chatbot Widget
// Add this script to your website

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        apiUrl: 'http://localhost:3000/api/chat', // Your chatbot API endpoint
        llmProvider: 'openai',
        llmApiKey: 'your-openai-api-key', // Replace with your actual API key
        contentstackApiKey: 'blt354ba6a0b8b7e140',
        contentstackToken: 'cs7f1c6103726d54fe1978f31f',
        contentstackEnvironment: 'development',
        position: 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
        theme: 'light' // 'light', 'dark'
    };
    
    // Create chatbot widget
    function createChatbotWidget() {
        // Create main container
        const widget = document.createElement('div');
        widget.id = 'travel-chatbot-widget';
        widget.innerHTML = `
            <div class="chatbot-toggle" id="chatbotToggle">
                <span>💬</span>
            </div>
            <div class="chatbot-container" id="chatbotContainer">
                <div class="chatbot-header">
                    <div class="chatbot-title">🌍 Travel Assistant</div>
                    <button class="chatbot-close" id="chatbotClose">×</button>
                </div>
                <div class="chatbot-messages" id="chatbotMessages">
                    <div class="message assistant">
                        Hi! I'm your AI travel assistant. I can help you with information about our tours, answer FAQs, and assist with travel planning. How can I help you today?
                    </div>
                </div>
                <div class="typing-indicator" id="typingIndicator">
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
                <div class="chatbot-input-container">
                    <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Ask me about tours, FAQs, or travel...">
                    <button class="chatbot-send" id="chatbotSend">→</button>
                </div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #travel-chatbot-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            .chatbot-toggle {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .chatbot-toggle:hover {
                transform: scale(1.1);
            }
            
            .chatbot-container {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 350px;
                height: 500px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                display: none;
                flex-direction: column;
                overflow: hidden;
            }
            
            .chatbot-container.open {
                display: flex;
            }
            
            .chatbot-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .chatbot-title {
                font-weight: 600;
                font-size: 16px;
            }
            
            .chatbot-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                width: 25px;
                height: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s;
            }
            
            .chatbot-close:hover {
                background: rgba(255,255,255,0.2);
            }
            
            .chatbot-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .message {
                max-width: 80%;
                padding: 12px 16px;
                border-radius: 18px;
                word-wrap: break-word;
                line-height: 1.4;
                font-size: 14px;
            }
            
            .message.user {
                background: #667eea;
                color: white;
                align-self: flex-end;
                border-bottom-right-radius: 4px;
            }
            
            .message.assistant {
                background: #f1f3f4;
                color: #333;
                align-self: flex-start;
                border-bottom-left-radius: 4px;
            }
            
            .typing-indicator {
                display: none;
                align-self: flex-start;
                background: #f1f3f4;
                padding: 12px 16px;
                border-radius: 18px;
                border-bottom-left-radius: 4px;
            }
            
            .typing-dots {
                display: flex;
                gap: 4px;
            }
            
            .typing-dot {
                width: 8px;
                height: 8px;
                background: #999;
                border-radius: 50%;
                animation: typing 1.4s infinite ease-in-out;
            }
            
            .typing-dot:nth-child(1) { animation-delay: -0.32s; }
            .typing-dot:nth-child(2) { animation-delay: -0.16s; }
            
            @keyframes typing {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
            }
            
            .chatbot-input-container {
                padding: 15px;
                border-top: 1px solid #e0e0e0;
                display: flex;
                gap: 10px;
                background: white;
            }
            
            .chatbot-input {
                flex: 1;
                padding: 12px 16px;
                border: 1px solid #ddd;
                border-radius: 25px;
                outline: none;
                font-size: 14px;
                transition: border-color 0.2s;
            }
            
            .chatbot-input:focus {
                border-color: #667eea;
            }
            
            .chatbot-send {
                background: #667eea;
                color: white;
                border: none;
                border-radius: 50%;
                width: 44px;
                height: 44px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.2s;
            }
            
            .chatbot-send:hover {
                background: #5a6fd8;
            }
            
            .chatbot-send:disabled {
                background: #ccc;
                cursor: not-allowed;
            }
            
            @media (max-width: 768px) {
                #travel-chatbot-widget {
                    bottom: 10px;
                    right: 10px;
                }
                
                .chatbot-container {
                    width: calc(100vw - 20px);
                    height: calc(100vh - 100px);
                    bottom: 80px;
                    right: -10px;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(widget);
        
        return widget;
    }
    
    // Chatbot functionality
    function initChatbot() {
        const widget = createChatbotWidget();
        const toggle = document.getElementById('chatbotToggle');
        const container = document.getElementById('chatbotContainer');
        const close = document.getElementById('chatbotClose');
        const input = document.getElementById('chatbotInput');
        const send = document.getElementById('chatbotSend');
        const messages = document.getElementById('chatbotMessages');
        const typing = document.getElementById('typingIndicator');
        
        let isOpen = false;
        
        // Toggle chatbot
        function toggleChatbot() {
            isOpen = !isOpen;
            if (isOpen) {
                container.classList.add('open');
                input.focus();
            } else {
                container.classList.remove('open');
            }
        }
        
        // Send message
        async function sendMessage() {
            const message = input.value.trim();
            if (!message) return;
            
            // Disable input
            input.disabled = true;
            send.disabled = true;
            
            // Add user message
            addMessage(message, 'user');
            input.value = '';
            
            // Show typing
            showTyping();
            
            try {
                const response = await fetch(CONFIG.apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: message,
                        llmProvider: CONFIG.llmProvider,
                        llmApiKey: CONFIG.llmApiKey,
                        contentstackApiKey: CONFIG.contentstackApiKey,
                        contentstackToken: CONFIG.contentstackToken,
                        contentstackEnvironment: CONFIG.contentstackEnvironment
                    })
                });
                
                const data = await response.json();
                hideTyping();
                
                if (data.content) {
                    addMessage(data.content, 'assistant');
                } else {
                    addMessage('Sorry, I encountered an error. Please try again.', 'assistant');
                }
                
            } catch (error) {
                console.error('Chatbot error:', error);
                hideTyping();
                addMessage('Sorry, I\'m having trouble connecting right now. Please try again later.', 'assistant');
            } finally {
                input.disabled = false;
                send.disabled = false;
                input.focus();
            }
        }
        
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            messageDiv.textContent = text;
            messages.appendChild(messageDiv);
            messages.scrollTop = messages.scrollHeight;
        }
        
        function showTyping() {
            typing.style.display = 'flex';
        }
        
        function hideTyping() {
            typing.style.display = 'none';
        }
        
        // Event listeners
        toggle.addEventListener('click', toggleChatbot);
        close.addEventListener('click', toggleChatbot);
        send.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }
    
})();
