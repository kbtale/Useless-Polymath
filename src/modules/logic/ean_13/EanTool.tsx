
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreMarkdownRenderer } from '../../../components/core/CoreMarkdownRenderer';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { isValidEan13 } from './logic';
import styles from './Ean13.module.scss';
import clsx from 'clsx';

export const EanTool: React.FC = () => {
  const { t } = useTranslation('ean_13');
  const [input, setInput] = useState('');

  const cleanInput = input.replace(/\D/g, '');
  const isValid = isValidEan13(cleanInput);
  
  // Simple visualizer: First digit, then two groups of 6
  // EAN-13 Structure: D1 [G1: 6 Digits] [G2: 6 Digits]
  const d1 = cleanInput.slice(0, 1);
  const g1 = cleanInput.slice(1, 7);
  const g2 = cleanInput.slice(7, 13);

  // Generate some "fake" bars based on digits for aesthetic visualization
  // In real EAN, encoding is complex (A/B/C parity). Here we just render stripes.
  const renderBars = () => {
    if (cleanInput.length < 13) return null;
    return (
       <div className={styles.bars}>
         {/* Start Guard */}
         <div className={clsx(styles.bar, styles.thin)} />
         <div className={clsx(styles.bar, styles.thin)} />
         
         {/* Data Bars (Schematic) */}
         {cleanInput.split('').map((d, i) => (
            <div key={i} className={clsx(styles.bar, styles.short)} style={{ opacity: Number(d) % 2 === 0 ? 1 : 0.3, width: '3px' }} />
         ))}

         {/* Center Guard */}
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
        
        <label className={styles.label}>{t('label_input')}</label>
            <CoreBaseInput
              value={input}
              onChangeValue={setInput}
              allowedChars={/^[0-9]*$/}
              maxLength={13}
              placeholder="0000000000000"
              className="font-mono text-center text-xl"
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

      <FUIGlassPanel className={styles.panel}>
         <CoreMarkdownRenderer content={t('guide')} />
      </FUIGlassPanel>
    </div>
  );
};
