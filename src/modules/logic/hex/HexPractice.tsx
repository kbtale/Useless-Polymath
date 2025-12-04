import React, { useState, useEffect } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { decimalToHex, hexToDecimal } from './logic';
import styles from './Hex.module.scss';
import clsx from 'clsx';

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
    <FUIGlassPanel className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.practiceTitle}>HEX // TRAINING</h2>
        <div className={styles.streak}>STREAK: {streak}</div>
      </div>

      <div className={styles.targetDisplay}>
        <div className={styles.label}>CONVERT TO HEX</div>
        <div className={styles.targetValue}>{target}</div>
      </div>

      <div className={styles.optionsGrid}>
        {options.map(opt => (
          <FUIButton 
            key={opt} 
            variant="outline" 
            onClick={() => handleGuess(opt)}
            className={styles.optionBtn}
          >
            {opt}
          </FUIButton>
        ))}
      </div>

      {feedback && (
        <div className={clsx(styles.feedback, styles[feedback])}>
          {feedback === 'correct' ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
        </div>
      )}
    </FUIGlassPanel>
  );
};
