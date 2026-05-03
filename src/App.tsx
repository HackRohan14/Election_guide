import { useEffect, useState } from 'react';
import { 
  Vote, 
  Users, 
  Calendar, 
  CheckCircle, 
  Award,
  ChevronRight,
  Mail,
  MapPin,
  FileText
} from 'lucide-react';
import './App.css';
import Countdown from './components/Countdown';
import QuizSection from './components/QuizSection';
import VideoEducation from './components/VideoEducation';
import ElectionAssistantChat from './components/ElectionAssistantChat';
import Glossary from './components/Glossary';
import ApiSection from './components/ApiSection';

function App() {
  const [addressQuery, setAddressQuery] = useState('');
  
  // Simple intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container">
      {/* Navigation */}
      <header className="header glass" style={{ padding: '1rem 2rem', borderRadius: '15px', marginBottom: '2rem', marginTop: '1rem', position: 'sticky', top: '1rem', zIndex: 100 }}>
        <div className="logo">
          <Vote style={{ color: 'var(--accent-primary)' }} />
          <span>Election<span className="text-gradient">Guide</span></span>
        </div>
        <div className="nav-links" style={{ alignItems: 'center' }}>
          <a href="#timeline" className="nav-link">Timeline</a>
          <a href="#methods" className="nav-link">Methods</a>
          <a href="#videos" className="nav-link">Videos</a>
          <a href="#quiz" className="nav-link">Quiz</a>
          <a href="#faq" className="nav-link">FAQ</a>
          <a href="#glossary" className="nav-link">Glossary</a>
          <a href="#data-search" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', textDecoration: 'none', marginLeft: '0.5rem' }}>Get Data</a>
        </div>
      </header>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in">
            Understand Your <span className="text-gradient">Election Process</span>
          </h1>
          <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
            A premium, interactive guide to the United States electoral system. 
            Track the timeline, test your knowledge, and find your local voter data instantly.
          </p>
          <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a href="#timeline" className="btn btn-primary">Explore Timeline</a>
            <a href="#data-search" className="btn btn-secondary">Check Your Data</a>
          </div>
        </div>
        
        <Countdown />
      </header>

      {/* Main Content */}
      <div className="container">
        
        {/* Timeline Section */}
        <section id="timeline" className="section">
          <h2 className="section-title scroll-animate">The Election <span className="text-gradient">Lifecycle</span></h2>
          
          <div className="timeline">
            {/* Step 1 */}
            <div className="timeline-item scroll-animate">
              <div className="timeline-icon">
                <Users size={24} />
              </div>
              <div className="timeline-content glass">
                <div className="timeline-date">Phase 1: Preparation</div>
                <h3 className="timeline-title">Primaries & Caucuses</h3>
                <p className="timeline-desc">
                  Voters across the states choose their preferred candidates for a political party's nomination.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="timeline-item scroll-animate">
              <div className="timeline-icon">
                <FileText size={24} />
              </div>
              <div className="timeline-content glass">
                <div className="timeline-date">Phase 2: Conventions</div>
                <h3 className="timeline-title">National Conventions</h3>
                <p className="timeline-desc">
                  Parties hold national conventions to finalize their choice for presidential and vice-presidential nominees.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="timeline-item scroll-animate">
              <div className="timeline-icon">
                <Calendar size={24} />
              </div>
              <div className="timeline-content glass">
                <div className="timeline-date">Phase 3: The Big Day</div>
                <h3 className="timeline-title">General Election</h3>
                <p className="timeline-desc">
                  Held on the Tuesday following the first Monday in November. Voters across the country cast their ballots for their preferred candidates.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="timeline-item scroll-animate">
              <div className="timeline-icon">
                <CheckCircle size={24} />
              </div>
              <div className="timeline-content glass">
                <div className="timeline-date">Phase 4: Validation</div>
                <h3 className="timeline-title">Electoral College</h3>
                <p className="timeline-desc">
                  For the presidency, the popular vote dictates the Electoral College electors, who then officially cast the votes to determine the winner.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="timeline-item scroll-animate">
              <div className="timeline-icon">
                <Award size={24} />
              </div>
              <div className="timeline-content glass">
                <div className="timeline-date">Phase 5: Conclusion</div>
                <h3 className="timeline-title">Inauguration</h3>
                <p className="timeline-desc">
                  The elected officials are officially sworn into office, marking the beginning of their term and the end of the election cycle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Voting Methods Section */}
        <section id="methods" className="section">
          <h2 className="section-title scroll-animate">Ways to <span className="text-gradient">Vote</span></h2>
          
          <div className="cards-grid">
            <div className="method-card glass scroll-animate">
              <div className="card-icon">
                <MapPin size={32} />
              </div>
              <h3 className="card-title">In-Person on Election Day</h3>
              <p className="card-desc">
                The traditional method. Find your designated polling place, verify your identity if required, and cast your ballot on a machine or paper.
              </p>
              <a href="#data-search" className="card-action" style={{ textDecoration: 'none' }} aria-label="Find Polling Place">
                Find Polling Place <ChevronRight size={16} />
              </a>
            </div>

            <div className="method-card glass scroll-animate" style={{ animationDelay: '0.2s' }}>
              <div className="card-icon">
                <Mail size={32} />
              </div>
              <h3 className="card-title">Mail-In / Absentee Voting</h3>
              <p className="card-desc">
                Request a ballot to your home address. You can complete it early and mail it back or drop it off at designated secure locations.
              </p>
              <a href="#data-search" className="card-action" style={{ textDecoration: 'none' }} aria-label="Request Absentee Ballot">
                Request Ballot <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* Video Education Section */}
        <VideoEducation />

        {/* Quiz Section */}
        <QuizSection />

        {/* FAQ Section */}
        <section id="faq" className="section">
          <h2 className="section-title scroll-animate">Frequently Asked <span className="text-gradient">Questions</span></h2>
          <div className="faq-container">
            <details className="faq-item glass scroll-animate">
              <summary className="faq-question">What is the Electoral College?</summary>
              <div className="faq-answer">
                The Electoral College is a process, not a place. The founding fathers established it in the Constitution as a compromise between election of the President by a vote in Congress and election of the President by a popular vote of qualified citizens. It consists of 538 electors, and a majority of 270 electoral votes is required to elect the President.
              </div>
            </details>
            <details className="faq-item glass scroll-animate" style={{ animationDelay: '0.1s' }}>
              <summary className="faq-question">How do I know if I'm registered to vote?</summary>
              <div className="faq-answer">
                You can check your voter registration status through your state or local election office's website. You can use the data search tool below to find your local election board's official URL.
              </div>
            </details>
            <details className="faq-item glass scroll-animate" style={{ animationDelay: '0.2s' }}>
              <summary className="faq-question">Can I vote online?</summary>
              <div className="faq-answer">
                Currently, no states allow general online voting for standard elections due to security concerns. However, some states allow overseas citizens and military personnel to vote via specific secure web portals.
              </div>
            </details>
            <details className="faq-item glass scroll-animate" style={{ animationDelay: '0.3s' }}>
              <summary className="faq-question">What is the difference between a primary and a general election?</summary>
              <div className="faq-answer">
                A primary election is used by political parties to nominate their candidates for the general election. The general election is the final election that determines which candidate will hold the office.
              </div>
            </details>
          </div>
        </section>

        {/* Glossary Section */}
        <Glossary />

        {/* REST API Integration Section */}
        <ApiSection addressQuery={addressQuery} setAddressQuery={setAddressQuery} />
      </div>
      
      {/* Election Assistant Chatbot */}
      <ElectionAssistantChat />
    </div>
  );
}

export default App;
