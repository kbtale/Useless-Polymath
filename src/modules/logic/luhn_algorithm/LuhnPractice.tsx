import clsx from 'clsx';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreBaseInput } from '@/components/core/CoreBaseInput';
import { FUIButton } from '@/components/core/FUIButton';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
import { usePracticeStreak } from '@/hooks/usePracticeStreak';
import styles from './LuhnAlgorithm.module.scss';
import { generateLuhnNumber } from './logic';

export const LuhnPractice: React.FC = () => {
  const { streak, setStreak } = usePracticeStreak('luhn_algorithm');
  const { t } = useTranslation(['luhn_algorithm', 'common']);

  const [targetNumber, setTargetNumber] = useState(() => generateLuhnNumber(16));
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const displayBase = targetNumber.slice(0, -1);
  const correctDigit = targetNumber.slice(-1);

  const handleCheck = () => {
    if (input === correctDigit) {
      setFeedback('correct');
      setStreak((s) => s + 1);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  const handleNext = () => {
    setTargetNumber(generateLuhnNumber(16));
    setInput('');
    setFeedback(null);
  };

  return (
    <FUIGlassPanel className={styles.panel}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>{t('practice_title')}</h2>
        <span className={styles.streakValue}>
          {t('streak', { ns: 'common' })}: {streak}
        </span>
      </div>

      <div className={styles.practiceContainer}>
        <p className={styles.label}>{t('practice_prompt')}</p>

        <div className={styles.quizNumber}>
          {displayBase.split('').map((d, i) => (
            <span key={`${d}-${i}`} className={styles.dimmed}>
              {d}
            </span>
          ))}
          <span className={styles.missing}>?</span>
        </div>

        <CoreBaseInput
          value={input}
          onChangeValue={(v) => setInput(v.slice(0, 1))}
          onEnter={handleCheck}
          placeholder="?"
          allowedChars={/^[0-9]*$/}
          className={styles.checkDigitInput}
        />

        {!feedback && (
          <FUIButton onClick={handleCheck} disabled={!input} variant="solid">
            {t('submit', { ns: 'common' })}
          </FUIButton>
        )}

        {feedback && (
          <>
            <div className={clsx(styles.feedbackMessage, styles[feedback])}>
              {t(feedback === 'correct' ? 'feedback_correct' : 'feedback_incorrect', {
                digit: correctDigit,
              })}
            </div>
            <FUIButton onClick={handleNext} variant="outline">
              {t('next', { ns: 'common' })}
            </FUIButton>
          </>
        )}
      </div>
    </FUIGlassPanel>
  );
};
