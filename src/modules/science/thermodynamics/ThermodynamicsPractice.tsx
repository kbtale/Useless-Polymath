
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { celsiusToFahrenheitMental } from './logic';
import styles from './Thermodynamics.module.scss'; // Reuse styles

// Generate random C between 0 and 40 (common range)
const getRandomC = () => Math.floor(Math.random() * 40);

export const ThermodynamicsPractice: React.FC = () => {
  const { t } = useTranslation('thermodynamics');
  
  // Lazy init state
  const [targetC, setTargetC] = useState<number>(() => getRandomC());
  const [input, setInput] = useState('');
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const generateNew = () => {
    setTargetC(getRandomC());
    setInput('');
    setFeedback(null);
  };

  const checkAnswer = () => {
    const val = parseInt(input, 10);
    if (isNaN(val)) return;

    const correct = celsiusToFahrenheitMental(targetC);
    
    // Allow margin of error +/- 2 degrees for mental math? 
    // Actually the rule is strict: (C*2)+30. Let's enforce exact match to the formula.
    if (val === correct) {
      setFeedback('correct');
      setStreak(s => s + 1);
      setTimeout(generateNew, 1200);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('practice_title')}</h2>
      
      <div style={{ marginBottom: '1rem', fontFamily: 'monospace' }}>
        {t('streak')}: {streak}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '300px' }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
          {targetC}°C
        </div>
        
        <div style={{ width: '100%' }}>
          <div className={styles.label} style={{ marginBottom: '0.5rem' }}>
            {t('practice_convert')}
          </div>
          <CoreBaseInput 
            value={input}
            onChangeValue={setInput}
            onEnter={checkAnswer}
            placeholder={t('practice_hint')}
            className="text-center font-mono text-xl"
            allowedChars={/^[0-9-]*$/}
          />
        </div>

        <FUIButton onClick={checkAnswer} variant="solid" style={{ width: '100%' }}>
          {t('submit')}
        </FUIButton>

        {feedback && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '0.5rem', 
            color: feedback === 'correct' ? '#4ade80' : '#f87171',
            border: `1px solid ${feedback === 'correct' ? '#4ade80' : '#f87171'}`,
            background: 'rgba(0,0,0,0.2)',
            fontFamily: 'monospace'
          }}>
            {feedback === 'correct' ? t('feedback_correct') : t('feedback_incorrect')}
          </div>
        )}
      </div>
    </FUIGlassPanel>
  );
};
