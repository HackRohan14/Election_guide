import { useEffect, useState } from 'react';

const VideoEducation = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiKey = import.meta.env.VITE_GCP_API_KEY;
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=how+US+elections+work+explained&type=video&key=${apiKey}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error?.message || "YouTube API not enabled");
        }
        setVideos(data.items || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <section id="videos" className="section scroll-animate">
      <h2 className="section-title">Election <span className="text-gradient">Video Lessons</span></h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
        Learn exactly how the process works with these dynamic video lessons fetched instantly via Google Cloud's YouTube Data API.
      </p>
      <div className="cards-grid">
        {loading ? (
          <div className="glass" style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Loading educational videos from YouTube...</p>
          </div>
        ) : error ? (
          <div className="glass" style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1', borderLeft: '4px solid #ef4444' }}>
            <h4 style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '1.25rem' }}>YouTube Integration Pending</h4>
            <p style={{ color: 'var(--text-secondary)' }}>To see live educational videos, please enable the <strong>YouTube Data API v3</strong> in your Google Cloud Console.</p>
          </div>
        ) : (
          videos.map((vid) => (
            <div key={vid.id.videoId} className="method-card glass" style={{ padding: 0, overflow: 'hidden' }}>
              <iframe 
                width="100%" 
                height="200" 
                src={`https://www.youtube.com/embed/${vid.id.videoId}`} 
                title={vid.snippet.title} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{vid.snippet.title.replace(/&quot;/g, '"').replace(/&#39;/g, "'")}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{vid.snippet.channelTitle}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default VideoEducation;
