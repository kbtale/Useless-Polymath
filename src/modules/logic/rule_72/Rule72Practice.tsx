import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { calculateDoublingTime } from './logic';
import styles from './Rule72.module.scss';
import { useTranslation } from 'react-i18next';

export const Rule72Practice: React.FC = () => {
  const { t } = useTranslation(['rule_72', 'common']);

  const [questionRate, setQuestionRate] = useState<number>(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  if (questionRate === 0) {
    generateQuestion();
  }

  function generateQuestion() {
    // Pick "friendly" numbers for mental math: 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72
    const rates = [1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72];
    const nextRate = rates[Math.floor(Math.random() * rates.length)];
    setQuestionRate(nextRate);
    setUserInput('');
    setFeedback(null);
  }

  const checkAnswer = () => {
    const expected = calculateDoublingTime(questionRate);
    const userVal = parseFloat(userInput);

    if (Math.abs(userVal - expected) < 0.1) {
        setFeedback('correct');
        setScore(s => s + 10 + streak * 2);
        setStreak(s => s + 1);
        setTimeout(generateQuestion, 1500);
    } else {
        setFeedback('incorrect');
        setStreak(0);
    }
  };

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('practice_mode', { ns: 'common' })}</h2>
      
      <div className={styles.practiceContainer}>
        
        <div className={styles.scoreBoard}>
            <div>{t('score', { ns: 'common' })}: <span>{score}</span></div>
            <div>{t('streak', { ns: 'common' })}: <span>{streak}</span></div>
        </div>

        <div className={styles.question}>
            <div className={styles.questionLabel}>{t('interest_rate')}</div>
            <div className={styles.questionValue}>{questionRate}%</div>
        </div>

        <div style={{ width: '200px' }}>
            <CoreBaseInput
                value={userInput}
                onChangeValue={setUserInput}
                allowedChars={/[0-9.]/}
                maxLength={5}
                placeholder="?"
            />
        </div>

        {feedback === 'correct' ? (
             <div className={`${styles.feedback} ${styles.correct}`}>{t('correct', { ns: 'common', defaultValue: 'CORRECT' })}</div>
        ) : feedback === 'incorrect' ? (
             <div className={`${styles.feedback} ${styles.incorrect}`}>{t('incorrect', { ns: 'common', defaultValue: 'INCORRECT' })}</div>
        ) : (
            <FUIButton onClick={checkAnswer}>{t('check', { ns: 'common', defaultValue: 'CHECK' })}</FUIButton>
        )}

      </div>
    </FUIGlassPanel>
  );
};
