import { useEffect } from 'react';
import './App.css';
import DigitalTwinProfile from './components/DigitalTwinProfile';
import ElectionSimulator from './components/ElectionSimulator';
import KnowYourCandidates from './components/KnowYourCandidates';
import WhatIfEngine from './components/WhatIfEngine';
import FlowMap from './components/FlowMap';
import AIChatAssistant from './components/AIChatAssistant';

function App() {
  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: '👤', title: 'Digital Twin Profile', desc: 'AI-driven wizard analyzes your profile to generate a personalized Election Journey checklist.', href: '#profile', color: 'var(--accent-primary)' },
    { icon: '🎮', title: 'Election Simulator', desc: 'Navigate real-world voting scenarios in a gamified environment. Learn by doing.', href: '#simulator', color: 'var(--accent-saffron)' },
    { icon: '🔍', title: 'Know Your Candidates', desc: 'Explore backgrounds, assets, criminal records, and campaign promises of every candidate.', href: '#candidates', color: 'var(--accent-green)' },
    { icon: '🔮', title: 'What-If Engine', desc: 'Analyze hypothetical situations and get instant legal and practical guidance.', href: '#whatif', color: 'var(--accent-secondary)' },
    { icon: '🗺️', title: 'Election Flow Map', desc: 'Visual step-by-step journey through the complete Indian election process.', href: '#flowmap', color: 'var(--accent-blue)' },
    { icon: '🤖', title: 'AI Chat Assistant', desc: 'Context-aware chatbot trained on Indian electoral laws. Ask anything, anytime.', href: '#', color: '#ef4444' },
  ];

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar glass" role="navigation" aria-label="Main navigation">
        <div className="nav-brand">
          <div className="nav-brand-icon" aria-hidden="true">🗳️</div>
          <span>Vote<span className="text-gradient">Wise</span></span>
        </div>
        <div className="nav-links">
          <a href="#profile" className="nav-link">Profile</a>
          <a href="#simulator" className="nav-link">Simulator</a>
          <a href="#candidates" className="nav-link">Candidates</a>
          <a href="#whatif" className="nav-link">What-If</a>
          <a href="#flowmap" className="nav-link">Flow Map</a>
          <a href="#profile" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', textDecoration: 'none', fontSize: '0.85rem' }}>
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-badge animate-fade-in">
          <span aria-hidden="true">🇮🇳</span> India's AI-Powered Election Education Platform
        </div>
        <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Your Vote. Your Voice.<br /><span className="text-gradient">Your Power.</span>
        </h1>
        <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
          An interactive, gamified platform that transforms complex electoral processes into
          an engaging and personalized experience for every Indian citizen.
        </p>
        <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <a href="#profile" className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.9rem 2rem', fontSize: '1rem' }}>
            🚀 Start Your Journey
          </a>
          <a href="#flowmap" className="btn btn-secondary" style={{ textDecoration: 'none', padding: '0.9rem 2rem', fontSize: '1rem' }}>
            🗺️ Explore Flow Map
          </a>
        </div>

        {/* Stats */}
        <div className="stats-bar animate-fade-in" style={{ animationDelay: '0.5s', marginTop: '3rem' }}>
          <div className="stat-item">
            <p className="stat-value text-gradient">96.8 Cr</p>
            <p className="stat-label">Registered Voters</p>
          </div>
          <div className="stat-item">
            <p className="stat-value" style={{ color: 'var(--accent-saffron)' }}>543</p>
            <p className="stat-label">Lok Sabha Seats</p>
          </div>
          <div className="stat-item">
            <p className="stat-value" style={{ color: 'var(--accent-green)' }}>28+8</p>
            <p className="stat-label">States & UTs</p>
          </div>
          <div className="stat-item">
            <p className="stat-value" style={{ color: 'var(--accent-secondary)' }}>10.5L</p>
            <p className="stat-label">Polling Stations</p>
          </div>
        </div>
      </header>

      {/* Feature Cards */}
      <div className="container">
        <section className="section">
          <h2 className="section-title scroll-animate">Explore <span className="text-gradient">VoteWise</span></h2>
          <p className="section-subtitle scroll-animate">Six powerful tools designed to make you an informed, empowered voter</p>

          <div className="features-grid">
            {features.map((f, i) => (
              <a key={i} href={f.href} className="feature-card glass scroll-animate" style={{ textDecoration: 'none', animationDelay: `${i * 0.1}s` }}>
                <div className="feature-icon" style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                  <span aria-hidden="true">{f.icon}</span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* All Sections */}
      <div className="container">
        <DigitalTwinProfile />
        <ElectionSimulator />
        <KnowYourCandidates />
        <WhatIfEngine />
        <FlowMap />
      </div>

      {/* AI Chat Assistant */}
      <AIChatAssistant />

      {/* Footer */}
      <footer className="footer">
        <p style={{ marginBottom: '0.5rem' }}>
          <strong>VoteWise</strong> — An AI-powered election education platform
        </p>
        <p>
          Data is AI-generated for demonstration purposes.
          For official information, visit <a href="https://eci.gov.in" target="_blank" rel="noreferrer">eci.gov.in</a>
        </p>
        <p style={{ marginTop: '1rem', opacity: 0.5 }}>
          Built with ❤️ for Indian Democracy • © 2026
        </p>
      </footer>
    </div>
  );
}

export default App;
