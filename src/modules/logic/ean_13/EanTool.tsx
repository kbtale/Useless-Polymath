import clsx from 'clsx';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreBaseInput } from '@/components/core/CoreBaseInput';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
import styles from './Ean13.module.scss';
import { isValidEan13 } from './logic';

export const EanTool: React.FC = () => {
  const { t } = useTranslation('ean_13');
  const [input, setInput] = useState('');

  const cleanInput = input.replace(/\D/g, '');
  const isValid = isValidEan13(cleanInput);

  const d1 = cleanInput.slice(0, 1);
  const g1 = cleanInput.slice(1, 7);
  const g2 = cleanInput.slice(7, 13);

  const renderBars = () => {
    if (cleanInput.length < 13) return null;
    return (
      <div className={styles.bars}>
        <div className={clsx(styles.bar, styles.thin)} />
        <div className={clsx(styles.bar, styles.thin)} />

        {cleanInput.split('').map((d, i) => (
          <div
            key={`${d}-${i}`}
            className={clsx(styles.bar, styles.short, styles.digitBar)}
            style={{ opacity: Number(d) % 2 === 0 ? 1 : 0.3 }}
          />
        ))}

        <div className={clsx(styles.bar, styles.thin)} />
        <div className={clsx(styles.bar, styles.thin)} />
      </div>
    );
  };

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <div className={styles.container}>
          <h2 className={styles.title}>{t('title')}</h2>

          <label htmlFor="ean-input" className={styles.label}>{t('label_input')}</label>
          <CoreBaseInput
            id="ean-input"
            value={input}
            onChangeValue={setInput}
            allowedChars={/^[0-9]*$/}
            maxLength={13}
            placeholder="0000000000000"
            className={styles.numberInput}
          />

          {cleanInput.length === 13 && (
            <div className={clsx(styles.statusIndicator, isValid ? styles.valid : styles.invalid)}>
              {isValid ? t('label_valid') : t('label_invalid')}
            </div>
          )}

          {cleanInput.length > 0 && (
            <div className={styles.barcodeContainer}>
              {renderBars()}
              <div className={styles.digits}>
                <span>{d1}</span>
                <span>{g1}</span>
                <span>{g2}</span>
              </div>
            </div>
          )}
        </div>
      </FUIGlassPanel>
    </div>
  );
};
