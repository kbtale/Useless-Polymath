import React, { useState, useEffect } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { COMMON_ZONES, calculateDestinationTime } from './logic';

export const TimeZonesPractice: React.FC = () => {
  const [question, setQuestion] = useState<{ originIdx: number; destIdx: number; hour: number } | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const generateRound = () => {
    const originIdx = Math.floor(Math.random() * COMMON_ZONES.length);
    let destIdx = Math.floor(Math.random() * COMMON_ZONES.length);
    while (destIdx === originIdx) destIdx = Math.floor(Math.random() * COMMON_ZONES.length);
    
    const hour = Math.floor(Math.random() * 24);
    
    setQuestion({ originIdx, destIdx, hour });
    
    const correct = calculateDestinationTime(hour, COMMON_ZONES[originIdx].offset, COMMON_ZONES[destIdx].offset).hour;
    
    // Generate options
    const opts = new Set<number>();
    opts.add(correct);
    while (opts.size < 4) {
      opts.add(Math.floor(Math.random() * 24));
    }
    
    setOptions(Array.from(opts).sort((a, b) => a - b));
    setFeedback(null);
  };

  useEffect(() => {
    generateRound();
  }, []);

  const handleGuess = (guess: number) => {
    if (!question) return;
    const correct = calculateDestinationTime(question.hour, COMMON_ZONES[question.originIdx].offset, COMMON_ZONES[question.destIdx].offset).hour;
    
    if (guess === correct) {
      setFeedback('correct');
      setStreak(s => s + 1);
      setTimeout(generateRound, 1000);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  if (!question) return null;

  const origin = COMMON_ZONES[question.originIdx];
  const dest = COMMON_ZONES[question.destIdx];

  return (
    <FUIGlassPanel style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Rajdhani', color: '#BD00FF', margin: 0 }}>TZ // TRAINING</h2>
        <div style={{ fontFamily: 'Orbitron', color: '#FFD700' }}>STREAK: {streak}</div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontFamily: 'Rajdhani', fontSize: '1.2rem', marginBottom: '1rem' }}>
          If it's <span style={{ color: '#00F3FF' }}>{question.hour}:00</span> in <br/>
          <span style={{ color: 'white', fontSize: '1.5rem' }}>{origin.name}</span>
        </div>
        <div style={{ fontFamily: 'Rajdhani', fontSize: '1.2rem' }}>
          What time is it in <br/>
          <span style={{ color: '#BD00FF', fontSize: '1.5rem' }}>{dest.name}</span>?
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {options.map(opt => (
          <FUIButton 
            key={opt} 
            variant="outline" 
            onClick={() => handleGuess(opt)}
            style={{ fontSize: '1.5rem', fontFamily: 'Orbitron' }}
          >
            {opt}:00
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
          {feedback === 'correct' ? 'SYNC ESTABLISHED' : 'SYNC FAILED'}
        </div>
      )}
    </FUIGlassPanel>
  );
};
