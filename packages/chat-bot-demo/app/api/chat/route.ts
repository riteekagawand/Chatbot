import { NextRequest, NextResponse } from 'next/server';
import { ContentstackService } from '../../../../platform/services/contentstack/contentstackService';

export async function POST(req: NextRequest) {
  try {
    const { 
      message, 
      llmProvider, 
      llmApiKey, 
      llmModel, 
      enableStreaming,
      contentstackApiKey,
      contentstackToken,
      contentstackEnvironment,
      contentTypes
    } = await req.json();

    if (!message || !llmProvider || !llmApiKey) {
      return NextResponse.json(
        { error: 'Missing required parameters: message, llmProvider, llmApiKey' },
        { status: 400 }
      );
    }

    // Initialize Contentstack service if credentials are provided
    let contentstackService = null;
    if (contentstackApiKey && contentstackToken) {
      contentstackService = new ContentstackService({
        apiKey: contentstackApiKey,
        deliveryToken: contentstackToken,
        environment: contentstackEnvironment || 'development'
      });
    }

    // Search for relevant content from Contentstack
    let relevantContent = '';
    if (contentstackService) {
      try {
        const searchResults = await contentstackService.searchAllContent(
          message, 
          contentTypes || ['tour', 'faq', 'blog']
        );
        
        if (searchResults.length > 0) {
          relevantContent = '\n\nRelevant content from our knowledge base:\n';
          searchResults.slice(0, 3).forEach((item, index) => {
            relevantContent += `${index + 1}. ${item.title}\n${item.content}\n\n`;
          });
        }
      } catch (error) {
        console.warn('Contentstack search failed:', error);
        // Continue without content if search fails
      }
    }

    // Enhance the message with relevant content
    const enhancedMessage = message + relevantContent;

    // Make the LLM API call based on the provider
    let response;
    
    switch (llmProvider) {
      case 'openai':
        response = await callOpenAI(enhancedMessage, llmApiKey, llmModel);
        break;
      case 'groq':
        response = await callGroq(enhancedMessage, llmApiKey, llmModel);
        break;
      case 'anthropic':
        response = await callAnthropic(enhancedMessage, llmApiKey, llmModel);
        break;
      case 'perplexity':
        response = await callPerplexity(enhancedMessage, llmApiKey, llmModel);
        break;
      case 'xai':
        response = await callXAI(enhancedMessage, llmApiKey, llmModel);
        break;
      default:
        return NextResponse.json(
          { error: `Unsupported LLM provider: ${llmProvider}` },
          { status: 400 }
        );
    }

    return NextResponse.json({ 
      content: response,
      usage: undefined // Could be added later if needed
    });

  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

async function callOpenAI(message: string, apiKey: string, model?: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model || 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGroq(message: string, apiKey: string, model?: string) {
  // Debug: Log the API key format (first 10 chars only for security)
  console.log(`Groq API key format: ${apiKey.substring(0, 10)}... (length: ${apiKey.length})`);
  
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model || 'llama3-8b-8192',
      messages: [{ role: 'user', content: message }],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log('Groq API error details:', errorData);
    throw new Error(`Groq API error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callAnthropic(message: string, apiKey: string, model?: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: model || 'claude-3-haiku-20240307',
      max_tokens: 1000,
      messages: [{ role: 'user', content: message }],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Anthropic API error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

async function callPerplexity(message: string, apiKey: string, model?: string) {
  // Debug: Log the API key format (first 10 chars only for security)
  console.log(`Perplexity API key format: ${apiKey.substring(0, 10)}... (length: ${apiKey.length})`);
  
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model || 'llama-3.1-sonar-small-128k-online',
      messages: [{ role: 'user', content: message }],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log('Perplexity API error details:', errorData);
    throw new Error(`Perplexity API error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callXAI(message: string, apiKey: string, model?: string) {
  // Debug: Log the API key format (first 10 chars only for security)
  console.log(`xAI API key format: ${apiKey.substring(0, 10)}... (length: ${apiKey.length})`);
  
  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model || 'grok-beta',
      messages: [{ role: 'user', content: message }],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log('xAI API error details:', errorData);
    throw new Error(`xAI API error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
