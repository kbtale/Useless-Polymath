import React, { useState, useEffect } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { NATO_DICTIONARY } from './logic';
import styles from './Nato.module.scss';
import { useTranslation } from 'react-i18next';

export const NatoPractice: React.FC = () => {
  const { t } = useTranslation(['nato_alphabet', 'common']);
  
  // Question State
  const [questionChar, setQuestionChar] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  
  // Game State
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!questionChar) {
        generateQuestion();
    }
  }, []);

  const generateQuestion = () => {
    const keys = Object.keys(NATO_DICTIONARY).filter(k => isNaN(parseInt(k))); // Letters only for now
    const char = keys[Math.floor(Math.random() * keys.length)];
    const correct = NATO_DICTIONARY[char];

    // Generate distractors
    const allWords = Object.values(NATO_DICTIONARY).filter(w => isNaN(parseInt(w)) && w !== correct);
    const distractors: string[] = [];
    while (distractors.length < 3) {
        const d = allWords[Math.floor(Math.random() * allWords.length)];
        if (!distractors.includes(d)) distractors.push(d);
    }

    const nextOptions = [...distractors, correct].sort(() => Math.random() - 0.5);

    setQuestionChar(char);
    setCorrectAnswer(correct);
    setOptions(nextOptions);
    setFeedback(null);
  };

  const handleSelect = (selected: string) => {
    if (feedback !== null) return; // Block input during feedback

    if (selected === correctAnswer) {
        setFeedback('correct');
        setScore(s => s + 10 + streak * 2);
        setStreak(s => s + 1);
        setTimeout(generateQuestion, 1000);
    } else {
        setFeedback('incorrect');
        setStreak(0);
        setTimeout(generateQuestion, 1500);
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

        {questionChar && (
            <>
                <div className={styles.flashcard}>
                    <span className={styles.flashLabel}>{t('what_is_nato')}</span>
                    <span className={styles.flashContent}>{questionChar}</span>
                </div>

                <div className={styles.optionsGrid}>
                    {options.map((opt, idx) => (
                        <FUIButton 
                            key={idx} 
                            onClick={() => handleSelect(opt)}
                            variant="outline"
                            disabled={feedback !== null}
                            style={{ 
                                borderColor: feedback === 'correct' && opt === correctAnswer ? '#2ecc71' : 
                                             feedback === 'incorrect' && opt === correctAnswer ? '#2ecc71' : // Show correct one even on fail
                                             feedback === 'incorrect' && options.includes(opt) && opt !== correctAnswer ? undefined : undefined // Keep neutral style ?
                            }}
                        >
                            {opt}
                        </FUIButton>
                    ))}
                </div>
            </>
        )}

        {feedback === 'correct' && (
             <div className={`${styles.feedback} ${styles.correct}`}>{t('correct', { ns: 'common' })}!</div>
        )}
        
        {feedback === 'incorrect' && (
             <div className={`${styles.feedback} ${styles.incorrect}`}>{t('incorrect', { ns: 'common' })} -&gt; {correctAnswer}</div>
        )}

      </div>
    </FUIGlassPanel>
  );
};
