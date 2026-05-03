import { useState } from 'react';

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const terms = [
    { term: "Absentee Ballot", def: "A ballot completed and typically mailed in advance of an election by a voter who is unable to be present at the polls." },
    { term: "Ballot Initiative", def: "A means by which a petition signed by a certain minimum number of registered voters can force a public vote." },
    { term: "Caucus", def: "A meeting of supporters or members of a specific political party or movement." },
    { term: "Delegate", def: "A person sent or authorized to represent others, in particular an elected representative sent to a conference." },
    { term: "Electoral College", def: "A body of electors established by the US Constitution, which forms every four years for the sole purpose of electing the president and vice president." },
    { term: "Filibuster", def: "An action such as a prolonged speech that obstructs progress in a legislative assembly while not technically contravening the required procedures." },
    { term: "Gerrymandering", def: "To manipulate the boundaries of an electoral constituency so as to favor one party or class." },
    { term: "Incumbent", def: "The current holder of an office or post." },
    { term: "Midterm Election", def: "General elections in the US that are held near the midpoint of a president's four-year term of office." },
    { term: "PAC (Political Action Committee)", def: "An organization that raises money privately to influence elections or legislation, especially at the federal level." },
  ];

  const filtered = terms.filter(t => t.term.toLowerCase().includes(searchTerm.toLowerCase()) || t.def.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <section id="glossary" className="section scroll-animate">
      <h2 className="section-title">Election <span className="text-gradient">Glossary</span></h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Search and learn important political terms to better understand the election cycle.</p>
      
      <div className="glass" style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem' }}>
        <input 
          type="text" 
          placeholder="Search for a term (e.g. Caucus, Delegate)..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="api-input"
          aria-label="Search Glossary Terms"
          style={{ width: '100%', marginBottom: '2rem' }}
        />
        
        <div style={{ display: 'grid', gap: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' }} role="list">
          {filtered.length > 0 ? filtered.map((item, i) => (
            <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }} role="listitem">
              <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{item.term}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.def}</p>
            </div>
          )) : (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }} role="status">No terms found matching your search.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Glossary;
