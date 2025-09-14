export interface ChatBotProps {
  // LLM Configuration
  llmProvider?: 'openai' | 'groq' | 'anthropic';
  llmApiKey?: string;
  llmModel?: string;
  
  // Contentstack Configuration
  contentstackApiKey?: string;
  contentstackToken?: string;
  contentstackEnvironment?: string;
  
  // UI Configuration
  theme?: 'light' | 'dark' | 'auto';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  placeholder?: string;
  
  // Advanced Configuration
  contentTypes?: string[];
  maxMessages?: number;
  enableStreaming?: boolean;
  
  // Callbacks
  onMessage?: (message: string) => void;
  onError?: (error: Error) => void;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
