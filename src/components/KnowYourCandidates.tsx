import { useState } from 'react';

interface Candidate {
  name: string;
  party: string;
  partyColor: string;
  age: number;
  education: string;
  assets: string;
  criminalCases: number;
  constituency: string;
  promises: string[];
  image: string;
}

interface CompletedElection {
  name: string;
  year: number;
  winner: Candidate;
  losers: Candidate[];
  winnerNowDoing: string;
  marginOfVictory: string;
  voterTurnout: string;
}

const ongoingCandidates: Candidate[] = [
  {
    name: 'Rajesh Kumar Sharma', party: 'Bharatiya Vikas Party', partyColor: '#ff9933',
    age: 52, education: 'MBA, IIM Ahmedabad', assets: '₹12.5 Crore',
    criminalCases: 0, constituency: 'Mumbai North',
    promises: ['Smart City infrastructure', 'Free Wi-Fi in public areas', '50,000 new jobs in IT sector', 'Metro expansion'],
    image: '👨‍💼'
  },
  {
    name: 'Priya Deshpande', party: 'Jan Seva Dal', partyColor: '#22c55e',
    age: 38, education: 'PhD Political Science, JNU', assets: '₹3.2 Crore',
    criminalCases: 0, constituency: 'Mumbai North',
    promises: ['Universal healthcare coverage', 'Women safety cell in every ward', 'Organic farming subsidies', 'Free education till graduation'],
    image: '👩‍💼'
  },
  {
    name: 'Vikram Singh Chauhan', party: 'Rashtriya Samaj Party', partyColor: '#3b82f6',
    age: 61, education: 'BA, Delhi University', assets: '₹45.8 Crore',
    criminalCases: 3, constituency: 'Mumbai North',
    promises: ['Reservation expansion', 'Farm loan waiver', 'Old pension scheme restoration', 'Free bus for women'],
    image: '👨‍⚖️'
  },
  {
    name: 'Aisha Fatima Khan', party: 'Independent', partyColor: '#a78bfa',
    age: 34, education: 'LLB, NLU Delhi', assets: '₹1.8 Crore',
    criminalCases: 0, constituency: 'Mumbai North',
    promises: ['RTI strengthening', 'Environmental protection laws', 'Judicial reform', 'Anti-corruption task force'],
    image: '👩‍⚖️'
  },
];

const completedElection: CompletedElection = {
  name: 'Delhi Legislative Assembly Election',
  year: 2025,
  winner: {
    name: 'Anand Prakash Verma', party: 'Delhi Pragati Front', partyColor: '#10b981',
    age: 47, education: 'B.Tech, IIT Delhi', assets: '₹8.7 Crore',
    criminalCases: 0, constituency: 'New Delhi',
    promises: ['24/7 water supply', 'Air pollution reduction by 40%', 'Free public transport', '10 new hospitals'],
    image: '🏆'
  },
  losers: [
    {
      name: 'Suresh Yadav', party: 'Janta Morcha', partyColor: '#ff9933',
      age: 55, education: 'BA, Allahabad University', assets: '₹22 Crore',
      criminalCases: 2, constituency: 'New Delhi',
      promises: ['Highway expansion', 'Industrial zones', 'Police reform'],
      image: '👤'
    },
    {
      name: 'Meera Krishnamurthy', party: 'Socialist Alliance', partyColor: '#ef4444',
      age: 42, education: 'MA Economics, LSE', assets: '₹5.1 Crore',
      criminalCases: 0, constituency: 'New Delhi',
      promises: ['Universal Basic Income pilot', 'Education reform', 'Green energy transition'],
      image: '👤'
    },
  ],
  winnerNowDoing: 'Anand Prakash Verma was sworn in as Chief Minister on March 15, 2025. In his first 100 days, he has launched the "Clean Air Delhi" initiative reducing PM2.5 by 18%, inaugurated 3 new Mohalla Clinics, and approved the ₹8,000 Crore metro Phase IV extension.',
  marginOfVictory: '1,23,456 votes (18.2%)',
  voterTurnout: '67.4%'
};

const KnowYourCandidates = () => {
  const [mode, setMode] = useState<'ongoing' | 'completed'>('ongoing');
  const [expandedCandidate, setExpandedCandidate] = useState<number | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState<number[]>([]);

  const toggleCompare = (idx: number) => {
    setCompareList(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : prev.length < 3 ? [...prev, idx] : prev
    );
  };

  return (
    <section id="candidates" className="section">
      <div className="container">
        <h2 className="section-title scroll-animate">Know Your <span className="text-gradient">Candidates</span></h2>
        <p className="section-subtitle scroll-animate">AI-generated profiles for demonstration — Explore backgrounds, track records, and promises</p>

        {/* Mode Toggle */}
        <div className="scroll-animate" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
          <button onClick={() => { setMode('ongoing'); setExpandedCandidate(null); }}
            className={`btn ${mode === 'ongoing' ? 'btn-primary' : 'btn-secondary'}`}>
            🔴 Ongoing Election
          </button>
          <button onClick={() => { setMode('completed'); setExpandedCandidate(null); }}
            className={`btn ${mode === 'completed' ? 'btn-primary' : 'btn-secondary'}`}>
            ✅ Completed Election
          </button>
        </div>

        {mode === 'ongoing' ? (
          <>
            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span className="tag tag-saffron">Mumbai North Constituency</span>
              <button onClick={() => { setCompareMode(!compareMode); setCompareList([]); }}
                className={`btn ${compareMode ? 'btn-saffron' : 'btn-secondary'}`} style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                {compareMode ? '✕ Exit Compare' : '⚖️ Compare'}
              </button>
            </div>

            {/* Compare Table */}
            {compareMode && compareList.length >= 2 && (
              <div className="glass animate-fade-in" style={{ padding: '2rem', marginBottom: '2rem', overflowX: 'auto' }}>
                <h4 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Candidate Comparison</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Metric</th>
                      {compareList.map(idx => (
                        <th key={idx} style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--glass-border)', color: ongoingCandidates[idx].partyColor, fontWeight: 700 }}>
                          {ongoingCandidates[idx].name.split(' ')[0]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {['party', 'age', 'education', 'assets', 'criminalCases'].map(field => (
                      <tr key={field}>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.03)', textTransform: 'capitalize', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                          {field === 'criminalCases' ? 'Criminal Cases' : field}
                        </td>
                        {compareList.map(idx => {
                          const c = ongoingCandidates[idx];
                          const val = field === 'criminalCases' ? (c.criminalCases === 0 ? '✅ Clean' : `⚠️ ${c.criminalCases}`) : (c as any)[field];
                          return (
                            <td key={idx} style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '0.9rem' }}>
                              {String(val)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Candidate Cards */}
            <div className="card-grid">
              {ongoingCandidates.map((c, idx) => (
                <div key={idx} className="glass scroll-animate" style={{
                  padding: '2rem', cursor: 'pointer', transition: 'var(--transition)',
                  borderLeft: `3px solid ${c.partyColor}`,
                  transform: expandedCandidate === idx ? 'scale(1.02)' : 'scale(1)'
                }} onClick={() => setExpandedCandidate(expandedCandidate === idx ? null : idx)}>

                  {compareMode && (
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', cursor: 'pointer' }}
                      onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={compareList.includes(idx)} onChange={() => toggleCompare(idx)}
                        style={{ width: '18px', height: '18px', accentColor: c.partyColor }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Compare</span>
                    </label>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>{c.image}</span>
                    <div>
                      <h4 style={{ fontSize: '1.15rem' }}>{c.name}</h4>
                      <span className="tag" style={{ background: `${c.partyColor}20`, color: c.partyColor, border: `1px solid ${c.partyColor}40` }}>
                        {c.party}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.85rem' }}><span style={{ color: 'var(--text-secondary)' }}>Age:</span> {c.age}</div>
                    <div style={{ fontSize: '0.85rem' }}><span style={{ color: 'var(--text-secondary)' }}>Assets:</span> {c.assets}</div>
                    <div style={{ fontSize: '0.85rem' }}><span style={{ color: 'var(--text-secondary)' }}>Education:</span> {c.education}</div>
                    <div style={{ fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Cases:</span>{' '}
                      {c.criminalCases === 0 ? <span style={{ color: 'var(--accent-green)' }}>Clean ✅</span> : <span style={{ color: '#ef4444' }}>{c.criminalCases} pending ⚠️</span>}
                    </div>
                  </div>

                  {expandedCandidate === idx && (
                    <div className="animate-fade-in" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                      <h5 style={{ color: 'var(--accent-secondary)', marginBottom: '0.75rem' }}>Campaign Promises</h5>
                      {c.promises.map((p, pi) => (
                        <div key={pi} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                          <span style={{ color: c.partyColor }}>▸</span> {p}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Completed Election Mode */
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="glass scroll-animate" style={{ padding: '2.5rem', marginBottom: '1.5rem', textAlign: 'center', borderLeft: '4px solid var(--accent-green)' }}>
              <span className="tag tag-green" style={{ marginBottom: '1rem', display: 'inline-block' }}>{completedElection.name} — {completedElection.year}</span>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '1.5rem 0', flexWrap: 'wrap' }}>
                <div><p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-green)' }}>{completedElection.voterTurnout}</p><p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Voter Turnout</p></div>
                <div><p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-saffron)' }}>{completedElection.marginOfVictory}</p><p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Victory Margin</p></div>
              </div>
            </div>

            {/* Winner */}
            <div className="glass scroll-animate" style={{ padding: '2rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent-saffron)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '3rem' }}>{completedElection.winner.image}</span>
                <div>
                  <span className="tag tag-saffron" style={{ marginBottom: '0.3rem', display: 'inline-block' }}>WINNER</span>
                  <h3 style={{ fontSize: '1.3rem' }}>{completedElection.winner.name}</h3>
                  <p style={{ color: completedElection.winner.partyColor, fontWeight: 600 }}>{completedElection.winner.party}</p>
                </div>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', marginTop: '1rem' }}>
                <h5 style={{ color: 'var(--accent-green)', marginBottom: '0.5rem' }}>📍 What They Are Doing Now</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.8' }}>{completedElection.winnerNowDoing}</p>
              </div>
            </div>

            {/* Losers */}
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Other Candidates</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {completedElection.losers.map((l, i) => (
                <div key={i} className="glass scroll-animate" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.75 }}>
                  <span style={{ fontSize: '2rem' }}>{l.image}</span>
                  <div style={{ flex: 1 }}>
                    <h4>{l.name}</h4>
                    <p style={{ color: l.partyColor, fontSize: '0.9rem' }}>{l.party}</p>
                  </div>
                  <span className="tag tag-blue">Lost</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default KnowYourCandidates;
