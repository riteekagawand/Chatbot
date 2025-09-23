'use client';

import { useState } from 'react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [llmProvider, setLlmProvider] = useState<'openai' | 'groq' | 'anthropic' | 'perplexity'>('groq');
  const [llmApiKey, setLlmApiKey] = useState('');
  const [llmModel, setLlmModel] = useState('');

  const [contentstackApiKey, setContentstackApiKey] = useState('');
  const [contentstackToken, setContentstackToken] = useState('');
  const [contentstackEnvironment, setContentstackEnvironment] = useState('development');
  const [contentstackRegion, setContentstackRegion] = useState<'us' | 'eu' | 'azure'>('us');

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const user: Message = { id: `${Date.now()}-u`, role: 'user', content: trimmed };
    setMessages(prev => [...prev, user]);
    setInput('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          llmProvider,
          llmApiKey,
          llmModel,
          enableStreaming: false,
          contentstackApiKey,
          contentstackToken,
          contentstackEnvironment,
          contentstackRegion,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({} as any));
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      const assistant: Message = { id: `${Date.now()}-a`, role: 'assistant', content: data.content || '' };
      setMessages(prev => [...prev, assistant]);
    } catch (e: any) {
      const assistant: Message = { id: `${Date.now()}-e`, role: 'assistant', content: e?.message || 'Failed to fetch response' };
      setMessages(prev => [...prev, assistant]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 50 }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: '#111827',
            color: 'white',
            padding: '10px 14px',
            borderRadius: 9999,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Chat
        </button>
      ) : (
        <div style={{ width: 360, height: 520, background: 'white', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: 12, background: '#111827', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>AI Assistant</div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>✕</button>
          </div>

          <div style={{ padding: 8, borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'grid', gap: 6 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                <select value={llmProvider} onChange={e => setLlmProvider(e.target.value as any)} style={{ padding: 6, border: '1px solid #d1d5db', borderRadius: 6 }}>
                  <option value="groq">Groq</option>
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="perplexity">Perplexity</option>
                </select>
                <input placeholder="LLM API Key" value={llmApiKey} onChange={e => setLlmApiKey(e.target.value)} style={{ padding: 6, border: '1px solid #d1d5db', borderRadius: 6 }} />
                <input placeholder="Model (optional)" value={llmModel} onChange={e => setLlmModel(e.target.value)} style={{ padding: 6, border: '1px solid #d1d5db', borderRadius: 6 }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                <input placeholder="Contentstack API Key" value={contentstackApiKey} onChange={e => setContentstackApiKey(e.target.value)} style={{ padding: 6, border: '1px solid #d1d5db', borderRadius: 6 }} />
                <input placeholder="Delivery Token" value={contentstackToken} onChange={e => setContentstackToken(e.target.value)} style={{ padding: 6, border: '1px solid #d1d5db', borderRadius: 6 }} />
                <input placeholder="Env" value={contentstackEnvironment} onChange={e => setContentstackEnvironment(e.target.value)} style={{ padding: 6, border: '1px solid #d1d5db', borderRadius: 6 }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 6 }}>
                <select value={contentstackRegion} onChange={e => setContentstackRegion(e.target.value as any)} style={{ padding: 6, border: '1px solid #d1d5db', borderRadius: 6 }}>
                  <option value="us">US</option>
                  <option value="eu">EU</option>
                  <option value="azure">Azure</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: 12, background: '#f9fafb' }}>
            {messages.map(m => (
              <div key={m.id} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{m.role === 'user' ? 'You' : 'Assistant'}</div>
                <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
              </div>
            ))}
            {isLoading && <div style={{ color: '#6b7280', fontSize: 12 }}>Thinking…</div>}
          </div>

          <div style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1px solid #e5e7eb' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about tours…"
              onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
              style={{ flex: 1, padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }}
            />
            <button onClick={sendMessage} disabled={isLoading} style={{ background: '#111827', color: 'white', padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


