
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePracticeStreak } from '../../../hooks/usePracticeStreak';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { CoreSemaphoreFigure } from '../../../components/core/CoreSemaphoreFigure';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { getSemaphorePattern } from './logic';
import clsx from 'clsx';
import styles from './SemaphorePractice.module.scss';

export const SemaphorePractice: React.FC = () => {
  const { streak, setStreak } = usePracticeStreak('semaphore');
  const getRandomChar = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const { t } = useTranslation('semaphore');
  const [targetChar, setTargetChar] = useState(getRandomChar);
  const [input, setInput] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const generateNew = () => {
    setTargetChar(getRandomChar());
    setInput('');
    setFeedback(null);
  };


  const checkAnswer = () => {
    if (input.toLowerCase() === targetChar.toLowerCase()) {
      setFeedback('correct');
      setStreak(s => s + 1);
      setTimeout(generateNew, 1000);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };


  const pattern = getSemaphorePattern(targetChar);

  return (
    <FUIGlassPanel className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.practiceTitle}>{t('practice_title', 'SEMAPHORE TRAINING')}</h2>
        <div className={styles.streak}>STREAK: {streak}</div>
      </div>

      <div className={styles.grid}>
        <div className={clsx(
          styles.card,
          feedback === 'correct' && styles.correct,
          feedback === 'incorrect' && styles.wrong
        )}>
          <CoreSemaphoreFigure 
            leftAngle={pattern.left} 
            rightAngle={pattern.right} 
            size={240}
            className="text-black"
          />
        </div>

        <div className={styles.inputArea}>
          <label className={styles.label}>{t('identify_label', 'Identify Signal')}</label>
          <CoreBaseInput
            value={input}
            onChangeValue={setInput}
            onEnter={checkAnswer}
            maxLength={1}
            autoFocus
            transformToUpper
          />
          <div className={styles.submitBtn}>
            <FUIButton onClick={checkAnswer} variant="solid" style={{ width: '100%' }}>
              {t('submit', 'SUBMIT')}
            </FUIButton>
          </div>
        </div>
      </div>

      {feedback && (
        <div className={clsx(styles.feedback, styles[feedback])}>
          {feedback === 'correct' 
            ? 'ACCESS GRANTED' 
            : `ACCESS DENIED // CORRECT: ${targetChar.toUpperCase()}`
          }
        </div>
      )}
    </FUIGlassPanel>
  );
};
