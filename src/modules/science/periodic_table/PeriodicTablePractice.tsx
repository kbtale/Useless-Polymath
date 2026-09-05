import clsx from 'clsx';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreBaseInput } from '@/components/core/CoreBaseInput';
import { FUIButton } from '@/components/core/FUIButton';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
import { usePracticeStreak } from '@/hooks/usePracticeStreak';
import styles from './PeriodicTablePractice.module.scss';
import { ELEMENTS, type Element } from './logic';

const getRandomElement = () => ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];

export const PeriodicTablePractice: React.FC = () => {
  const { streak, setStreak } = usePracticeStreak('periodic_table');
  const { t } = useTranslation('periodic_table');
  const [target, setTarget] = useState<Element | null>(() => getRandomElement());
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const generateNew = () => {
    setTarget(getRandomElement());
    setInput('');
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (!target) return;

    if (input.trim().toLowerCase() === target.symbol.toLowerCase()) {
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
      <div className={styles.header}>
        <h2 className={styles.practiceTitle}>{t('practice_title')}</h2>
        <div className={styles.streak}>
          {t('streak')}: {streak}
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <span className={styles.prompt}>{t('element_name')}</span>
          <span className={styles.value}>{target ? t(`elements.${target.symbol}`) : '...'}</span>
        </div>

        <div className={styles.inputArea}>
<label htmlFor="periodic-symbol-input" className={styles.label}>{t('enter_symbol')}</label>
            <CoreBaseInput
              id="periodic-symbol-input"
            value={input}
            onChangeValue={setInput}
            onEnter={checkAnswer}
            maxLength={3}
            autoFocus
            transformToUpper
            className={styles.symbolInput}
            placeholder={t('placeholder_example')}
          />
          <FUIButton onClick={checkAnswer} variant="solid" className={styles.wideButton}>
            {t('submit')}
          </FUIButton>
        </div>
      </div>

      {feedback && (
        <div className={clsx(styles.feedback, styles[feedback])}>
          {feedback === 'correct' ? t('confirmed') : `${t('access_denied')}: ${target?.symbol}`}
        </div>
      )}
    </FUIGlassPanel>
  );
};
