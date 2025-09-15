import { 
  ChatBotConfig, 
  ChatBotState, 
  ChatBotEvents, 
  Message, 
  ChatBotInstance 
} from '../types';
import { ContentstackService } from '../services/ContentstackService';
import { ResponseGenerator } from '../services/ResponseGenerator';

export class ChatBotCore implements ChatBotInstance {
  private config: ChatBotConfig;
  private state: ChatBotState;
  private events: ChatBotEvents;
  private contentstackService: ContentstackService;
  private responseGenerator: ResponseGenerator;
  private container: HTMLElement | null = null;
  private chatElement: HTMLElement | null = null;

  constructor(config: ChatBotConfig, events: ChatBotEvents = {}) {
    this.config = config;
    this.events = events;
    this.state = {
      messages: [],
      isOpen: config.autoOpen || false,
      isLoading: false,
      isConnected: true
    };

    this.contentstackService = new ContentstackService(config.contentstack);
    this.responseGenerator = new ResponseGenerator();

    this.initializeState();
  }

  private initializeState(): void {
    if (this.config.showWelcomeMessage !== false) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: this.config.welcomeMessage || "👋 Hi! I'm your travel assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date()
      };
      this.state.messages = [welcomeMessage];
    }
  }

  mount(container: HTMLElement): void {
    this.container = container;
    this.createChatElement();
    this.render();
    this.attachEventListeners();
  }

  unmount(): void {
    if (this.chatElement && this.container) {
      this.container.removeChild(this.chatElement);
      this.chatElement = null;
    }
  }

  open(): void {
    this.setState({ isOpen: true });
    this.events.onOpen?.();
  }

  close(): void {
    this.setState({ isOpen: false });
    this.events.onClose?.();
  }

  async sendMessage(message: string): Promise<void> {
    if (!message.trim() || this.state.isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      isUser: true,
      timestamp: new Date()
    };

    this.addMessage(userMessage);
    this.setState({ isLoading: true });

    try {
      const content = await this.contentstackService.searchContent(message);
      const response = this.responseGenerator.generateResponse(message, content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      this.addMessage(botMessage);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      this.addMessage(errorMessage);
      this.events.onError?.(error as Error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  getState(): ChatBotState {
    return { ...this.state };
  }

  updateConfig(newConfig: Partial<ChatBotConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.contentstackService.updateConfig(newConfig.contentstack || {});
    this.render();
  }

  destroy(): void {
    this.unmount();
    this.container = null;
  }

  private setState(newState: Partial<ChatBotState>): void {
    this.state = { ...this.state, ...newState };
    this.events.onStateChange?.(this.state);
    this.render();
  }

  private addMessage(message: Message): void {
    this.state.messages.push(message);
    this.events.onMessage?.(message);
    this.render();
  }

  private createChatElement(): void {
    if (!this.container) return;

    this.chatElement = document.createElement('div');
    this.chatElement.className = 'contentstack-chatbot';
    this.chatElement.style.cssText = `
      position: fixed;
      z-index: 1000;
      ${this.getPositionStyles()}
    `;

    this.container.appendChild(this.chatElement);
  }

  private getPositionStyles(): string {
    const positions = {
      'bottom-right': 'bottom: 20px; right: 20px;',
      'bottom-left': 'bottom: 20px; left: 20px;',
      'top-right': 'top: 20px; right: 20px;',
      'top-left': 'top: 20px; left: 20px;'
    };
    return positions[this.config.position || 'bottom-right'];
  }

  private render(): void {
    if (!this.chatElement) return;

    const theme = this.getThemeStyles();
    
    this.chatElement.innerHTML = `
      ${this.state.isOpen ? this.renderChatWindow(theme) : ''}
      ${!this.state.isOpen ? this.renderChatButton(theme) : ''}
    `;

    this.attachEventListeners();
  }

  private renderChatWindow(theme: any): string {
    return `
      <div class="chat-window" style="
        width: ${this.config.width || 350}px;
        height: ${this.config.height || 500}px;
        background-color: ${theme.backgroundColor};
        border: 1px solid ${theme.borderColor};
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        display: flex;
        flex-direction: column;
        font-family: system-ui, -apple-system, sans-serif;
      ">
        ${this.renderHeader(theme)}
        ${this.renderMessages(theme)}
        ${this.renderInput(theme)}
      </div>
    `;
  }

  private renderHeader(theme: any): string {
    return `
      <div class="chat-header" style="
        padding: 16px;
        border-bottom: 1px solid ${theme.borderColor};
        background-color: ${theme.buttonColor};
        color: white;
        border-radius: 12px 12px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      ">
        <h3 style="margin: 0; font-size: 16px; font-weight: 600;">
          ${this.config.title || 'Travel Assistant'}
        </h3>
        <button class="close-btn" style="
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          padding: 4px;
        ">×</button>
      </div>
    `;
  }

  private renderMessages(theme: any): string {
    const messagesHtml = this.state.messages.map(message => `
      <div class="message ${message.isUser ? 'user' : 'bot'}" style="
        align-self: ${message.isUser ? 'flex-end' : 'flex-start'};
        max-width: 80%;
        margin-bottom: 12px;
      ">
        <div style="
          background-color: ${message.isUser ? theme.buttonColor : theme.inputColor};
          color: ${message.isUser ? 'white' : theme.textColor};
          padding: 12px 16px;
          border-radius: ${message.isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px'};
          font-size: 14px;
          line-height: 1.4;
          white-space: pre-wrap;
        ">${message.text}</div>
      </div>
    `).join('');

    const loadingHtml = this.state.isLoading ? `
      <div class="loading" style="
        align-self: flex-start;
        max-width: 80%;
        margin-bottom: 12px;
      ">
        <div style="
          background-color: ${theme.inputColor};
          color: ${theme.textColor};
          padding: 12px 16px;
          border-radius: 18px 18px 18px 4px;
          font-size: 14px;
        ">💭 Thinking...</div>
      </div>
    ` : '';

    return `
      <div class="chat-messages" style="
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      ">
        ${messagesHtml}
        ${loadingHtml}
        <div class="messages-end"></div>
      </div>
    `;
  }

  private renderInput(theme: any): string {
    return `
      <div class="chat-input" style="
        padding: 16px;
        border-top: 1px solid ${theme.borderColor};
        display: flex;
        gap: 8px;
      ">
        <input type="text" class="message-input" placeholder="${this.config.placeholder || 'Ask me about tours and travel...'}" style="
          flex: 1;
          padding: 12px 16px;
          border: 1px solid ${theme.borderColor};
          border-radius: 24px;
          font-size: 14px;
          background-color: ${theme.inputColor};
          color: ${theme.textColor};
          outline: none;
        " ${this.state.isLoading ? 'disabled' : ''}>
        <button class="send-btn" style="
          padding: 12px 16px;
          background-color: ${theme.buttonColor};
          color: white;
          border: none;
          border-radius: 24px;
          cursor: ${this.state.isLoading ? 'not-allowed' : 'pointer'};
          font-size: 14px;
          opacity: ${this.state.isLoading ? 0.6 : 1};
        " ${this.state.isLoading ? 'disabled' : ''}>Send</button>
      </div>
    `;
  }

  private renderChatButton(theme: any): string {
    return `
      <button class="chat-button" style="
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: ${theme.buttonColor};
        color: white;
        border: none;
        cursor: pointer;
        font-size: 24px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
      ">💬</button>
    `;
  }

  private getThemeStyles(): any {
    const themes = {
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
    return themes[this.config.theme || 'light'];
  }

  private attachEventListeners(): void {
    if (!this.chatElement) return;

    // Close button
    const closeBtn = this.chatElement.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Chat button
    const chatButton = this.chatElement.querySelector('.chat-button');
    if (chatButton) {
      chatButton.addEventListener('click', () => this.open());
    }

    // Send button
    const sendBtn = this.chatElement.querySelector('.send-btn');
    if (sendBtn) {
      sendBtn.addEventListener('click', () => this.handleSendMessage());
    }

    // Input enter key
    const messageInput = this.chatElement.querySelector('.message-input') as HTMLInputElement;
    if (messageInput) {
      messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleSendMessage();
        }
      });
    }

    // Auto-scroll to bottom
    const messagesEnd = this.chatElement.querySelector('.messages-end');
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private handleSendMessage(): void {
    const messageInput = this.chatElement?.querySelector('.message-input') as HTMLInputElement;
    if (messageInput) {
      const message = messageInput.value.trim();
      if (message) {
        this.sendMessage(message);
        messageInput.value = '';
      }
    }
  }
}
