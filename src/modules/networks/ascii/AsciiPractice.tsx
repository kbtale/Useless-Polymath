import clsx from 'clsx';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreBaseInput } from '@/components/core/CoreBaseInput';
import { FUIButton } from '@/components/core/FUIButton';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
import { usePracticeStreak } from '@/hooks/usePracticeStreak';
import styles from './Ascii.module.scss';
import { codeToChar } from './logic';

export const AsciiPractice: React.FC = () => {
  const { streak, setStreak } = usePracticeStreak('ascii');
  const getRandomProblem = () => {
    const code = Math.floor(Math.random() * (126 - 33 + 1)) + 33;
    return {
      code,
      char: codeToChar(code),
      mode: Math.random() > 0.5 ? 'charToCode' : 'codeToChar',
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
      if (parseInt(userAnswer, 10) === targetCode) corrected = true;
    } else {
      if (userAnswer === targetChar) corrected = true;
    }

    if (corrected) {
      setFeedback('correct');
      setStreak((s) => s + 1);
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
          <div className={styles.headerRow}>
            <h2 className={styles.title}>{t('practice_title')}</h2>
            <span className={styles.streakDisplay}>
              {t('streak', { ns: 'common' })}: {streak}
            </span>
          </div>

          <div className={styles.questionBlock}>
            <p className={styles.label}>
              {mode === 'charToCode' ? t('label_convert_to_dec') : t('label_convert_to_char')}
            </p>
            <div className={styles.targetDisplay}>
              {mode === 'charToCode' ? targetChar : targetCode}
            </div>
          </div>

          <div className={styles.inputWrap}>
            <CoreBaseInput
              value={userAnswer}
              onChangeValue={setUserAnswer}
              maxLength={3}
              placeholder="?"
              className={clsx(
                styles.practiceInput,
                feedback === 'correct' && styles.correct,
                feedback === 'incorrect' && styles.incorrect,
              )}
            />
          </div>

          <FUIButton onClick={handleSubmit}>{t('submit', { ns: 'common' })}</FUIButton>
        </div>
      </FUIGlassPanel>
    </div>
  );
};
