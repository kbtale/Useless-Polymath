import clsx from 'clsx';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { usePracticeStreak } from '../../../hooks/usePracticeStreak';
import styles from './Thermodynamics.module.scss';
import { celsiusToFahrenheitMental } from './logic';

const getRandomC = () => Math.floor(Math.random() * 40);

export const ThermodynamicsPractice: React.FC = () => {
  const { streak, setStreak } = usePracticeStreak('thermodynamics');
  const { t } = useTranslation('thermodynamics');

  const [targetC, setTargetC] = useState<number>(() => getRandomC());
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const generateNew = () => {
    setTargetC(getRandomC());
    setInput('');
    setFeedback(null);
  };

  const checkAnswer = () => {
    const val = parseInt(input, 10);
    if (Number.isNaN(val)) return;

    const correct = celsiusToFahrenheitMental(targetC);

    if (val === correct) {
      setFeedback('correct');
      setStreak((s) => s + 1);
      setTimeout(generateNew, 1200);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('practice_title')}</h2>

      <div className={styles.streakDisplay}>
        {t('streak')}: {streak}
      </div>

      <div className={styles.practiceLayout}>
        <div className={styles.targetTemp}>{targetC}°C</div>

        <div style={{ width: '100%' }}>
          <div className={styles.label} style={{ marginBottom: '0.5rem' }}>
            {t('practice_convert')}
          </div>
          <CoreBaseInput
            value={input}
            onChangeValue={setInput}
            onEnter={checkAnswer}
            placeholder={t('practice_hint')}
            className={styles.practiceInput}
            allowedChars={/^[0-9-]*$/}
          />
        </div>

        <FUIButton onClick={checkAnswer} variant="solid" style={{ width: '100%' }}>
          {t('submit')}
        </FUIButton>

        {feedback && (
          <div className={clsx(styles.feedbackBox, styles[feedback])}>
            {feedback === 'correct' ? t('feedback_correct') : t('feedback_incorrect')}
          </div>
        )}
      </div>
    </FUIGlassPanel>
  );
};
