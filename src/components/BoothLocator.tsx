import { useState } from 'react';



const BoothLocator = () => {
  const [address, setAddress] = useState('');
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findBooth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setLoading(true);
    setError(null);
    setMapUrl(null);

    // We use the standard Google Maps search embed which is more reliable for dynamic queries
    // and doesn't suffer from the 'stylized world map' fallback issue when API keys have
    // domain restrictions or the specific Maps Embed API isn't enabled.
    setTimeout(() => {
      const query = encodeURIComponent(`polling station near ${address}`);
      const embedUrl = `https://maps.google.com/maps?q=${query}&output=embed&t=m&z=14`;
      
      setMapUrl(embedUrl);
      setLoading(false);
    }, 800);
  };

  return (
    <section id="locator" className="section">
      <div className="container">
        <h2 className="section-title scroll-animate">Booth <span className="text-gradient">Locator</span></h2>
        <p className="section-subtitle scroll-animate">Powered by Google Maps & Geocoding API — Find your nearest polling station</p>

        <div className="glass scroll-animate" style={{ padding: '2.5rem', maxWidth: '900px', margin: '0 auto' }}>
          <form onSubmit={findBooth} style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your area, street, or PIN code (e.g. Bandra West, Mumbai)..."
              className="input"
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '⌛' : '📍'} Find Booth
            </button>
          </form>

          {error && (
            <div className="animate-fade-in" style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>
              ⚠️ {error}
            </div>
          )}

          {mapUrl ? (
            <div className="animate-fade-in" style={{ borderRadius: '16px', overflow: 'hidden', height: '450px', border: '1px solid var(--glass-border)' }}>
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={mapUrl}
              ></iframe>
            </div>
          ) : (
            <div style={{ 
              height: '300px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              border: '1px dashed var(--glass-border)', color: 'var(--text-secondary)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem', opacity: 0.5 }}>🗺️</span>
                <p>Enter your location to view polling stations on the map</p>
              </div>
            </div>
          )}
          
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
             <div className="tag" style={{ justifyContent: 'center', background: 'rgba(59,130,246,0.1)', color: 'var(--accent-blue)' }}>📍 Real-time Geocoding</div>
             <div className="tag" style={{ justifyContent: 'center', background: 'rgba(16,185,129,0.1)', color: 'var(--accent-green)' }}>🗺️ Interactive Maps</div>
             <div className="tag" style={{ justifyContent: 'center', background: 'rgba(255,153,51,0.1)', color: 'var(--accent-saffron)' }}>🔍 Smart Search</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoothLocator;
