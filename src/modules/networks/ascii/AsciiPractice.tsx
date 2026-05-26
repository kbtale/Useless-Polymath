import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePracticeStreak } from '../../../hooks/usePracticeStreak';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { codeToChar } from './logic';
import styles from './Ascii.module.scss';
import clsx from 'clsx';

export const AsciiPractice: React.FC = () => {
  const { streak, setStreak } = usePracticeStreak('ascii');
  const getRandomProblem = () => {
    const code = Math.floor(Math.random() * (126 - 33 + 1)) + 33;
    return {
      code,
      char: codeToChar(code),
      mode: Math.random() > 0.5 ? 'charToCode' : 'codeToChar'
    };
  };

  const { t } = useTranslation(['ascii', 'common']);
  const [problem, setProblem] = useState(getRandomProblem);
  const targetCode = problem.code;
  const targetChar = problem.char;
  const mode = problem.mode;
  
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  
  const generateProblem = () => {
    setProblem(getRandomProblem());
    setUserAnswer('');
    setFeedback('idle');
  };

  const handleSubmit = () => {
    let corrected = false;
    if (mode === 'charToCode') {
      // User inputs code
      if (parseInt(userAnswer) === targetCode) corrected = true;
    } else {
      // User inputs char
      if (userAnswer === targetChar) corrected = true;
    }

    if (corrected) {
      setFeedback('correct');
      setStreak(s => s + 1);
      setTimeout(generateProblem, 1000);
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
            <p className={styles.label}>{mode === 'charToCode' ? t('label_convert_to_dec') : t('label_convert_to_char')}</p>
            <div style={{ fontSize: '4rem', fontFamily: 'JetBrains Mono', margin: '1rem' }}>
              {mode === 'charToCode' ? targetChar : targetCode}
            </div>
          </div>

          <div style={{ maxWidth: 200, width: '100%' }}>
            <CoreBaseInput
              value={userAnswer}
              onChangeValue={setUserAnswer}
              maxLength={3}
              placeholder="?"
              className={clsx(
                feedback === 'correct' && 'border-green-500 text-green-500', 
                feedback === 'incorrect' && 'border-red-500 text-red-500',
                "text-center text-xl"
              )}
            />
          </div>

          <FUIButton onClick={handleSubmit}>{t('submit', { ns: 'common' })}</FUIButton>

        </div>
      </FUIGlassPanel>
    </div>
  );
};
