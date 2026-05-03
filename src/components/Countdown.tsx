import { useEffect, useState } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    // Next general election date: Nov 3, 2026
    const targetDate = new Date('2026-11-03T00:00:00').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown glass animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next General Election</h3>
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        <div className="time-box">
          <span className="time-val">{timeLeft.days}</span>
          <span className="time-label">Days</span>
        </div>
        <div className="time-box">
          <span className="time-val">{timeLeft.hours}</span>
          <span className="time-label">Hrs</span>
        </div>
        <div className="time-box">
          <span className="time-val">{timeLeft.minutes}</span>
          <span className="time-label">Min</span>
        </div>
        <div className="time-box">
          <span className="time-val">{timeLeft.seconds}</span>
          <span className="time-label">Sec</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
