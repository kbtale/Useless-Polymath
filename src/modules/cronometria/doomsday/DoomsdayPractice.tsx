import React, { useState, useEffect } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { getDayOfWeek, DAYS } from './logic';

export const DoomsdayPractice: React.FC = () => {
  const [targetDate, setTargetDate] = useState<{y: number, m: number, d: number} | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [streak, setStreak] = useState(0);

  const generateDate = () => {
    const start = new Date(1900, 0, 1);
    const end = new Date(2100, 0, 1);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    setTargetDate({
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate()
    });
    setFeedback(null);
  };

  useEffect(() => {
    generateDate();
  }, []);

  const handleGuess = (dayIndex: number) => {
    if (!targetDate) return;
    const actual = getDayOfWeek(targetDate.y, targetDate.m, targetDate.d);
    if (dayIndex === actual) {
      setFeedback('correct');
      setStreak(s => s + 1);
      setTimeout(generateDate, 1000);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  return (
    <FUIGlassPanel style={{ maxWidth: '600px', margin: '0 auto', marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'Rajdhani', color: '#00F3FF', margin: 0 }}>TRAINING // MODE</h2>
        <div style={{ fontFamily: 'Orbitron', color: '#FFD700' }}>STREAK: {streak}</div>
      </div>
      
      {targetDate && (
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <div style={{ fontSize: '3rem', fontFamily: 'Orbitron', color: 'white' }}>
            {targetDate.y}-{String(targetDate.m).padStart(2, '0')}-{String(targetDate.d).padStart(2, '0')}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
        {DAYS.map((day, i) => (
          <FUIButton 
            key={day} 
            variant="outline" 
            onClick={() => handleGuess(i)}
            style={{ padding: '0.5rem', fontSize: '0.8rem' }}
          >
            {day.substring(0, 3).toUpperCase()}
          </FUIButton>
        ))}
      </div>

      {feedback && (
        <div style={{ 
          marginTop: '1rem', 
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
