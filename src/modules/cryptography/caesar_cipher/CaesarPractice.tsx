import React, { useState, useEffect } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { encrypt } from './logic';
import styles from './Caesar.module.scss';
import { useTranslation } from 'react-i18next';

const WORDS = ['HELLO', 'WORLD', 'SECRET', 'CIPHER', 'CODE', 'PYTHON', 'REACT', 'AGENT', 'FUTURE', 'HISTORY'];

export const CaesarPractice: React.FC = () => {
  const { t } = useTranslation(['caesar_cipher', 'common']);
  
  const [targetWord, setTargetWord] = useState('');
  const [shift, setShift] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    const s = Math.floor(Math.random() * 25) + 1; // 1-25
    setTargetWord(word);
    setShift(s);
    setUserInput('');
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (userInput.toUpperCase() === targetWord) {
        setFeedback('correct');
        setStreak(s => s + 1);
        setTimeout(generateQuestion, 1500);
    } else {
        setFeedback('incorrect');
        setStreak(0);
    }
  };

  const encrypted = encrypt(targetWord, shift);

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('practice_title')}</h2>

      <div className={styles.practiceContainer}>
        
        <div>{t('streak', { ns: 'common' })}: {streak}</div>

        <div className={styles.cipherText}>
            {encrypted}
        </div>

        <div className={styles.hint}>
            {t('hint_shift', { shift })}
        </div>

        <div style={{ width: '100%', maxWidth: '300px' }}>
            <CoreBaseInput
                value={userInput}
                onChangeValue={setUserInput}
                placeholder={t('decrypted_placeholder')}
                onEnter={checkAnswer}
                transformToUpper={true}
                disabled={feedback === 'correct'}
            />
        </div>

        <FUIButton onClick={checkAnswer} disabled={!userInput || feedback !== null}>
            {t('submit', { ns: 'common', defaultValue: 'SUBMIT' })}
        </FUIButton>

        {feedback === 'correct' && (
             <div className={`${styles.feedback} ${styles.correct}`}>{t('correct', { ns: 'common' })}!</div>
        )}
        
        {feedback === 'incorrect' && (
             <div className={`${styles.feedback} ${styles.incorrect}`}>{t('incorrect', { ns: 'common' })}</div>
        )}

      </div>
    </FUIGlassPanel>
  );
};
