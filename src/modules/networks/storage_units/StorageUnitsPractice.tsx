import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { generatePracticeProblem, calculateAnswer, UNITS, formatValue } from './logic';
import styles from './StorageUnits.module.scss';
import clsx from 'clsx';

export const StorageUnitsPractice: React.FC = () => {
  const { t } = useTranslation(['storage_units', 'common']);
  const [problem, setProblem] = useState({ fromIdx: 3, toIdx: 1, amount: 1 });
  
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [streak, setStreak] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const newProblem = useCallback(() => {
    setProblem(generatePracticeProblem());
    setUserAnswer('');
    setFeedback('idle');
    setShowAnswer(false);
  }, []);

  useEffect(() => {
    newProblem();
  }, [newProblem]);

  const correctAnswer = calculateAnswer(problem.amount, problem.fromIdx, problem.toIdx);

  const handleSubmit = () => {
    const val = parseFloat(userAnswer);
    // Allow 1% margin for floating point
    const margin = Math.abs(correctAnswer * 0.01);
    
    if (Math.abs(val - correctAnswer) <= Math.max(margin, 0.01)) {
      setFeedback('correct');
      setStreak(s => s + 1);
      setTimeout(newProblem, 1200);
    } else {
      setFeedback('incorrect');
      setStreak(0);
      setShowAnswer(true);
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
            <p className={styles.label}>{t('practice_question_convert')}</p>
            <div className={styles.problemDisplay}>
              <span className={styles.problemAmount}>{problem.amount}</span>
              <span className={styles.problemUnit}>{UNITS[problem.fromIdx].label}</span>
              <span className={styles.problemArrow}>→</span>
              <span className={styles.problemUnit}>{UNITS[problem.toIdx].label}</span>
            </div>
          </div>

          <div style={{ maxWidth: 200, width: '100%' }}>
            <CoreBaseInput
              value={userAnswer}
              onChangeValue={setUserAnswer}
              placeholder="?"
              allowedChars={/^[0-9.eE+-]*$/}
              className={clsx(
                feedback === 'correct' && 'border-green-500 text-green-500', 
                feedback === 'incorrect' && 'border-red-500 text-red-500',
                "text-center text-xl"
              )}
            />
          </div>

          <FUIButton onClick={handleSubmit}>{t('execute', { ns: 'common' })}</FUIButton>
          
          {showAnswer && (
            <p className={styles.label} style={{ marginTop: '1rem', color: '#f87171' }}>
              {t('practice_answer')}: {formatValue(correctAnswer)}
            </p>
          )}

          <p className={styles.label} style={{ marginTop: '1rem', fontSize: '0.7rem' }}>
             {t('practice_hint_convert')}
          </p>

        </div>
      </FUIGlassPanel>
    </div>
  );
};
