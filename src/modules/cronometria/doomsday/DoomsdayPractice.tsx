import React, { useState, useEffect } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { getDayOfWeek, DAYS } from './logic';
import styles from './Doomsday.module.scss';
import clsx from 'clsx';

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
    <FUIGlassPanel className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.practiceTitle}>TRAINING // MODE</h2>
        <div className={styles.streak}>STREAK: {streak}</div>
      </div>
      
      {targetDate && (
        <div className={styles.targetDate}>
          <div className={styles.dateDisplay}>
            {targetDate.y}-{String(targetDate.m).padStart(2, '0')}-{String(targetDate.d).padStart(2, '0')}
          </div>
        </div>
      )}

      <div className={styles.grid}>
        {DAYS.map((day, i) => (
          <FUIButton 
            key={day} 
            variant="outline" 
            onClick={() => handleGuess(i)}
            className={styles.dayBtn}
          >
            {day.substring(0, 3).toUpperCase()}
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
