export interface ChatBotProps {
  llmProvider?: 'openai' | 'groq' | 'anthropic' | 'perplexity';
  llmApiKey?: string;
  contentstackApiKey: string;
  contentstackToken: string;
  contentstackEnvironment: string;
  title?: string;
  placeholder?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark';
  width?: number;
  height?: number;
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ContentstackEntry {
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

export interface ChatBotState {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
  isConnected: boolean;
}
