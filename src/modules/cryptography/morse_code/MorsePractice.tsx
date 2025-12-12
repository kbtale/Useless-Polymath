import React, { useState, useEffect } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { MORSE_CODE } from './logic';
import styles from './Morse.module.scss';
import { useTranslation } from 'react-i18next';

export const MorsePractice: React.FC = () => {
  const { t } = useTranslation(['morse_code', 'common']);
  
  const [question, setQuestion] = useState<{char: string, morse: string} | null>(null);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const keys = Object.keys(MORSE_CODE).filter(k => k !== ' ');
    const char = keys[Math.floor(Math.random() * keys.length)];
    setQuestion({ char, morse: MORSE_CODE[char] });
    setInput('');
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (!question) return;
    
    // Check if input matches character
    if (input.toUpperCase() === question.char) {
        setFeedback('correct');
        setStreak(s => s + 1);
        setTimeout(generateQuestion, 1000);
    } else {
        setFeedback('incorrect');
        setStreak(0);
    }
  };

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('practice_title')}</h2>

      <div className={styles.practiceContainer}>
        <div>{t('streak', { ns: 'common' })}: {streak}</div>

        {question && (
            <div className={styles.flashcard}>
                {question.morse}
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
             <div className={`${styles.feedback} ${styles.incorrect}`}>{t('incorrect', { ns: 'common' })} -&gt; {question?.char}</div>
        )}
      </div>
    </FUIGlassPanel>
  );
};
