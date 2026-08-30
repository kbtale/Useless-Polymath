import clsx from 'clsx';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import styles from './Ean13.module.scss';
import { generateEan13 } from './logic';

export const EanPractice: React.FC = () => {
  const { t } = useTranslation('ean_13');

  const [targetNumber, setTargetNumber] = useState(() => generateEan13());
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const displayBase = targetNumber.slice(0, -1);
  const correctDigit = targetNumber.slice(-1);
  const d1 = displayBase.slice(0, 1);
  const g1 = displayBase.slice(1, 7);
  const g2 = displayBase.slice(7, 12);

  const handleCheck = () => {
    if (input === correctDigit) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNext = () => {
    setTargetNumber(generateEan13());
    setInput('');
    setFeedback(null);
  };

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('practice_title')}</h2>

      <div className={styles.practiceContainer}>
        <p className={styles.label}>{t('practice_prompt')}</p>

        <div className={clsx(styles.barcodeContainer, styles.practiceBarcode)}>
          <div className={styles.digits}>
            <span>{d1}</span>
            <span>{g1}</span>
            <span>{g2}</span>
            <span className={styles.missing}>?</span>
          </div>
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
            Submit
          </FUIButton>
        )}

        {feedback && (
          <div className={styles.feedbackBox}>
            <div className={clsx(styles.feedbackMessage, styles[feedback])}>
              {t(feedback === 'correct' ? 'feedback_correct' : 'feedback_incorrect', {
                digit: correctDigit,
              })}
            </div>
            <FUIButton onClick={handleNext} variant="outline">
              Next
            </FUIButton>
          </div>
        )}
      </div>
    </FUIGlassPanel>
  );
};
