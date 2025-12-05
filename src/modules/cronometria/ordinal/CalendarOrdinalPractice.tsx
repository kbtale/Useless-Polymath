import React, { useState, useEffect } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { getOrdinalDate, getDaysInMonth } from './logic';
import styles from './Ordinal.module.scss';

export const CalendarOrdinalPractice: React.FC = () => {
  const [targetDate, setTargetDate] = useState<{ d: number, m: number, y: number } | null>(null);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [streak, setStreak] = useState(0);

  const generateProblem = () => {
    const y = 2020 + Math.floor(Math.random() * 10); // Random year 2020-2029
    const m = Math.floor(Math.random() * 12) + 1;
    const maxDays = getDaysInMonth(m, y);
    const d = Math.floor(Math.random() * maxDays) + 1;
    
    setTargetDate({ d, m, y });
    setInput('');
    setFeedback(null);
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const handleSubmit = () => {
    if (!targetDate) return;
    
    const { ordinal } = getOrdinalDate(targetDate.d, targetDate.m, targetDate.y);
    
    if (parseInt(input) === ordinal) {
      setFeedback('correct');
      setStreak(s => s + 1);
      setTimeout(generateProblem, 1500);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  if (!targetDate) return null;

  return (
    <div className={styles.toolLayout}>
      <FUIGlassPanel className={styles.panel}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span className={styles.key}>PRACTICE MODE</span>
          <span className={styles.key}>STREAK: {streak}</span>
        </div>

        <h2 className={styles.title}>CALCULATE ORDINAL DAY</h2>
        
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>TARGET DATE</div>
          <div style={{ fontSize: '3rem', fontFamily: 'JetBrains Mono', fontWeight: 800 }}>
            {targetDate.y}-{targetDate.m.toString().padStart(2, '0')}-{targetDate.d.toString().padStart(2, '0')}
          </div>
        </div>

        <div className={styles.dateInputContainer}>
          <input 
            className={styles.dateBlock} 
            placeholder="???" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: '100%' }}
            autoFocus
          />
        </div>

        <div className={styles.buttonGroup}>
          <FUIButton onClick={handleSubmit} variant="solid">&lt; CHECK &gt;</FUIButton>
        </div>

        {feedback && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            textAlign: 'center', 
            border: '2px solid black',
            background: feedback === 'correct' ? '#eee' : '#000',
            color: feedback === 'correct' ? '#000' : '#fff',
            fontWeight: 700
          }}>
            {feedback === 'correct' ? 'CORRECT // SYSTEM SYNCED' : `INCORRECT // EXPECTED: ${getOrdinalDate(targetDate.d, targetDate.m, targetDate.y).ordinal}`}
          </div>
        )}
      </FUIGlassPanel>
    </div>
  );
};
