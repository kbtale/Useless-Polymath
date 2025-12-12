import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { toRoman } from './logic';
import styles from './Roman.module.scss';
import { useTranslation } from 'react-i18next';

export const RomanPractice: React.FC = () => {
  const { t } = useTranslation(['roman_numerals', 'common']);
  
  const [direction, setDirection] = useState<'to_roman' | 'to_decimal'>('to_roman');
  const [questionVal, setQuestionVal] = useState<number>(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  if (questionVal === 0) {
    setQuestionVal(Math.floor(Math.random() * 1000) + 1);
  }

  const generateQuestion = () => {
    setQuestionVal(Math.floor(Math.random() * 1000) + 1);
    setUserInput('');
    setFeedback(null);
    setDirection(Math.random() > 0.5 ? 'to_roman' : 'to_decimal');
  };

  const checkAnswer = () => {
    let isCorrect = false;

    if (direction === 'to_roman') {
        isCorrect = userInput.toUpperCase() === toRoman(questionVal);
    } else {
        isCorrect = parseInt(userInput) === questionVal;
    }

    if (isCorrect) {
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
            <div className={styles.questionLabel}>
                {direction === 'to_roman' 
                    ? t('convert_to_roman', { defaultValue: 'Convert to ROMAN' }) 
                    : t('convert_to_decimal', { defaultValue: 'Convert to DECIMAL' })
                }
            </div>
            <div className={styles.questionValue}>
                {direction === 'to_roman' ? questionVal : toRoman(questionVal)}
            </div>
        </div>

        <div style={{ width: '200px' }}>
            <CoreBaseInput
                value={userInput}
                onChangeValue={setUserInput}
                allowedChars={direction === 'to_roman' ? /[IVXLCDM]/i : /[0-9]/}
                transformToUpper={direction === 'to_roman'}
                maxLength={direction === 'to_roman' ? 15 : 4}
                placeholder="?"
            />
        </div>

        {feedback === 'correct' ? (
             <div className={`${styles.feedback} ${styles.correct}`}>CORRECT</div>
        ) : feedback === 'incorrect' ? (
             <div className={`${styles.feedback} ${styles.incorrect}`}>INCORRECT</div>
        ) : (
            <FUIButton onClick={checkAnswer}>CHECK</FUIButton>
        )}

      </div>
    </FUIGlassPanel>
  );
};
