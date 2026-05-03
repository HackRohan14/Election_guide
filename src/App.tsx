import { useEffect, useState } from 'react';
import './App.css';
import DigitalTwinProfile from './components/DigitalTwinProfile';
import ElectionSimulator from './components/ElectionSimulator';
import KnowYourCandidates from './components/KnowYourCandidates';
import WhatIfEngine from './components/WhatIfEngine';
import FlowMap from './components/FlowMap';
import AIChatAssistant from './components/AIChatAssistant';
import VoterEducation from './components/VoterEducation';
import BoothLocator from './components/BoothLocator';
import { languages } from './utils/translation';

function App() {
  const [lang, setLang] = useState('en');

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
    { icon: '👤', title: 'Digital Twin Profile', desc: 'AI-driven wizard for your personalized Election Journey.', href: '#profile', color: 'var(--accent-primary)' },
    { icon: '🎮', title: 'Election Simulator', desc: 'Navigate real-world voting scenarios in a gamified environment.', href: '#simulator', color: 'var(--accent-saffron)' },
    { icon: '📍', title: 'Booth Locator', desc: 'Find your nearest polling station using Google Maps.', href: '#locator', color: 'var(--accent-blue)' },
    { icon: '📺', title: 'Voter Education', desc: 'Official ECI tutorials and awareness videos via YouTube API.', href: '#education', color: '#ef4444' },
    { icon: '🔍', title: 'Know Your Candidates', desc: 'Explore backgrounds and records of every candidate.', href: '#candidates', color: 'var(--accent-green)' },
    { icon: '🤖', title: 'Gemini AI Assistant', desc: 'Context-aware chatbot powered by Google Gemini 1.5 Flash.', href: '#', color: 'var(--accent-secondary)' },
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
          <a href="#locator" className="nav-link">Maps</a>
          <a href="#education" className="nav-link">Videos</a>
          <a href="#candidates" className="nav-link">Candidates</a>
          
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="input"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', width: 'auto', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
          >
            {languages.map(l => (
              <option key={l.code} value={l.code} style={{ background: '#0a0e1a' }}>{l.flag} {l.name}</option>
            ))}
          </select>

          <a href="#profile" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', textDecoration: 'none', fontSize: '0.85rem' }}>
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-badge animate-fade-in">
          <span aria-hidden="true">🇮🇳</span> India's Most Powerful GCP-Integrated Election Platform
        </div>
        <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Your Vote. Your Voice.<br /><span className="text-gradient">Your Power.</span>
        </h1>
        <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
          An advanced, multi-service platform integrating Google Gemini AI, Maps, YouTube, and Cloud Translation
           to empower 96.8 Crore Indian voters with real-time intelligence.
        </p>
        <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <a href="#profile" className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.9rem 2rem', fontSize: '1rem' }}>
            🚀 Start AI Journey
          </a>
          <a href="#locator" className="btn btn-secondary" style={{ textDecoration: 'none', padding: '0.9rem 2rem', fontSize: '1rem' }}>
            📍 Find Booth
          </a>
        </div>

        {/* Cloud Stats */}
        <div className="stats-bar animate-fade-in" style={{ animationDelay: '0.5s', marginTop: '3rem' }}>
          <div className="stat-item">
            <p className="stat-value text-gradient">Gemini 1.5</p>
            <p className="stat-label">AI Reasoning</p>
          </div>
          <div className="stat-item">
            <p className="stat-value" style={{ color: 'var(--accent-blue)' }}>Maps API</p>
            <p className="stat-label">Geocoding</p>
          </div>
          <div className="stat-item">
            <p className="stat-value" style={{ color: 'var(--accent-green)' }}>YouTube v3</p>
            <p className="stat-label">Official Data</p>
          </div>
          <div className="stat-item">
            <p className="stat-value" style={{ color: 'var(--accent-saffron)' }}>Cloud Translate</p>
            <p className="stat-label">Multilingual</p>
          </div>
        </div>
      </header>

      {/* Feature Cards */}
      <div className="container">
        <section className="section">
          <h2 className="section-title scroll-animate">GCP <span className="text-gradient">Cloud Stack</span></h2>
          <p className="section-subtitle scroll-animate">Leveraging the full power of Google Cloud Platform for Indian Democracy</p>

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
        <BoothLocator />
        <VoterEducation />
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
          <strong>VoteWise</strong> — Advanced GCP Civic Platform
        </p>
        <p>
          Powered by Gemini 1.5 Flash, Google Maps, and YouTube Data API.
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
