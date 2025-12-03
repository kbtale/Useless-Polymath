import React, { useState, useEffect } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { decimalToHex, hexToDecimal } from './logic';

export const HexPractice: React.FC = () => {
  const [target, setTarget] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const generateRound = () => {
    const newTarget = Math.floor(Math.random() * 255);
    setTarget(newTarget);
    
    // Generate 3 wrong answers + 1 correct
    const correct = decimalToHex(newTarget);
    const wrong = new Set<string>();
    while (wrong.size < 3) {
      const w = Math.floor(Math.random() * 255);
      if (w !== newTarget) wrong.add(decimalToHex(w));
    }
    
    const all = [...Array.from(wrong), correct].sort(() => Math.random() - 0.5);
    setOptions(all);
    setFeedback(null);
  };

  useEffect(() => {
    generateRound();
  }, []);

  const handleGuess = (guess: string) => {
    if (hexToDecimal(guess) === target) {
      setFeedback('correct');
      setStreak(s => s + 1);
      setTimeout(generateRound, 1000);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  return (
    <FUIGlassPanel style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Rajdhani', color: '#BD00FF', margin: 0 }}>HEX // TRAINING</h2>
        <div style={{ fontFamily: 'Orbitron', color: '#FFD700' }}>STREAK: {streak}</div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontFamily: 'Rajdhani', color: 'rgba(255,255,255,0.7)' }}>CONVERT TO HEX</div>
        <div style={{ fontSize: '4rem', fontFamily: 'Orbitron', color: 'white' }}>{target}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {options.map(opt => (
          <FUIButton 
            key={opt} 
            variant="outline" 
            onClick={() => handleGuess(opt)}
            style={{ fontSize: '1.5rem', fontFamily: 'Orbitron' }}
          >
            {opt}
          </FUIButton>
        ))}
      </div>

      {feedback && (
        <div style={{ 
          marginTop: '2rem', 
          textAlign: 'center', 
          padding: '1rem',
          background: feedback === 'correct' ? 'rgba(0, 243, 255, 0.2)' : 'rgba(255, 0, 60, 0.2)',
          border: `1px solid ${feedback === 'correct' ? '#00F3FF' : '#FF003C'}`,
          color: feedback === 'correct' ? '#00F3FF' : '#FF003C',
          fontFamily: 'Orbitron'
        }}>
          {feedback === 'correct' ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
        </div>
      )}
    </FUIGlassPanel>
  );
};
