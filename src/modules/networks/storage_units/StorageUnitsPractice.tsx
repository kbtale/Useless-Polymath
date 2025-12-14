import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { calculateStorage, UNITS } from './logic';
import styles from './StorageUnits.module.scss';
import clsx from 'clsx';

export const StorageUnitsPractice: React.FC = () => {
  const { t } = useTranslation(['storage_units', 'common']);
  const [targetAmount, setTargetAmount] = useState(1);
  const [targetUnitIdx, setTargetUnitIdx] = useState(2); // GB
  
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [streak, setStreak] = useState(0);

  const generateProblem = () => {
    setTargetAmount(Math.floor(Math.random() * 10) + 1); // 1-10
    setTargetUnitIdx(Math.floor(Math.random() * 3) + 2); // GB, TB, PB (skip KB/MB usually too easy/hard)
    setUserAnswer('');
    setFeedback('idle');
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const handleSubmit = () => {
    const res = calculateStorage(targetAmount, targetUnitIdx);
    if (!res) return;
    
    // Allow small margin of error (e.g. 0.05)
    const val = parseFloat(userAnswer);
    if (Math.abs(val - res.windowsValue) < 0.1) {
      setFeedback('correct');
      setStreak(s => s + 1);
      setTimeout(generateProblem, 1500);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <div className={styles.container}>
           <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
             <h2 className={styles.title}>{t('practice_title')}</h2>
             <span style={{ fontFamily: 'JetBrains Mono', color: '#4ade80' }}>{t('streak', { ns: 'common' })}: {streak}</span>
          </div>

          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <p className={styles.label}>
              {t('practice_question', { amount: targetAmount, unit: UNITS[targetUnitIdx].label })}
            </p>
          </div>

          <div style={{ maxWidth: 200, width: '100%' }}>
            <CoreBaseInput
              value={userAnswer}
              onChangeValue={setUserAnswer}
              placeholder="0.00"
              className={clsx(
                feedback === 'correct' && 'border-green-500 text-green-500', 
                feedback === 'incorrect' && 'border-red-500 text-red-500',
                "text-center text-xl"
              )}
            />
          </div>

          <FUIButton onClick={handleSubmit}>{t('execute', { ns: 'common' })}</FUIButton>
          
          <p className={styles.label} style={{ marginTop: '1rem', fontSize: '0.7rem' }}>
             {t('practice_hint')}
          </p>

        </div>
      </FUIGlassPanel>
    </div>
  );
};
