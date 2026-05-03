import { useState } from 'react';

const QuizSection = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      q: "How many electoral votes are needed to win the presidency?",
      options: ["270", "538", "100", "300"],
      answer: "270"
    },
    {
      q: "What month is the General Election held?",
      options: ["October", "November", "December", "January"],
      answer: "November"
    },
    {
      q: "Who determines the timeline for state primaries?",
      options: ["The President", "The Supreme Court", "State Governments & Parties", "The UN"],
      answer: "State Governments & Parties"
    }
  ];

  const handleAnswer = (option: string) => {
    if (option === questions[currentQ].answer) {
      setScore(score + 1);
    }
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <section id="quiz" className="section scroll-animate">
      <div className="glass" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Test Your <span className="text-gradient">Knowledge</span></h2>
        
        {showResult ? (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>You scored {score} out of {questions.length}!</h3>
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '20px', borderRadius: '10px', margin: '1.5rem 0', overflow: 'hidden' }}>
              <div style={{ width: `${(score / questions.length) * 100}%`, background: 'var(--accent-gradient)', height: '100%', borderRadius: '10px', transition: 'width 1s ease' }}></div>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              {score === questions.length ? "Perfect score! You're an election expert." : "Good effort! Review the timeline above to learn more."}
            </p>
            <button onClick={resetQuiz} className="btn btn-primary" aria-label="Retry Quiz">Try Again</button>
          </div>
        ) : (
          <div className="animate-fade-in" key={currentQ}>
            <p style={{ color: 'var(--accent-secondary)', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Question {currentQ + 1} of {questions.length}</p>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', minHeight: '60px' }}>{questions[currentQ].q}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {questions[currentQ].options.map(opt => (
                <button key={opt} onClick={() => handleAnswer(opt)} className="btn btn-secondary" style={{ padding: '1.5rem 1rem', fontSize: '1.1rem' }} aria-label={`Answer ${opt}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuizSection;
