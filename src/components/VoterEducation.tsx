import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_GCP_API_KEY;

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

const VoterEducation = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Fetch videos related to Indian Voter Awareness from ECI or similar official sources
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=Election+Commission+of+India+Voter+Awareness&type=video&key=${API_KEY}`
        );
        const data = await response.json();
        
        const mappedVideos = data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          channelTitle: item.snippet.channelTitle,
        }));
        
        setVideos(mappedVideos);
      } catch (error) {
        console.error('YouTube API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section id="education" className="section">
      <div className="container">
        <h2 className="section-title scroll-animate">Voter <span className="text-gradient">Education</span></h2>
        <p className="section-subtitle scroll-animate">Powered by YouTube Data API — Official tutorials and awareness videos from ECI</p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="dot-pulse" style={{ margin: '0 auto' }}></div>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Fetching latest videos...</p>
          </div>
        ) : (
          <div className="card-grid">
            {videos.map((video, idx) => (
              <div key={video.id} className="glass scroll-animate" style={{ 
                padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                animationDelay: `${idx * 0.1}s`
              }}>
                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                  <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div style={{ padding: '1.2rem' }}>
                  <h4 style={{ fontSize: '0.95rem', lineHeight: '1.4', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {video.title}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--accent-saffron)', fontWeight: 600 }}>{video.channelTitle}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VoterEducation;
