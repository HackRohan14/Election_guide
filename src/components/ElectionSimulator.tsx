import { useState } from 'react';

interface Scenario {
  id: number;
  title: string;
  description: string;
  icon: string;
  choices: { text: string; correct: boolean; feedback: string; points: number }[];
}

const scenarios: Scenario[] = [
  {
    id: 1, title: 'Polling Day Morning', icon: '🌅',
    description: 'It\'s election day. You reach your polling booth and see a very long queue. A party worker approaches you and offers ₹500 to vote for their candidate. What do you do?',
    choices: [
      { text: 'Accept the money — it\'s free cash', correct: false, feedback: 'Accepting money for votes is a criminal offense under Section 171B of the IPC. You could face up to 1 year in prison and a fine. The election can be declared void.', points: 0 },
      { text: 'Refuse and report to the Presiding Officer', correct: true, feedback: 'Correct! This is electoral bribery. Report it to the Presiding Officer or call 1950 (Voter Helpline). You\'re protecting democracy!', points: 25 },
      { text: 'Take the money but vote for who you want', correct: false, feedback: 'Even accepting the money is a crime under IPC 171B, regardless of who you ultimately vote for. Both giver and receiver are guilty.', points: 5 },
    ]
  },
  {
    id: 2, title: 'The Identity Check', icon: '🪪',
    description: 'You arrive at the booth but realize you forgot your Voter ID (EPIC card). The polling officer asks for identification. What can you do?',
    choices: [
      { text: 'Leave — you can\'t vote without EPIC', correct: false, feedback: 'Not quite! While the EPIC card is preferred, the ECI accepts 11 other valid photo IDs including Aadhaar, Passport, PAN Card, and Driving License.', points: 5 },
      { text: 'Show any of the 12 ECI-approved photo IDs', correct: true, feedback: 'Excellent! The Election Commission accepts 12 alternative photo identity documents. These include Aadhaar, Passport, Driving License, PAN Card, MNREGA Card, and more.', points: 25 },
      { text: 'Argue with the polling officer', correct: false, feedback: 'This could lead to your removal from the booth. Stay calm and check if you have any of the 12 approved alternate photo IDs.', points: 0 },
    ]
  },
  {
    id: 3, title: 'EVM Malfunction', icon: '🖥️',
    description: 'You press the button for your candidate on the EVM, but the VVPAT slip shows a different candidate\'s name. What should you do?',
    choices: [
      { text: 'Stay quiet — it\'s probably a glitch', correct: false, feedback: 'Never stay quiet! This is a serious issue. The Supreme Court has ruled that VVPAT is the final verifiable record of your vote.', points: 0 },
      { text: 'Immediately report to the Presiding Officer', correct: true, feedback: 'Perfect! Under the ECI\'s VVPAT protocol, if the slip doesn\'t match your choice, you must inform the Presiding Officer. You\'ll be allowed a test vote, and if confirmed, the EVM will be replaced.', points: 25 },
      { text: 'Take a photo of the VVPAT for proof', correct: false, feedback: 'Photography is strictly prohibited inside the polling booth under Section 128A of the RPA 1951. You could face criminal charges. Report to the Presiding Officer instead.', points: 0 },
    ]
  },
  {
    id: 4, title: 'Social Media Dilemma', icon: '📱',
    description: 'On election day, you see a viral WhatsApp message claiming that EVMs have been hacked in your area and people should not vote. What should you do?',
    choices: [
      { text: 'Forward the message to warn others', correct: false, feedback: 'Forwarding unverified information about EVMs is spreading misinformation. This could violate the IT Act and IPC provisions on rumor-mongering during elections.', points: 0 },
      { text: 'Ignore voting since EVMs might be hacked', correct: false, feedback: 'EVMs are standalone machines with no wireless connectivity. They cannot be hacked remotely. Not voting only hurts your own democratic rights.', points: 0 },
      { text: 'Fact-check via ECI sources and go vote', correct: true, feedback: 'Smart choice! EVMs are not connected to any network and cannot be hacked remotely. Always verify claims through official ECI channels or the Voter Helpline (1950). Go vote!', points: 25 },
    ]
  },
  {
    id: 5, title: 'NOTA Decision', icon: '🚫',
    description: 'You\'ve researched all candidates in your constituency and none of them align with your values. You consider not voting at all. What\'s the best approach?',
    choices: [
      { text: 'Skip voting entirely — none deserve my vote', correct: false, feedback: 'While not illegal, abstaining from voting means your voice isn\'t recorded at all. You miss the chance to formally register your dissatisfaction.', points: 5 },
      { text: 'Use the NOTA (None of the Above) option', correct: true, feedback: 'Excellent! NOTA was introduced by the Supreme Court in 2013 (PUCL vs Union of India). It lets you formally reject all candidates. Though currently NOTA votes don\'t affect results, they send a powerful message to political parties.', points: 25 },
      { text: 'Vote for a random candidate to avoid wasting time', correct: false, feedback: 'Voting randomly undermines the purpose of democracy. If no candidate appeals to you, NOTA exists specifically for this reason.', points: 0 },
    ]
  }
];

const ElectionSimulator = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [answeredScenarios, setAnsweredScenarios] = useState(0);

  const handleChoice = (choiceIdx: number) => {
    if (selectedChoice !== null) return;
    setSelectedChoice(choiceIdx);
    setTotalPoints(prev => prev + scenarios[currentScenario].choices[choiceIdx].points);
    setAnsweredScenarios(prev => prev + 1);
  };

  const nextScenario = () => {
    if (currentScenario + 1 < scenarios.length) {
      setCurrentScenario(currentScenario + 1);
      setSelectedChoice(null);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setSelectedChoice(null);
    setTotalPoints(0);
    setGameComplete(false);
    setAnsweredScenarios(0);
  };

  const maxPoints = scenarios.length * 25;
  const percentage = Math.round((totalPoints / maxPoints) * 100);

  const getGrade = () => {
    if (percentage >= 90) return { label: 'Election Expert 🏆', color: 'var(--accent-saffron)' };
    if (percentage >= 70) return { label: 'Informed Citizen ✅', color: 'var(--accent-green)' };
    if (percentage >= 40) return { label: 'Learning Voter 📚', color: 'var(--accent-blue)' };
    return { label: 'Civic Beginner 🌱', color: 'var(--accent-secondary)' };
  };

  if (gameComplete) {
    const grade = getGrade();
    return (
      <section id="simulator" className="section">
        <div className="container">
          <div className="glass animate-fade-in" style={{ padding: '3rem', maxWidth: '650px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎯</div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Simulation Complete!</h2>
            <p style={{ color: grade.color, fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>{grade.label}</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{totalPoints}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Points Earned</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-green)' }}>{percentage}%</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Accuracy</p>
              </div>
            </div>

            <div style={{ width: '100%', background: 'rgba(255,255,255,0.08)', height: '12px', borderRadius: '10px', overflow: 'hidden', marginBottom: '2rem' }}>
              <div style={{ width: `${percentage}%`, background: 'var(--accent-gradient)', height: '100%', borderRadius: '10px', transition: 'width 1s ease' }} />
            </div>

            <button onClick={resetGame} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
              🔄 Play Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  const scenario = scenarios[currentScenario];

  return (
    <section id="simulator" className="section">
      <div className="container">
        <h2 className="section-title scroll-animate">Election <span className="text-gradient">Simulator</span></h2>
        <p className="section-subtitle scroll-animate">Navigate real-world voting scenarios and learn the consequences of your choices</p>

        <div className="glass scroll-animate" style={{ padding: '2.5rem', maxWidth: '750px', margin: '0 auto' }}>
          {/* Progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span className="tag tag-purple">Scenario {currentScenario + 1} of {scenarios.length}</span>
            <span style={{ color: 'var(--accent-saffron)', fontWeight: 700 }}>{totalPoints} pts</span>
          </div>

          <div style={{ width: '100%', background: 'rgba(255,255,255,0.06)', height: '4px', borderRadius: '4px', marginBottom: '2rem' }}>
            <div style={{ width: `${(answeredScenarios / scenarios.length) * 100}%`, background: 'var(--accent-gradient)', height: '100%', borderRadius: '4px', transition: 'width 0.4s ease' }} />
          </div>

          {/* Scenario */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>{scenario.icon}</span>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{scenario.title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem' }}>{scenario.description}</p>
          </div>

          {/* Choices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {scenario.choices.map((choice, idx) => {
              const isSelected = selectedChoice === idx;
              const showResult = selectedChoice !== null;
              let borderColor = 'rgba(255,255,255,0.05)';
              let bgColor = 'rgba(255,255,255,0.02)';

              if (showResult && choice.correct) {
                borderColor = 'rgba(16, 185, 129, 0.4)';
                bgColor = 'rgba(16, 185, 129, 0.08)';
              } else if (isSelected && !choice.correct) {
                borderColor = 'rgba(239, 68, 68, 0.4)';
                bgColor = 'rgba(239, 68, 68, 0.08)';
              }

              return (
                <div key={idx}>
                  <button
                    onClick={() => handleChoice(idx)}
                    disabled={showResult}
                    style={{
                      width: '100%', textAlign: 'left', padding: '1.2rem 1.5rem',
                      background: bgColor, border: `1px solid ${borderColor}`,
                      borderRadius: '12px', color: 'var(--text-primary)',
                      cursor: showResult ? 'default' : 'pointer',
                      transition: 'var(--transition)', fontSize: '1rem',
                      fontFamily: 'Inter, sans-serif', opacity: showResult && !isSelected && !choice.correct ? 0.5 : 1
                    }}
                  >
                    {choice.text}
                    {showResult && choice.correct && <span style={{ marginLeft: '0.5rem' }}>✅</span>}
                    {isSelected && !choice.correct && <span style={{ marginLeft: '0.5rem' }}>❌</span>}
                  </button>
                  {showResult && isSelected && (
                    <p style={{
                      padding: '1rem 1.5rem', marginTop: '0.5rem',
                      fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7',
                      background: 'rgba(255,255,255,0.02)', borderRadius: '8px',
                      borderLeft: `3px solid ${choice.correct ? 'var(--accent-green)' : '#ef4444'}`,
                      animation: 'fadeIn 0.3s ease'
                    }}>
                      {choice.feedback}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {selectedChoice !== null && (
            <button onClick={nextScenario} className="btn btn-primary animate-fade-in"
              style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', padding: '1rem' }}>
              {currentScenario + 1 < scenarios.length ? 'Next Scenario →' : 'View Results 🎯'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ElectionSimulator;
