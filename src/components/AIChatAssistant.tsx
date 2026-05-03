import { useState, useRef, useEffect } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const GEMINI_API_KEY = import.meta.env.VITE_GCP_API_KEY;

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('votewise_chat_history');
    return saved ? JSON.parse(saved) : [
      { sender: 'bot', text: 'Namaste! 🙏 I am VoteBot, powered by Google Gemini. Ask me anything about Indian elections!' }
    ];
  });
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('votewise_chat_history', JSON.stringify(messages));
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const callGemini = async (userInput: string) => {
    const systemPrompt = `You are "VoteBot", a specialized AI assistant for the Indian Electoral Process. 
    Your goal is to educate voters. Use Indian context (ECI, EVM, VVPAT, NOTA, NVSP). 
    Be helpful, neutral, and accurate. If asked about political parties, remain neutral.
    Always mention that for official data, users should visit eci.gov.in. 
    Keep responses concise and formatted with bullet points where necessary.
    Current Year is 2026. General Elections happened in 2024.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\nUser: ${userInput}` }] }]
        })
      });

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return "I'm having trouble connecting to my brain (GCP Gemini). Please try again later or check your internet! 🙏";
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    const botResponse = await callGemini(userMsg);
    
    setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    setIsTyping(false);
  };

  const clearChat = () => {
    if (window.confirm('Clear your chat history?')) {
      setMessages([{ sender: 'bot', text: 'Chat cleared. How can I help you today? 🙏' }]);
      localStorage.removeItem('votewise_chat_history');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle VoteBot AI Assistant"
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000,
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'var(--accent-gradient)', color: 'white',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          boxShadow: '0 8px 30px rgba(99, 102, 241, 0.5)', border: 'none',
          cursor: 'pointer', transition: 'var(--transition)', fontSize: '1.6rem'
        }}
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {isOpen && (
        <div className="glass animate-fade-in" style={{
          position: 'fixed', bottom: '7rem', right: '2rem', zIndex: 1000,
          width: '400px', maxWidth: 'calc(100vw - 2rem)', height: '580px', borderRadius: '20px',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {/* Header */}
          <div style={{ background: 'var(--accent-gradient)', padding: '1.2rem 1.5rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span aria-hidden="true">🤖</span> VoteBot Assistant
              </h3>
              <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.85, marginTop: '0.1rem' }}>
                AI-powered Election Guide
              </p>
            </div>
            <button onClick={clearChat} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Clear Chat">
              🗑️
            </button>
          </div>

          {/* Messages */}
          <div ref={chatRef} role="log" aria-live="polite" style={{
            flex: 1, padding: '1.2rem', overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: '0.75rem',
            background: 'rgba(10, 14, 26, 0.8)'
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                background: msg.sender === 'user' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.06)',
                color: 'white', padding: '0.9rem 1.1rem',
                borderRadius: '14px',
                borderBottomRightRadius: msg.sender === 'user' ? '2px' : '14px',
                borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '14px',
                maxWidth: '88%', fontSize: '0.9rem', lineHeight: '1.6',
                border: msg.sender === 'bot' ? '1px solid var(--glass-border)' : 'none',
                whiteSpace: 'pre-line'
              }}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div style={{
                alignSelf: 'flex-start', background: 'rgba(255,255,255,0.06)', padding: '0.8rem 1rem',
                borderRadius: '14px', borderBottomLeftRadius: '2px', border: '1px solid var(--glass-border)',
                display: 'flex', gap: '4px'
              }}>
                <div className="dot-pulse" style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
                <div className="dot-pulse" style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }}></div>
                <div className="dot-pulse" style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }}></div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} style={{
            display: 'flex', padding: '0.75rem',
            borderTop: '1px solid var(--glass-border)',
            background: 'rgba(10, 14, 26, 0.95)'
          }}>
            <input
              type="text" value={input} onChange={e => setInput(e.target.value)}
              placeholder="Ask about Indian elections..."
              aria-label="Type your message to VoteBot"
              style={{
                flex: 1, background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)',
                padding: '0.85rem 1rem', borderRadius: '10px',
                color: 'white', outline: 'none', fontSize: '0.95rem',
                fontFamily: 'Inter, sans-serif'
              }}
            />
            <button type="submit" aria-label="Send message" style={{
              background: 'transparent', border: 'none',
              color: 'var(--accent-primary)', padding: '0 0.75rem',
              cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem',
              fontFamily: 'Inter, sans-serif'
            }}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatAssistant;
