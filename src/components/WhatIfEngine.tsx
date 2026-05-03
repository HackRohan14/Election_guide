import { useState } from 'react';

interface ScenarioResult {
  immediate: string;
  shortTerm: string;
  legal: string;
  tip: string;
}

const predefinedScenarios: Record<string, ScenarioResult> = {
  'voter id': {
    immediate: 'You can still vote! The Election Commission of India accepts 12 alternative photo IDs including Aadhaar Card, Passport, Driving License, PAN Card, MNREGA Job Card, Health Insurance Smart Card, and more.',
    shortTerm: 'Apply for a duplicate EPIC card immediately via the NVSP portal (nvsp.in) or your nearest ERO office. Processing takes 15-30 days.',
    legal: 'Under Section 62 of the Representation of the People Act, 1951, every registered voter has the right to vote. Loss of EPIC does not disqualify you. However, you must prove your identity through an alternative document.',
    tip: 'Download the Voter Helpline App and save a digital copy of your EPIC. You can also check your details on electoralsearch.eci.gov.in.'
  },
  'booth captured': {
    immediate: 'Leave the area safely. Call 1950 (Voter Helpline) or 112 (Emergency) immediately. Do NOT confront the perpetrators.',
    shortTerm: 'The Election Commission can order a re-poll at that booth under Section 58A of the RPA 1951. Security forces (CAPF) will be deployed for the re-poll.',
    legal: 'Booth capturing is a cognizable offense under Section 135A of the RPA 1951, punishable by 1-3 years imprisonment and fine. If armed, the punishment extends to 3-5 years.',
    tip: 'Record evidence if safe to do so. Use the cVIGIL app by ECI to report election violations with geo-tagged photos/videos.'
  },
  'threatened': {
    immediate: 'Your vote is SECRET. No one — not even the government — can find out who you voted for. The EVM does not record any link between your identity and your vote. Vote freely.',
    shortTerm: 'File a complaint with the Returning Officer and local police. You can also use the cVIGIL app to report threats anonymously with photo/video evidence.',
    legal: 'Voter intimidation is punishable under Section 171C of IPC (undue influence at elections) with imprisonment up to 1 year, fine, or both. Under Section 135 of RPA 1951, it is a specific electoral offense.',
    tip: 'Remember: The ballot is secret under Article 19 of the Constitution. VVPAT slips are destroyed after 7 seconds. No one can trace your vote.'
  },
  'wrong constituency': {
    immediate: 'You can only vote in the constituency where you are registered. Check your constituency on electoralsearch.eci.gov.in or the Voter Helpline App.',
    shortTerm: 'If you have moved, file Form 6A (migration form) on the NVSP portal to shift your registration to your current address. This must be done before the electoral roll revision deadline.',
    legal: 'Voting in the wrong constituency or attempting to vote using someone else\'s registration is an offense under Section 171D of IPC (personation at elections), punishable by imprisonment up to 1 year or fine.',
    tip: 'Many states now allow online Form 6A submission. Start the process early — revision of rolls happens twice a year (January 1 and July 1 qualifying dates).'
  },
  'disability': {
    immediate: 'Under ECI guidelines, voters with disabilities can bring a companion (above 18 years) to assist them in the polling booth. Wheelchairs must be provided at every booth.',
    shortTerm: 'Request the Booth Level Officer (BLO) to arrange home voting facility if you are bedridden. Apply at least 5 days before polling day.',
    legal: 'The Rights of Persons with Disabilities Act, 2016 (Section 11) mandates that the ECI ensure all polling stations are accessible. Braille-enabled EVMs and ramps are mandatory provisions.',
    tip: 'Voters with visual impairments can request a Braille ballot slip or use the companion-assisted voting provision under Rule 49N of the Conduct of Elections Rules.'
  },
  'nri': {
    immediate: 'NRIs can vote in Indian elections! You must be registered as an overseas elector in the constituency mentioned in your passport.',
    shortTerm: 'Register using Form 6A on the NVSP portal with your passport details. Currently, NRIs must physically visit their constituency to vote — postal ballots for NRIs are under consideration.',
    legal: 'The Representation of the People (Amendment) Act, 2010 granted voting rights to overseas Indians. However, you cannot appoint a proxy — you must vote in person at your designated polling booth.',
    tip: 'Track the "e-Postal Ballot for NRIs" bill in Parliament, which may soon allow NRIs to vote via electronically transmitted postal ballots.'
  }
};

const WhatIfEngine = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<ScenarioResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  const quickScenarios = [
    { label: '🪪 Lost Voter ID', query: 'voter id' },
    { label: '🏚️ Booth Captured', query: 'booth captured' },
    { label: '😰 Being Threatened', query: 'threatened' },
    { label: '🗺️ Wrong Constituency', query: 'wrong constituency' },
    { label: '♿ Disability Access', query: 'disability' },
    { label: '✈️ NRI Voting', query: 'nri' },
  ];

  const analyzeScenario = (input: string) => {
    setAnalyzing(true);
    setResult(null);
    setNoMatch(false);

    setTimeout(() => {
      const lower = input.toLowerCase();
      let matched: ScenarioResult | null = null;

      for (const [key, val] of Object.entries(predefinedScenarios)) {
        if (lower.includes(key)) {
          matched = val;
          break;
        }
      }

      // Fuzzy matching
      if (!matched) {
        if (lower.includes('id') || lower.includes('card') || lower.includes('epic') || lower.includes('lost') || lower.includes('forget')) {
          matched = predefinedScenarios['voter id'];
        } else if (lower.includes('booth') || lower.includes('capture') || lower.includes('violence')) {
          matched = predefinedScenarios['booth captured'];
        } else if (lower.includes('threat') || lower.includes('force') || lower.includes('pressure') || lower.includes('bribe')) {
          matched = predefinedScenarios['threatened'];
        } else if (lower.includes('move') || lower.includes('shift') || lower.includes('different') || lower.includes('constituency') || lower.includes('address')) {
          matched = predefinedScenarios['wrong constituency'];
        } else if (lower.includes('blind') || lower.includes('disab') || lower.includes('wheelchair') || lower.includes('handicap')) {
          matched = predefinedScenarios['disability'];
        } else if (lower.includes('abroad') || lower.includes('nri') || lower.includes('overseas') || lower.includes('foreign')) {
          matched = predefinedScenarios['nri'];
        }
      }

      if (matched) {
        setResult(matched);
      } else {
        setNoMatch(true);
      }
      setAnalyzing(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) analyzeScenario(query);
  };

  return (
    <section id="whatif" className="section">
      <div className="container">
        <h2 className="section-title scroll-animate">"What-If" <span className="text-gradient">Scenario Engine</span></h2>
        <p className="section-subtitle scroll-animate">Analyze hypothetical election situations and get immediate legal and practical guidance</p>

        <div className="glass scroll-animate" style={{ padding: '2.5rem', maxWidth: '800px', margin: '0 auto' }}>
          {/* Quick Scenarios */}
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Scenarios</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {quickScenarios.map(s => (
              <button key={s.query} onClick={() => { setQuery(s.label.slice(2).trim()); analyzeScenario(s.query); }}
                className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                {s.label}
              </button>
            ))}
          </div>

          {/* Custom Query */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
            <input
              type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder='Try: "What if I lose my voter ID on election day?"'
              className="input" style={{ flex: 1 }}
              aria-label="Enter a what-if scenario"
            />
            <button type="submit" className="btn btn-primary" disabled={analyzing}>
              {analyzing ? '⏳' : '🔮'} Analyze
            </button>
          </form>

          {/* Loading */}
          {analyzing && (
            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '2rem', animation: 'pulse 1s infinite', marginBottom: '0.5rem' }}>🧠</div>
              <p style={{ color: 'var(--text-secondary)' }}>AI is analyzing your scenario...</p>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '⚡', title: 'Immediate Action', text: result.immediate, color: 'var(--accent-saffron)', borderColor: 'rgba(255,153,51,0.3)' },
                { icon: '📅', title: 'Short-Term Steps', text: result.shortTerm, color: 'var(--accent-blue)', borderColor: 'rgba(59,130,246,0.3)' },
                { icon: '⚖️', title: 'Legal Framework', text: result.legal, color: 'var(--accent-secondary)', borderColor: 'rgba(167,139,250,0.3)' },
                { icon: '💡', title: 'Pro Tip', text: result.tip, color: 'var(--accent-green)', borderColor: 'rgba(16,185,129,0.3)' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '1.5rem', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.02)',
                  borderLeft: `3px solid ${item.borderColor}`,
                  animation: `slideIn 0.4s ease ${i * 0.1}s both`
                }}>
                  <h4 style={{ color: item.color, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{item.icon}</span> {item.title}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.8' }}>{item.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* No Match */}
          {noMatch && (
            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
              <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤔</p>
              <p style={{ color: 'var(--text-secondary)' }}>I don't have data for this specific scenario yet. Try one of the quick scenarios above, or rephrase your question using keywords like "voter ID", "booth", "threat", "disability", or "NRI".</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhatIfEngine;
