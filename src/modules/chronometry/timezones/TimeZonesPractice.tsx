import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { COMMON_ZONES, calculateDestinationTime } from './logic';
import styles from './TimeZones.module.scss';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { usePracticeStreak } from '../../../hooks/usePracticeStreak';

export const TimeZonesPractice: React.FC = () => {
  const { streak, setStreak } = usePracticeStreak('timezones');
  const { t } = useTranslation(['common']);
  const getRandomRound = () => {
    const originIdx = Math.floor(Math.random() * COMMON_ZONES.length);
    let destIdx = Math.floor(Math.random() * COMMON_ZONES.length);
    while (destIdx === originIdx) destIdx = Math.floor(Math.random() * COMMON_ZONES.length);
    const hour = Math.floor(Math.random() * 24);
    const correct = calculateDestinationTime(hour, COMMON_ZONES[originIdx].offset, COMMON_ZONES[destIdx].offset).hour;
    const opts = new Set<number>();
    opts.add(correct);
    while (opts.size < 4) {
      opts.add(Math.floor(Math.random() * 24));
    }
    return {
      question: { originIdx, destIdx, hour },
      options: Array.from(opts).sort((a, b) => a - b)
    };
  };

  const [round, setRound] = useState(getRandomRound);
  const question = round.question;
  const options = round.options;
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const generateRound = () => {
    setRound(getRandomRound());
    setFeedback(null);
  };

  const handleGuess = (guess: number) => {
    if (!question) return;
    const correct = calculateDestinationTime(question.hour, COMMON_ZONES[question.originIdx].offset, COMMON_ZONES[question.destIdx].offset).hour;
    
    if (guess === correct) {
      setFeedback('correct');
      setStreak(s => s + 1);
      setTimeout(generateRound, 1000);
    } else {
      setFeedback('incorrect');
      setStreak(0);
    }
  };

  if (!question) return null;

  const origin = COMMON_ZONES[question.originIdx];
  const dest = COMMON_ZONES[question.destIdx];

  return (
    <FUIGlassPanel className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.practiceTitle}>{t('practice_mode', { ns: 'common' })}</h2>
        <div className={styles.streak}>{t('streak', { ns: 'common' })}: {streak}</div>
      </div>

      <div className={styles.problemDisplay}>
        <div>
          If it's <span className={styles.highlight}>{question.hour}:00</span> in <br/>
          <span className={styles.locationName}>{origin.name}</span>
        </div>
        <div className={styles.questionBlock}>
          What time is it in <br/>
          <span className={styles.locationName}>{dest.name}</span>?
        </div>
      </div>

      <div className={styles.optionsGrid}>
        {options.map(opt => (
          <FUIButton 
            key={opt} 
            variant="outline" 
            onClick={() => handleGuess(opt)}
            className={styles.optionBtn}
          >
            {opt}:00
          </FUIButton>
        ))}
      </div>

      {feedback && (
        <div className={clsx(styles.feedback, styles[feedback])}>
          {feedback === 'correct' ? 'SYNC ESTABLISHED' : 'SYNC FAILED'}
        </div>
      )}
    </FUIGlassPanel>
  );
};
