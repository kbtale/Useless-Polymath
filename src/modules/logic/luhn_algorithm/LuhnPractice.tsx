
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { generateLuhnNumber } from './logic';
import styles from './LuhnAlgorithm.module.scss';

export const LuhnPractice: React.FC = () => {
  const { t } = useTranslation('luhn_algorithm');
  
  // State: 'number' is the full valid number. We hide the last digit.
  const [targetNumber, setTargetNumber] = useState(() => generateLuhnNumber(16));
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const displayBase = targetNumber.slice(0, -1);
  const correctDigit = targetNumber.slice(-1);

  const handleCheck = () => {
    if (input === correctDigit) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNext = () => {
    setTargetNumber(generateLuhnNumber(16));
    setInput('');
    setFeedback(null);
  };

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('practice_title')}</h2>
      
      <div className={styles.practiceContainer}>
        <p className={styles.label} style={{ textAlign: 'center' }}>{t('practice_prompt')}</p>
        
        <div className={styles.quizNumber}>
          {displayBase.split('').map((d, i) => (
             <span key={i} style={{ opacity: 0.7 }}>{d}</span>
          ))}
          <span className={styles.missing}>?</span>
        </div>

        <CoreBaseInput
          value={input}
          onChangeValue={(v) => setInput(v.slice(0, 1))} // Max 1 char
          onEnter={handleCheck}
          placeholder="?"
          allowedChars={/^[0-9]*$/}
          className="text-center font-mono text-2xl w-16"
        />

        {!feedback && (
          <FUIButton onClick={handleCheck} disabled={!input} variant="solid">
            Submit
          </FUIButton>
        )}

        {feedback && (
          <>
            <div style={{ 
               padding: '1rem', 
               color: feedback === 'correct' ? '#4ade80' : '#f87171',
               textAlign: 'center',
               fontFamily: 'monospace'
            }}>
              {t(feedback === 'correct' ? 'feedback_correct' : 'feedback_incorrect', { digit: correctDigit })}
            </div>
            <FUIButton onClick={handleNext} variant="outline">
              Next
            </FUIButton>
          </>
        )}
      </div>
    </FUIGlassPanel>
  );
};
