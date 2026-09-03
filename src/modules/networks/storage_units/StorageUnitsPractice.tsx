import clsx from 'clsx';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreBaseInput } from '@/components/core/CoreBaseInput';
import { FUIButton } from '@/components/core/FUIButton';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
import { usePracticeStreak } from '@/hooks/usePracticeStreak';
import styles from './StorageUnits.module.scss';
import { UNITS, calculateAnswer, formatValue, generatePracticeProblem } from './logic';

export const StorageUnitsPractice: React.FC = () => {
  const { streak, setStreak } = usePracticeStreak('storage_units');
  const { t } = useTranslation(['storage_units', 'common']);
  const [problem, setProblem] = useState(generatePracticeProblem);

  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showAnswer, setShowAnswer] = useState(false);

  const newProblem = () => {
    setProblem(generatePracticeProblem());
    setUserAnswer('');
    setFeedback('idle');
    setShowAnswer(false);
  };

  const correctAnswer = calculateAnswer(problem.amount, problem.fromIdx, problem.toIdx);

  const handleSubmit = () => {
    const val = parseFloat(userAnswer);
    const margin = Math.abs(correctAnswer * 0.01);

    if (Math.abs(val - correctAnswer) <= Math.max(margin, 0.01)) {
      setFeedback('correct');
      setStreak((s) => s + 1);
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
          <div className={styles.headerRow}>
            <h2 className={styles.title}>{t('practice_title')}</h2>
            <span className={styles.streakDisplay}>
              {t('streak', { ns: 'common' })}: {streak}
            </span>
          </div>

          <div className={styles.questionBlock}>
            <p className={styles.label}>{t('practice_question_convert')}</p>
            <div className={styles.problemDisplay}>
              <span className={styles.problemAmount}>{problem.amount}</span>
              <span className={styles.problemUnit}>{UNITS[problem.fromIdx].label}</span>
              <span className={styles.problemArrow}>→</span>
              <span className={styles.problemUnit}>{UNITS[problem.toIdx].label}</span>
            </div>
          </div>

          <div className={styles.inputWrap}>
            <CoreBaseInput
              value={userAnswer}
              onChangeValue={setUserAnswer}
              placeholder="?"
              allowedChars={/^[0-9.eE+-]*$/}
              className={clsx(
                styles.practiceInput,
                feedback === 'correct' && styles.correct,
                feedback === 'incorrect' && styles.incorrect,
              )}
            />
          </div>

          <FUIButton onClick={handleSubmit}>{t('submit', { ns: 'common' })}</FUIButton>

          {showAnswer && (
            <p className={clsx(styles.label, styles.answerDisplay)}>
              {t('practice_answer')}: {formatValue(correctAnswer)}
            </p>
          )}

          <p className={clsx(styles.label, styles.hintDisplay)}>{t('practice_hint_convert')}</p>
        </div>
      </FUIGlassPanel>
    </div>
  );
};
