import { useState, useRef, useEffect } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const knowledgeBase: { keywords: string[]; response: string }[] = [
  { keywords: ['register', 'registration', 'enroll', 'sign up', 'form 6'],
    response: 'To register as a voter in India:\n\n1. Visit nvsp.in (National Voter Service Portal)\n2. Fill Form 6 (for new registration) or Form 6A (for NRI)\n3. Upload passport-size photo + address/identity proof\n4. Submit and track your application\n\nYou can also visit your nearest Electoral Registration Officer (ERO) with documents. You must be 18+ years on the qualifying date (Jan 1 or Jul 1).' },

  { keywords: ['voter id', 'epic', 'card', 'identity'],
    response: 'The EPIC (Electors Photo Identity Card) is issued by the ECI. If you\'ve lost it:\n\n• Apply for a duplicate via Form 002 on nvsp.in\n• You can still vote using 12 alternative IDs: Aadhaar, Passport, Driving License, PAN Card, MNREGA Card, etc.\n• Download the digital voter ID from Voter Helpline App\n\nNew EPIC cards are issued within 15-30 days of registration.' },

  { keywords: ['evm', 'machine', 'electronic', 'voting machine'],
    response: 'EVM (Electronic Voting Machine) key facts:\n\n• Standalone device — no internet/wireless connectivity\n• Cannot be hacked remotely\n• Runs on battery — works even during power cuts\n• Each EVM can record up to 2,000 votes\n• First used in 1982 (Kerala by-election)\n• VVPAT (Voter Verified Paper Audit Trail) added for verification\n• Supreme Court mandated VVPAT verification of 5 booths per constituency' },

  { keywords: ['nota', 'none of the above', 'reject'],
    response: 'NOTA (None of the Above) facts:\n\n• Introduced by Supreme Court in 2013 (PUCL vs Union of India)\n• Available as the last button on the EVM\n• Lets you formally reject all candidates\n• Currently, even if NOTA gets majority, the candidate with most votes wins\n• NOTA votes are counted and published in results\n• It sends a strong message to political parties about candidate quality' },

  { keywords: ['model code', 'conduct', 'mcc'],
    response: 'Model Code of Conduct (MCC) is a set of guidelines by ECI that all parties/candidates must follow during elections:\n\n• No new government schemes/projects after announcement\n• No use of religion or caste for votes\n• No bribing or intimidating voters\n• Government vehicles cannot be used for campaigning\n• No campaigning 48 hours before polling\n• All political ads need ECI certification\n• Violations reported via cVIGIL app\n\nMCC is enforced from the date of election announcement until results.' },

  { keywords: ['electoral college', 'president', 'presidential'],
    response: 'India\'s Presidential Election uses an Electoral College:\n\n• Elected members of Lok Sabha + Rajya Sabha + all State Legislative Assemblies\n• Total ~5,000 electors\n• Uses Single Transferable Vote system with proportional representation\n• Each MLA\'s vote has a value based on state population\n• Each MP\'s vote value = Total value of all MLAs ÷ Total MPs\n• Secret ballot on special voting paper\n• President elected for a 5-year term' },

  { keywords: ['constituency', 'seat', 'lok sabha', 'how many'],
    response: 'India\'s Electoral Structure:\n\n• Lok Sabha: 543 elected seats + 2 nominated Anglo-Indian members\n• Rajya Sabha: 245 members (233 elected + 12 nominated)\n• State Assemblies: Varies by state (UP has 403, Goa has 40)\n• Each Lok Sabha constituency has ~15-25 lakh voters\n• Delimitation Commission redraws boundaries based on census\n• 84 seats reserved for SC, 47 for ST candidates' },

  { keywords: ['result', 'counting', 'who won', 'winner'],
    response: 'Election Results Process:\n\n1. Counting starts at 8 AM on counting day\n2. Postal ballots counted first\n3. EVM results displayed round-by-round\n4. 5 random VVPAT slips verified per constituency (SC order)\n5. Results declared constituency-by-constituency\n6. Live results available on results.eci.gov.in\n7. Certificate of Election issued to winners\n8. Party/coalition with 272+ seats forms government (Lok Sabha)' },

  { keywords: ['right', 'rights', 'legal', 'law'],
    response: 'Your Rights as an Indian Voter:\n\n• Right to vote (Article 326, Universal Adult Suffrage)\n• Right to secret ballot\n• Right to paid leave on election day\n• Right to use NOTA\n• Right to report violations via cVIGIL\n• Right to challenge election results (Election Petition)\n• Right to information about candidates (Section 33A, RPA)\n• Right to accessible polling booths (PwD Act 2016)\n\nKey Acts: Representation of the People Act 1950 & 1951' },

  { keywords: ['help', 'helpline', 'contact', 'complaint'],
    response: 'Important Election Contacts:\n\n📞 1950 — Voter Helpline (toll-free)\n📱 Voter Helpline App — Check registration, find booth\n📱 cVIGIL App — Report election violations\n🌐 nvsp.in — Voter registration portal\n🌐 eci.gov.in — Election Commission official site\n🌐 electoralsearch.eci.gov.in — Search voter details\n🌐 results.eci.gov.in — Live election results\n\n112 — Emergency helpline for voter intimidation' },

  { keywords: ['poll', 'polling', 'booth', 'station', 'where', 'vote'],
    response: 'How to find your polling booth:\n\n1. Visit electoralsearch.eci.gov.in\n2. Enter your name, father\'s name, age, and state\n3. Your booth details will be shown\n4. Or call 1950 with your EPIC number\n5. Download Voter Helpline App for GPS navigation to your booth\n\nPolling hours are typically 7 AM to 6 PM. Carry your EPIC card or any of the 12 approved photo IDs.' },
];

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('votewise_chat_history');
    return saved ? JSON.parse(saved) : [
      { sender: 'bot', text: 'Namaste! 🙏 I\'m VoteBot, your AI assistant for Indian elections. Ask me anything about voter registration, EVMs, NOTA, election laws, or the voting process!' }
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

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let response = "I'm not sure about that specific topic yet. Try asking me about:\n\n• Voter registration\n• Voter ID / EPIC card\n• EVMs & VVPAT\n• NOTA\n• Model Code of Conduct\n• Your rights as a voter\n• Polling booth location\n• Election results process\n• Helpline numbers";

      // Greetings
      if (['hi', 'hello', 'hey', 'namaste'].some(g => lower.includes(g))) {
        response = "Namaste! 🙏 Welcome to VoteBot. I can help you with:\n\n• 📝 Voter Registration\n• 🪪 Voter ID issues\n• 🖥️ EVM & VVPAT info\n• 🚫 NOTA explanation\n• ⚖️ Election laws & your rights\n• 📍 Find your polling booth\n• 📊 Results process\n\nWhat would you like to know?";
      } else if (lower.includes('thank')) {
        response = "You're welcome! 🙏 Remember, every vote counts. If you have more questions, I'm always here. Jai Hind! 🇮🇳";
      } else {
        for (const entry of knowledgeBase) {
          if (entry.keywords.some(kw => lower.includes(kw))) {
            response = entry.response;
            break;
          }
        }
      }

      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
      setIsTyping(false);
    }, 1000);
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
