import React, { useState, useEffect } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { ALPHABET, getBraillePattern } from './logic';
import styles from './Braille.module.scss';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export const BraillePractice: React.FC = () => {
  const { t } = useTranslation(['braille', 'common']);
  
  const [targetChar, setTargetChar] = useState('');
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const char = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    setTargetChar(char);
    setInput('');
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (!targetChar) return;
    
    if (input.toUpperCase() === targetChar) {
        setFeedback('correct');
        setStreak(s => s + 1);
        setTimeout(generateQuestion, 1000);
    } else {
        setFeedback('incorrect');
        setStreak(0);
    }
  };

  const pattern = targetChar ? getBraillePattern(targetChar) : [];

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('practice_title')}</h2>

      <div className={styles.practiceContainer}>
        <div>{t('streak', { ns: 'common' })}: {streak}</div>

        {targetChar && (
            <div className={styles.flashcard}>
                <div className={styles.dotsGrid}>
                    {pattern.map((isActive, i) => (
                        <div key={i} className={clsx(styles.dot, isActive && styles.active)} />
                    ))}
                </div>
            </div>
        )}

        <div style={{ width: '100px' }}>
            <CoreBaseInput
                value={input}
                onChangeValue={setInput}
                placeholder="?"
                maxLength={1}
                transformToUpper={true}
                onEnter={checkAnswer}
                style={{ textAlign: 'center', fontSize: '2rem' }}
            />
        </div>
        
        <FUIButton onClick={checkAnswer}>{t('submit', { ns: 'common' })}</FUIButton>

        {feedback === 'correct' && (
             <div className={`${styles.feedback} ${styles.correct}`}>{t('correct', { ns: 'common' })}!</div>
        )}
        
        {feedback === 'incorrect' && (
             <div className={`${styles.feedback} ${styles.incorrect}`}>{t('incorrect', { ns: 'common' })} -&gt; {targetChar}</div>
        )}
      </div>
    </FUIGlassPanel>
  );
};
