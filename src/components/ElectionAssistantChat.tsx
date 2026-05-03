import React, { useState } from 'react';

const ElectionAssistantChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{sender: 'bot' | 'user', text: string}[]>([
    { sender: 'bot', text: 'Hi there! I am ElectBot, your personal election assistant. Ask me anything about registering, voting methods, or the electoral process!' }
  ]);
  const [input, setInput] = useState('');
  const chatRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let botResponse = "I'm not quite sure about that. Try asking about voter registration, the electoral college, or when the election is!";
      const lowerInput = userMsg.toLowerCase();
      
      if (lowerInput.includes('register')) {
        botResponse = "To register to vote, you can usually do it online, by mail, or in person at your local election office. Use the 'Check Election Data' tool on this page to find your specific state's registration link!";
      } else if (lowerInput.includes('when') || lowerInput.includes('date')) {
        botResponse = "The next major General Election is on Tuesday, November 3, 2026. Primary election dates vary by state.";
      } else if (lowerInput.includes('electoral college')) {
        botResponse = "The Electoral College consists of 538 electors. A majority of 270 electoral votes is required to elect the President. Your state's electors cast votes based on the popular vote in your state.";
      } else if (lowerInput.includes('absentee') || lowerInput.includes('mail')) {
        botResponse = "Absentee voting allows you to vote by mail. All states allow it under certain conditions, and many states allow it without any specific excuse. You must request a ballot before the deadline.";
      } else if (lowerInput.includes('primary')) {
        botResponse = "A primary election is used to select a political party's candidate for the general election. Depending on your state, they can be 'open' (anyone can vote) or 'closed' (only registered party members can vote).";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  return (
    <>
      <button 
        className="chat-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Election Assistant Chatbot"
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000,
          width: '65px', height: '65px', borderRadius: '50%',
          background: 'var(--accent-gradient)', color: 'white',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          boxShadow: '0 10px 25px rgba(59, 130, 246, 0.5)', border: 'none',
          cursor: 'pointer', transition: 'transform 0.3s ease'
        }}
      >
        {isOpen ? <span style={{fontSize: '28px'}} aria-hidden="true">✕</span> : <span style={{fontSize: '28px'}} aria-hidden="true">💬</span>}
      </button>

      {isOpen && (
        <div className="chat-window glass animate-fade-in" style={{
          position: 'fixed', bottom: '7rem', right: '2rem', zIndex: 1000,
          width: '380px', height: '550px', borderRadius: '20px',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ background: 'var(--accent-gradient)', padding: '1.5rem', color: 'white' }}>
            <h3 style={{ margin: 0, fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }} aria-hidden="true">🤖</span> ElectBot Assistant
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9, marginTop: '0.3rem' }}>Always here to help you vote.</p>
          </div>
          
          <div ref={chatRef} style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(15,23,42,0.6)' }} role="log" aria-live="polite">
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                background: msg.sender === 'user' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.08)',
                color: 'white',
                padding: '1rem 1.2rem',
                borderRadius: '15px',
                borderBottomRightRadius: msg.sender === 'user' ? '0' : '15px',
                borderBottomLeftRadius: msg.sender === 'bot' ? '0' : '15px',
                maxWidth: '85%',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                border: msg.sender === 'bot' ? '1px solid var(--glass-border)' : 'none',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} style={{ display: 'flex', padding: '1rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(15,23,42,0.9)' }}>
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a question..." 
              aria-label="Type your message to ElectBot"
              style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '10px', color: 'white', outline: 'none', fontSize: '1rem' }}
            />
            <button type="submit" style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', padding: '0 1rem', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }} aria-label="Send Message">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ElectionAssistantChat;
