
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { BAND_COLORS, calculateResistance, getRandomResistor, formatOhms } from './logic';
import styles from './ResistorCodes.module.scss';

export const ResistorPractice: React.FC = () => {
  const { t } = useTranslation('resistor_codes');
  
  const [bands, setBands] = useState<string[]>(() => getRandomResistor(4));
  const [input, setInput] = useState('');
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [lastValue, setLastValue] = useState<string>('');

  const generateNew = () => {
    setBands(getRandomResistor(4));
    setInput('');
    setFeedback(null);
  };

  const checkAnswer = () => {
    let valStr = input.trim().toLowerCase().replace(/[^0-9.km]/g, '');
    let mult = 1;
    if (valStr.endsWith('k')) { mult = 1000; valStr = valStr.slice(0, -1); }
    else if (valStr.endsWith('m')) { mult = 1000000; valStr = valStr.slice(0, -1); }
    
    const userVal = parseFloat(valStr) * mult;
    const { value: correctVal } = calculateResistance(bands, 4);

    if (Math.abs(userVal - correctVal) < 0.1) {
      setFeedback('correct');
      setStreak(s => s + 1);
      setTimeout(generateNew, 1500);
    } else {
      setFeedback('incorrect');
      setLastValue(formatOhms(correctVal));
      setStreak(0);
    }
  };

  const getHex = (name: string) => BAND_COLORS.find(c => c.name === name)?.hex ?? '#ccc';

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('practice_title')}</h2>
      
      <div style={{ marginBottom: '1rem', fontFamily: 'monospace' }}>
        {t('streak')}: {streak}
      </div>

       <div className={styles.resistorDisplay} style={{ width: '300px', height: '100px' }}>
          <svg viewBox="0 0 400 150">
            <path d="M0,75 L50,75 M350,75 L400,75" stroke="#999" strokeWidth="10" />
            <path d="M50,40 Q50,25 75,25 L325,25 Q350,25 350,40 L350,110 Q350,125 325,125 L75,125 Q50,125 50,110 Z" fill="#E8D5B5" stroke="#333" strokeWidth="2" />
            
            {bands.map((color, i) => {
              let x = 0;
              if (bands.length === 4) {
                 if (i < 3) x = 100 + (i * 40);
                 else x = 300;
              } 
              return (
                <rect key={i} x={x} y="25" width="15" height="100" fill={getHex(color)} stroke="rgba(0,0,0,0.2)"/>
              );
            })}
          </svg>
        </div>

      <div className={styles.practiceContainer}>
        <p className={styles.label} style={{ textAlign: 'center' }}>{t('practice_prompt')}</p>
        
        <CoreBaseInput 
          value={input}
          onChangeValue={setInput}
          onEnter={checkAnswer}
          placeholder="e.g. 4700 or 4.7k"
          className="text-center font-mono text-xl"
          allowedChars={/^[0-9.kKmM]*$/}
        />

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
            fontFamily: 'monospace',
            textAlign: 'center'
          }}>
            {feedback === 'correct' 
              ? t('feedback_correct') 
              : t('feedback_incorrect', { value: lastValue })
            }
          </div>
        )}
      </div>
    </FUIGlassPanel>
  );
};
