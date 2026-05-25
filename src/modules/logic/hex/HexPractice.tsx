import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { decimalToHex, hexToDecimal } from './logic';
import styles from './Hex.module.scss';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { usePracticeStreak } from '../../../hooks/usePracticeStreak';

export const HexPractice: React.FC = () => {
  const { streak, setStreak } = usePracticeStreak('hex');
  const { t } = useTranslation(['common']);
  const getRandomRound = () => {
    const newTarget = Math.floor(Math.random() * 255);
    const correct = decimalToHex(newTarget);
    const wrong = new Set<string>();
    while (wrong.size < 3) {
      const w = Math.floor(Math.random() * 255);
      if (w !== newTarget) wrong.add(decimalToHex(w));
    }
    const all = [...Array.from(wrong), correct].sort(() => Math.random() - 0.5);
    return {
      target: newTarget,
      options: all
    };
  };

  const [round, setRound] = useState(getRandomRound);
  const target = round.target;
  const options = round.options;
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const generateRound = () => {
    setRound(getRandomRound());
    setFeedback(null);
  };

  const handleGuess = (guess: string) => {
    if (hexToDecimal(guess) === target) {
      setFeedback('correct');
      setStreak(s => s + 1);
      setTimeout(generateRound, 1000);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  return (
    <FUIGlassPanel className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.practiceTitle}>{t('practice_mode', { ns: 'common' })}</h2>
        <div className={styles.streak}>{t('streak', { ns: 'common' })}: {streak}</div>
      </div>

      <div className={styles.targetDisplay}>
        <div className={styles.label}>{t('label_convert_to_hex', { defaultValue: 'Convert to Hex' })}</div>
        <div className={styles.targetValue}>{target}</div>
      </div>

      <div className={styles.optionsGrid}>
        {options.map(opt => (
          <FUIButton 
            key={opt} 
            variant="outline" 
            onClick={() => handleGuess(opt)}
            className={styles.optionBtn}
          >
            {opt}
          </FUIButton>
        ))}
      </div>

      {feedback && (
        <div className={clsx(styles.feedback, styles[feedback])}>
          {feedback === 'correct' ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
        </div>
      )}
    </FUIGlassPanel>
  );
};
