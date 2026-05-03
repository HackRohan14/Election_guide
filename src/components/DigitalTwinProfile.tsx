import { useState, useEffect } from 'react';

const steps = [
  { id: 'age', label: 'Your Age Group', options: ['18-25 (First-time voter)', '26-40', '41-60', '60+'] },
  { id: 'awareness', label: 'Election Awareness Level', options: ['Beginner – I know very little', 'Intermediate – I vote but want to learn more', 'Advanced – I follow elections closely'] },
  { id: 'location', label: 'Your State / UT', options: ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal', 'Rajasthan', 'Gujarat', 'Kerala', 'Other'] },
  { id: 'concern', label: 'Primary Concern', options: ['Voter Registration', 'Understanding Candidates', 'Voting Process & EVM', 'My Rights as a Voter', 'Election Results & Impact'] },
];

interface Profile {
  age: string;
  awareness: string;
  location: string;
  concern: string;
}

const generateChecklist = (profile: Profile) => {
  const items = [];

  // Age-based
  if (profile.age.includes('18-25')) {
    items.push({ text: 'Register on the National Voters Service Portal (NVSP)', done: false, priority: 'high' });
    items.push({ text: 'Apply for your EPIC (Voter ID) card online', done: false, priority: 'high' });
    items.push({ text: 'Understand EVM & VVPAT machines', done: false, priority: 'medium' });
  } else {
    items.push({ text: 'Verify your name on the Electoral Roll', done: false, priority: 'high' });
    items.push({ text: 'Check if your polling booth has changed', done: false, priority: 'medium' });
  }

  // Awareness-based
  if (profile.awareness.includes('Beginner')) {
    items.push({ text: 'Learn about Lok Sabha vs Rajya Sabha', done: false, priority: 'medium' });
    items.push({ text: 'Understand the role of the Election Commission of India', done: false, priority: 'medium' });
    items.push({ text: 'Know what NOTA means on the ballot', done: false, priority: 'low' });
  } else if (profile.awareness.includes('Intermediate')) {
    items.push({ text: 'Research your constituency candidates', done: false, priority: 'high' });
    items.push({ text: 'Study the Model Code of Conduct', done: false, priority: 'medium' });
  } else {
    items.push({ text: 'Track Election Commission announcements', done: false, priority: 'high' });
    items.push({ text: 'Analyze candidate affidavit data', done: false, priority: 'medium' });
  }

  // Concern-based
  if (profile.concern.includes('Registration')) {
    items.push({ text: 'Download Form 6 for new voter registration', done: false, priority: 'high' });
    items.push({ text: 'Visit your nearest ERO (Electoral Registration Officer)', done: false, priority: 'medium' });
  } else if (profile.concern.includes('Candidates')) {
    items.push({ text: 'Check candidate criminal records on MyNeta.info', done: false, priority: 'high' });
    items.push({ text: 'Compare party manifestos', done: false, priority: 'medium' });
  } else if (profile.concern.includes('EVM')) {
    items.push({ text: 'Watch official ECI tutorial on EVM voting', done: false, priority: 'high' });
    items.push({ text: 'Learn about VVPAT verification process', done: false, priority: 'medium' });
  } else if (profile.concern.includes('Rights')) {
    items.push({ text: 'Know your right to paid leave on election day', done: false, priority: 'high' });
    items.push({ text: 'Understand Section 171 IPC – Electoral offenses', done: false, priority: 'medium' });
  }

  // Universal
  items.push({ text: 'Carry valid photo ID to the polling booth', done: false, priority: 'high' });
  items.push({ text: 'Check your polling booth location on Voter Helpline App', done: false, priority: 'medium' });

  return items;
};

const DigitalTwinProfile = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [profile, setProfile] = useState<Profile | null>(null);
  const [checklist, setChecklist] = useState<{ text: string; done: boolean; priority: string }[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('votewise_profile_state');
    if (saved) {
      try {
        const { answers: sAnswers, profile: sProfile, checklist: sChecklist } = JSON.parse(saved);
        setAnswers(sAnswers || {});
        setProfile(sProfile || null);
        setChecklist(sChecklist || []);
      } catch (e) {
        console.error('Failed to parse saved profile', e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (Object.keys(answers).length > 0 || profile || checklist.length > 0) {
      localStorage.setItem('votewise_profile_state', JSON.stringify({ answers, profile, checklist }));
    }
  }, [answers, profile, checklist]);

  const handleSelect = (option: string) => {
    const newAnswers = { ...answers, [steps[currentStep].id]: option };
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const p = newAnswers as unknown as Profile;
      setProfile(p);
      setChecklist(generateChecklist(p));
    }
  };

  const resetProfile = () => {
    if (window.confirm('Are you sure you want to reset your profile and progress?')) {
      setCurrentStep(0);
      setAnswers({});
      setProfile(null);
      setChecklist([]);
      localStorage.removeItem('votewise_profile_state');
    }
  };

  const toggleItem = (idx: number) => {
    setChecklist(prev => prev.map((item, i) => i === idx ? { ...item, done: !item.done } : item));
  };

  const completedCount = checklist.filter(c => c.done).length;
  const progress = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;

  if (profile) {
    return (
      <section id="profile" className="section">
        <div className="container">
          <h2 className="section-title scroll-animate">Your <span className="text-gradient">Election Journey</span></h2>
          <p className="section-subtitle scroll-animate">Personalized dashboard based on your voter profile</p>

          <div className="glass scroll-animate" style={{ padding: '2.5rem', maxWidth: '800px', margin: '0 auto' }}>
            {/* Profile Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {Object.entries(profile).map(([key, val]) => (
                <div key={key} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>{key}</p>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{val.split('–')[0].trim()}</p>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 600 }}>Journey Progress</span>
                <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>{progress}%</span>
              </div>
              <div style={{ width: '100%', background: 'rgba(255,255,255,0.08)', height: '10px', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, background: 'var(--green-gradient)', height: '100%', borderRadius: '10px', transition: 'width 0.5s ease' }} />
              </div>
            </div>

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {checklist.map((item, i) => (
                <label key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.2rem',
                  background: item.done ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.02)',
                  borderRadius: '12px', cursor: 'pointer',
                  border: `1px solid ${item.done ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)'}`,
                  transition: 'var(--transition)'
                }}>
                  <input type="checkbox" checked={item.done} onChange={() => toggleItem(i)}
                    style={{ width: '20px', height: '20px', accentColor: 'var(--accent-green)', cursor: 'pointer' }} />
                  <span style={{
                    flex: 1, textDecoration: item.done ? 'line-through' : 'none',
                    opacity: item.done ? 0.5 : 1, transition: 'var(--transition)'
                  }}>{item.text}</span>
                  <span className={`tag ${item.priority === 'high' ? 'tag-saffron' : item.priority === 'medium' ? 'tag-blue' : 'tag-green'}`}>
                    {item.priority}
                  </span>
                </label>
              ))}
            </div>

            <button onClick={resetProfile} className="btn btn-secondary" style={{ marginTop: '2rem', width: '100%', justifyContent: 'center' }}>
              ↻ Reset Profile
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="profile" className="section">
      <div className="container">
        <h2 className="section-title scroll-animate">Digital Twin <span className="text-gradient">Profile</span></h2>
        <p className="section-subtitle scroll-animate">Answer a few questions to get your personalized Election Journey checklist</p>

        <div className="glass scroll-animate" style={{ padding: '3rem', maxWidth: '650px', margin: '0 auto', textAlign: 'center' }}>
          {/* Progress Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            {steps.map((_, i) => (
              <div key={i} style={{
                width: i <= currentStep ? '32px' : '10px', height: '10px',
                borderRadius: '10px', transition: 'var(--transition)',
                background: i <= currentStep ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.1)'
              }} />
            ))}
          </div>

          <p style={{ color: 'var(--accent-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
            Step {currentStep + 1} of {steps.length}
          </p>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{steps[currentStep].label}</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {steps[currentStep].options.map(opt => (
              <button key={opt} onClick={() => handleSelect(opt)} className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center', padding: '1.2rem', fontSize: '1rem' }}
                aria-label={`Select ${opt}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalTwinProfile;
