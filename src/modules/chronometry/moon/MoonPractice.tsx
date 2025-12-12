import React, { useState, useEffect } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { getMoonPhase } from './logic';
import styles from './Moon.module.scss';
import clsx from 'clsx';

export const MoonPractice: React.FC = () => {
  const [targetDate, setTargetDate] = useState<{ d: number; m: number; y: number } | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const generateRound = () => {
    // Random date in current year
    const y = new Date().getFullYear();
    const m = Math.floor(Math.random() * 12) + 1;
    const d = Math.floor(Math.random() * 28) + 1;
    
    setTargetDate({ d, m, y });
    
    const correct = getMoonPhase(d, m, y).phaseName;
    
    // Generate options (unique phases)
    const allPhases = [
      'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
      'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'
    ];
    
    const opts = new Set<string>();
    opts.add(correct);
    while (opts.size < 4) {
      opts.add(allPhases[Math.floor(Math.random() * allPhases.length)]);
    }
    
    setOptions(Array.from(opts).sort());
    setFeedback(null);
  };

  useEffect(() => {
    generateRound();
  }, []);

  const handleGuess = (guess: string) => {
    if (!targetDate) return;
    const correct = getMoonPhase(targetDate.d, targetDate.m, targetDate.y).phaseName;
    
    if (guess === correct) {
      setFeedback('correct');
      setStreak(s => s + 1);
      setTimeout(generateRound, 1000);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  if (!targetDate) return null;

  return (
    <FUIGlassPanel className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.practiceTitle}>LUNAR // TRAINING</h2>
        <div className={styles.streak}>STREAK: {streak}</div>
      </div>

      <div className={styles.targetDisplay}>
        <div className={styles.label}>
          Predict the phase for:
        </div>
        <div className={styles.date}>
          {targetDate.d}/{targetDate.m}/{targetDate.y}
        </div>
      </div>

      <div className={styles.optionsGrid}>
        {options.map(opt => (
          <FUIButton 
            key={opt} 
            variant="outline" 
            onClick={() => handleGuess(opt)}
            className={styles.optionBtn}
          >
            {opt.toUpperCase()}
          </FUIButton>
        ))}
      </div>

      {feedback && (
        <div className={clsx(styles.feedback, styles[feedback])}>
          {feedback === 'correct' ? 'PHASE ALIGNED' : 'ORBIT DECAY'}
        </div>
      )}
    </FUIGlassPanel>
  );
};
