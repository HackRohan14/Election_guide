import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const ApiSection = ({ addressQuery, setAddressQuery }: { addressQuery: string, setAddressQuery: (q: string) => void }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchElectionData = async (queryToFetch: string) => {
    if (!queryToFetch) return;
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const apiKey = import.meta.env.VITE_GCP_API_KEY;
      const apiEndpoint = `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${encodeURIComponent(queryToFetch)}&electionId=2000&key=${apiKey}`;
      
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error?.message || 'Unknown error occurred. Try a US City or ZIP code.');
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchElectionData(addressQuery);
  };

  const handleLocate = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported by your browser.");
    
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const apiKey = import.meta.env.VITE_GCP_API_KEY;
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&key=${apiKey}`);
        const geoData = await res.json();
        
        if (geoData.status === 'OK' && geoData.results[0]) {
          const newAddress = geoData.results[0].formatted_address;
          setAddressQuery(newAddress);
          fetchElectionData(newAddress);
        } else {
          alert("Geocoding API Failed: " + (geoData.error_message || geoData.status) + "\\n\\nPlease make sure you have enabled the 'Geocoding API' in your Google Cloud Console.");
          setLoading(false);
        }
      } catch (e: any) {
        alert("Error fetching location data: " + e.message);
        setLoading(false);
      }
    }, (err) => {
      alert("Location access denied: " + err.message);
      setLoading(false);
    });
  };

  const renderResult = () => {
    if (error) {
      return (
        <div className="result-card animate-fade-in" style={{ borderLeftColor: '#ef4444' }}>
          <h4>Error Fetching Data</h4>
          <p style={{ color: '#ef4444' }}>{error}</p>
        </div>
      );
    }

    if (!result) return null;

    const stateData = result.state?.[0]?.electionAdministrationBody;
    const electionName = result.election?.name || 'Upcoming Election';
    const locQuery = encodeURIComponent(result.normalizedInput ? `${result.normalizedInput.city}, ${result.normalizedInput.state}` : addressQuery);
    const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(electionName)}&dates=20261103T140000Z/20261103T230000Z&details=${encodeURIComponent('Vote in the upcoming election! Remember to check your polling place.')}&location=${locQuery}`;
    const apiKey = import.meta.env.VITE_GCP_API_KEY;

    return (
      <div className="result-card animate-fade-in">
        <h4>Voter Info for: {result.normalizedInput ? `${result.normalizedInput.city}, ${result.normalizedInput.state || ''}` : addressQuery}</h4>
        <p style={{ color: 'var(--accent-secondary)', fontWeight: 'bold', marginBottom: '1rem' }}>{electionName}</p>
        
        <div style={{ marginTop: '1rem' }}>
          {stateData ? (
            <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>{stateData.name || 'Election Board'}</strong><br/>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                {stateData.electionRegistrationUrl && <a href={stateData.electionRegistrationUrl} target="_blank" rel="noreferrer" style={{ color: '#60a5fa' }}>Register to Vote</a>}
                {stateData.votingLocationFinderUrl && <a href={stateData.votingLocationFinderUrl} target="_blank" rel="noreferrer" style={{ color: '#60a5fa' }}>Find Polling Location</a>}
                {stateData.absenteeVotingInfoUrl && <a href={stateData.absenteeVotingInfoUrl} target="_blank" rel="noreferrer" style={{ color: '#60a5fa' }}>Absentee Voting Info</a>}
                {stateData.ballotInfoUrl && <a href={stateData.ballotInfoUrl} target="_blank" rel="noreferrer" style={{ color: '#60a5fa' }}>View Sample Ballot</a>}
              </div>
            </div>
          ) : (
            <p>No state election board data found for this location.</p>
          )}
        </div>
        
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
          <a href={calendarLink} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>📅 Add to Calendar</a>
          <button type="button" className="btn btn-secondary" onClick={() => window.print()} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>🖨️ Print Voter Info</button>
        </div>
        
        <div style={{ marginTop: '1.5rem' }}>
          <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>Interactive Map Context</h5>
          <iframe
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: '12px', background: 'rgba(0,0,0,0.2)' }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${locQuery}`}
          ></iframe>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Map provided by Google Maps Embed API. If the map shows an error, please enable the Maps Embed API in your GCP Console.
          </p>
        </div>
        
        <p className="success-msg">Data successfully retrieved from Google Civic Information API!</p>
      </div>
    );
  };

  return (
    <section id="data-search" className="section scroll-animate">
      <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Check Election Data</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Query the GCP REST API to fetch localized election data, timelines, and representative information securely using your provided API key.
        </p>
        
        <form className="api-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="text" 
              name="query" 
              id="address-input"
              value={addressQuery}
              onChange={(e) => setAddressQuery(e.target.value)}
              placeholder="Enter your state or ZIP code..." 
              className="api-input"
              aria-label="Address or ZIP code"
              required 
            />
            <button type="button" className="btn btn-secondary" onClick={handleLocate} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 1rem' }} aria-label="Auto-Locate GPS">
              <MapPin size={18} /> {loading ? 'Locating...' : 'Locate'}
            </button>
            <button type="submit" className="btn btn-primary" id="fetch-btn" disabled={loading} aria-label="Fetch Election Data">
              {loading ? 'Processing...' : 'Fetch Data'}
            </button>
          </div>
        </form>
        
        <div style={{ marginTop: '2rem', textAlign: 'left' }}>
          {renderResult()}
        </div>
      </div>
    </section>
  );
};

export default ApiSection;
