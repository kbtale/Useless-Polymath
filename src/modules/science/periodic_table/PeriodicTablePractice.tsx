
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { ELEMENTS } from './logic';
import type { Element } from './logic';
import clsx from 'clsx';
import styles from './PeriodicTablePractice.module.scss';

const getRandomElement = () => ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];

export const PeriodicTablePractice: React.FC = () => {
  const { t } = useTranslation('periodic_table');
  const [target, setTarget] = useState<Element | null>(() => getRandomElement());
  const [input, setInput] = useState('');
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const generateNew = () => {
    setTarget(getRandomElement());
    setInput('');
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (!target) return;
    
    // Check if input matches Symbol
    if (input.trim().toLowerCase() === target.symbol.toLowerCase()) {
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
      <div className={styles.header}>
        <h2 className={styles.practiceTitle}>{t('practice_title')}</h2>
        <div className={styles.streak}>{t('streak')}: {streak}</div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <span className={styles.prompt}>{t('element_name')}</span>
          <span className={styles.value}>{target ? t(`elements.${target.symbol}`) : '...'}</span>
        </div>

        <div className={styles.inputArea}>
          <label className={styles.label}>{t('enter_symbol')}</label>
          <CoreBaseInput
            value={input}
            onChangeValue={setInput}
            onEnter={checkAnswer}
            maxLength={3}
            autoFocus
            transformToUpper
            className="text-center font-mono text-xl"
            placeholder={t('placeholder_example')}
          />
          <FUIButton onClick={checkAnswer} variant="solid" style={{ width: '100%' }}>
            {t('submit')}
          </FUIButton>
        </div>
      </div>

      {feedback && (
        <div className={clsx(styles.feedback, styles[feedback])}>
          {feedback === 'correct' 
            ? t('confirmed') 
            : `${t('access_denied')}: ${target?.symbol}`
          }
        </div>
      )}
    </FUIGlassPanel>
  );
};
