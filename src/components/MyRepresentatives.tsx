import { useState } from 'react';

const API_KEY = import.meta.env.VITE_GCP_API_KEY;

interface Official {
  name: string;
  title: string;
  party: string;
  photoUrl?: string;
  urls?: string[];
  phones?: string[];
  emails?: string[];
}

const MyRepresentatives = () => {
  const [address, setAddress] = useState('');
  const [officials, setOfficials] = useState<Official[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRepresentatives = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setLoading(true);
    setError(null);
    setOfficials([]);

    try {
      const response = await fetch(
        `https://www.googleapis.com/civicinfo/v2/representatives?address=${encodeURIComponent(address)}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'Failed to fetch representative data.');
      }

      if (!data.officials || data.officials.length === 0) {
        throw new Error('No representative data found for this location.');
      }

      // Map offices to officials
      const mappedOfficials: Official[] = [];
      data.offices.forEach((office: any) => {
        office.officialIndices.forEach((index: number) => {
          const official = data.officials[index];
          mappedOfficials.push({
            name: official.name,
            title: office.name,
            party: official.party || 'Independent / Unknown',
            photoUrl: official.photoUrl,
            urls: official.urls,
            phones: official.phones,
            emails: official.emails,
          });
        });
      });

      setOfficials(mappedOfficials);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="representatives" className="section">
      <div className="container">
        <h2 className="section-title scroll-animate">My <span className="text-gradient">Representatives</span></h2>
        <p className="section-subtitle scroll-animate">Powered by Google Civic Information API — Real-time data on your elected officials</p>

        <div className="glass scroll-animate" style={{ padding: '2.5rem', maxWidth: '1000px', margin: '0 auto' }}>
          <form onSubmit={fetchRepresentatives} style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem' }}>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your City or Address (e.g. Mumbai, Bangalore)..."
              className="input"
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '⌛' : '🔍'} Fetch Data
            </button>
          </form>

          {error && (
            <div className="animate-fade-in" style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1.5rem' }}>
              ⚠️ {error}
            </div>
          )}

          {loading && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="dot-pulse" style={{ margin: '0 auto' }}></div>
              <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Querying Google Civic Database...</p>
            </div>
          )}

          <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {officials.map((off, idx) => (
              <div key={idx} className="glass animate-fade-in" style={{ 
                padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem',
                border: '1px solid rgba(255,255,255,0.05)',
                animationDelay: `${idx * 0.1}s`
              }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ 
                    width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', 
                    background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {off.photoUrl ? (
                      <img src={off.photoUrl} alt={off.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: '1.5rem' }}>👤</span>
                    )}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{off.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--accent-saffron)', fontWeight: 600 }}>{off.title}</p>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ opacity: 0.6 }}>Party</span>
                    <span>{off.party}</span>
                  </div>
                  {off.phones && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ opacity: 0.6 }}>Phone</span>
                      <a href={`tel:${off.phones[0]}`} style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>{off.phones[0]}</a>
                    </div>
                  )}
                  {off.emails && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ opacity: 0.6 }}>Email</span>
                      <a href={`mailto:${off.emails[0]}`} style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>{off.emails[0]}</a>
                    </div>
                  )}
                </div>

                {off.urls && (
                  <a href={off.urls[0]} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ 
                    fontSize: '0.8rem', padding: '0.4rem', textDecoration: 'none', textAlign: 'center' 
                  }}>
                    🌐 Visit Website
                  </a>
                )}
              </div>
            ))}
          </div>

          {!loading && officials.length === 0 && !error && (
            <div style={{ textAlign: 'center', opacity: 0.5, padding: '2rem' }}>
              <p>Results will appear here. Note: Data coverage varies by region.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyRepresentatives;
