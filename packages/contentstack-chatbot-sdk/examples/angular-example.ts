import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ContentstackChatBot } from 'contentstack-chatbot-sdk';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>My Angular Travel Website</h1>
      <p>Welcome to our travel booking platform. Use the chatbot to get help!</p>
      <div #chatbotContainer></div>
    </div>
  `,
  styles: [`
    h1 {
      color: #333;
      text-align: center;
    }
    
    body {
      font-family: system-ui, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('chatbotContainer', { static: true }) chatbotContainer!: ElementRef;
  private chatbot: any;

  ngOnInit() {
    this.chatbot = ContentstackChatBot.create({
      contentstack: {
        apiKey: 'blt354ba6a0b8b7e140',
        deliveryToken: 'cs7f1c6103726d54fe1978f31f',
        environment: 'development'
      },
      title: 'Travel Assistant',
      placeholder: 'Ask me about tours and travel...',
      position: 'bottom-right',
      theme: 'light',
      width: 350,
      height: 500
    }, {
      onMessage: (message: any) => {
        console.log('New message:', message);
      },
      onStateChange: (state: any) => {
        console.log('State changed:', state);
      },
      onError: (error: Error) => {
        console.error('Chatbot error:', error);
      }
    });
    
    this.chatbot.mount(this.chatbotContainer.nativeElement);
  }

  ngOnDestroy() {
    if (this.chatbot) {
      this.chatbot.destroy();
    }
  }
}

// Alternative Angular service approach
import { Injectable } from '@angular/core';
import { ContentstackChatBot } from 'contentstack-chatbot-sdk';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private chatbot: any;

  initializeChatbot(container: HTMLElement) {
    this.chatbot = ContentstackChatBot.create({
      contentstack: {
        apiKey: 'blt354ba6a0b8b7e140',
        deliveryToken: 'cs7f1c6103726d54fe1978f31f',
        environment: 'development'
      },
      title: 'Travel Assistant',
      placeholder: 'Ask me about tours and travel...'
    });

    this.chatbot.mount(container);
    return this.chatbot;
  }

  destroyChatbot() {
    if (this.chatbot) {
      this.chatbot.destroy();
      this.chatbot = null;
    }
  }

  getChatbot() {
    return this.chatbot;
  }
}

// Usage in component with service
@Component({
  selector: 'app-chatbot',
  template: '<div #chatbotContainer></div>'
})
export class ChatbotComponent implements OnInit, OnDestroy {
  @ViewChild('chatbotContainer', { static: true }) chatbotContainer!: ElementRef;

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    this.chatbotService.initializeChatbot(this.chatbotContainer.nativeElement);
  }

  ngOnDestroy() {
    this.chatbotService.destroyChatbot();
  }
}
