import { useState } from 'react';

const flowSteps = [
  {
    id: 1, icon: '📝', title: 'Voter Registration',
    description: 'Eligible citizens (18+ years on qualifying date) register on the electoral roll via Form 6 on the NVSP portal or through their nearest ERO office.',
    details: ['Must be an Indian citizen', 'Age 18+ on January 1 or July 1 (qualifying dates)', 'Can register online at nvsp.in', 'Requires identity & address proof', 'EPIC card issued within 30 days'],
    color: 'var(--accent-primary)',
  },
  {
    id: 2, icon: '📢', title: 'Election Announcement',
    description: 'The Election Commission of India (ECI) announces the election schedule, including nomination dates, campaign deadlines, and polling dates.',
    details: ['Model Code of Conduct comes into force', 'Government cannot announce new policies', 'Media coverage rules activated', 'Security forces deployment begins', 'Voter list finalized'],
    color: 'var(--accent-saffron)',
  },
  {
    id: 3, icon: '📋', title: 'Nomination & Scrutiny',
    description: 'Candidates file their nomination papers with the Returning Officer, including affidavits declaring assets, criminal records, and educational qualifications.',
    details: ['Candidates pay security deposit (₹25,000 for General, ₹12,500 for SC/ST)', 'Must submit Form 26 affidavit', 'Criminal background publicly disclosed', 'Returning Officer scrutinizes nominations', 'Last date for withdrawal after scrutiny'],
    color: 'var(--accent-green)',
  },
  {
    id: 4, icon: '📣', title: 'Campaign Period',
    description: 'Candidates and parties campaign through rallies, advertisements, and door-to-door canvassing. Campaign must end 48 hours before polling (silence period).',
    details: ['Expenditure limit: ₹95 lakh (Lok Sabha), ₹40 lakh (Assembly)', 'No campaigning 48 hrs before polling', 'No religious/caste-based appeals (Section 123)', 'ECI monitors spending via observers', 'Paid news tracking by MCMC'],
    color: 'var(--accent-secondary)',
  },
  {
    id: 5, icon: '🗳️', title: 'Polling Day',
    description: 'Voters go to their designated polling booth, verify their identity, and cast their vote using the Electronic Voting Machine (EVM). VVPAT provides a printed verification slip.',
    details: ['Polling hours: 7 AM to 6 PM (varies by state)', 'Indelible ink applied on left index finger', 'EVM records vote electronically', 'VVPAT displays slip for 7 seconds', 'NOTA option available at bottom', 'Paid holiday for all voters'],
    color: '#ef4444',
  },
  {
    id: 6, icon: '🔒', title: 'Sealing & Storage',
    description: 'After polling ends, EVMs are sealed in the presence of candidates/agents and transported to secure strongrooms under 24/7 CCTV and armed guard surveillance.',
    details: ['Triple-seal system on EVMs', 'CCTV surveillance at strongrooms', 'Candidates can deploy their own agents', 'Armed CAPF guards 24/7', 'Minimum 3-day gap before counting'],
    color: 'var(--accent-blue)',
  },
  {
    id: 7, icon: '📊', title: 'Counting Day',
    description: 'Votes are counted at designated centers. EVMs are opened round-by-round, with mandatory VVPAT verification of 5 randomly selected booths per constituency.',
    details: ['Postal ballots counted first', 'EVM results displayed round-by-round', '5 random VVPAT audits per constituency (Supreme Court order)', 'Candidates/agents present during counting', 'Results declared booth-by-booth'],
    color: 'var(--accent-saffron)',
  },
  {
    id: 8, icon: '🏛️', title: 'Result Declaration & Formation',
    description: 'The Election Commission formally declares the results. The winning party/coalition is invited by the Governor/President to form the government.',
    details: ['Results published on results.eci.gov.in', 'Winning candidate gets Certificate of Election', 'Majority mark: 272 seats (Lok Sabha)', 'Governor invites largest party/coalition', 'Oath of office within 15 days'],
    color: 'var(--accent-green)',
  },
];

const FlowMap = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="flowmap" className="section">
      <div className="container">
        <h2 className="section-title scroll-animate">Election <span className="text-gradient">Flow Map</span></h2>
        <p className="section-subtitle scroll-animate">A visual journey through the complete Indian election process — from registration to results</p>

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical Line */}
          <div style={{
            position: 'absolute', left: '28px', top: '0', bottom: '0', width: '2px',
            background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-saffron), var(--accent-green))',
            opacity: 0.3
          }} />

          {flowSteps.map((step, idx) => (
            <div key={step.id} className="scroll-animate" style={{
              display: 'flex', gap: '1.5rem', marginBottom: '1.5rem',
              cursor: 'pointer', position: 'relative',
              animationDelay: `${idx * 0.1}s`
            }} onClick={() => setActiveStep(activeStep === idx ? null : idx)}>
              {/* Icon Circle */}
              <div style={{
                width: '56px', height: '56px', minWidth: '56px', borderRadius: '50%',
                background: activeStep === idx ? step.color : 'var(--bg-secondary)',
                border: `2px solid ${activeStep === idx ? step.color : 'var(--glass-border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', transition: 'var(--transition)', zIndex: 1,
                boxShadow: activeStep === idx ? `0 0 20px ${step.color}40` : 'none'
              }}>
                {step.icon}
              </div>

              {/* Content */}
              <div className="glass" style={{
                flex: 1, padding: '1.5rem',
                borderLeft: activeStep === idx ? `3px solid ${step.color}` : '3px solid transparent',
                transition: 'var(--transition)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="tag" style={{
                    background: `${step.color}15`, color: step.color,
                    border: `1px solid ${step.color}30`
                  }}>
                    Step {step.id}
                  </span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', transition: 'var(--transition)', transform: activeStep === idx ? 'rotate(90deg)' : 'rotate(0)' }}>
                    ▸
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>{step.description}</p>

                {activeStep === idx && (
                  <div className="animate-fade-in" style={{
                    marginTop: '1rem', paddingTop: '1rem',
                    borderTop: '1px solid var(--glass-border)'
                  }}>
                    <h5 style={{ color: step.color, marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Details</h5>
                    {step.details.map((d, di) => (
                      <div key={di} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                        marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)'
                      }}>
                        <span style={{ color: step.color, marginTop: '0.15rem' }}>●</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlowMap;
