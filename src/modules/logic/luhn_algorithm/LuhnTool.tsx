import clsx from 'clsx';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreBaseInput } from '@/components/core/CoreBaseInput';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
import styles from './LuhnAlgorithm.module.scss';
import { calculateLuhnSum } from './logic';

export const LuhnTool: React.FC = () => {
  const { t } = useTranslation('luhn_algorithm');
  const [input, setInput] = useState('');

  const cleanInput = input.replace(/\D/g, '');
  const isValid = cleanInput.length > 1 && calculateLuhnSum(cleanInput) % 10 === 0;
  const digits = cleanInput.split('').map(Number);

  const visualization = [...digits].map((d, index) => {
    const distFromRight = digits.length - 1 - index;
    const isDoubled = distFromRight % 2 === 1;
    let val = d;
    if (isDoubled) {
      val *= 2;
      if (val > 9) val -= 9;
    }
    return { original: d, processed: val, isDoubled };
  });

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <div className={styles.container}>
          <h2 className={styles.title}>{t('title')}</h2>

          <p className={styles.label}>{t('label_input')}</p>
          <CoreBaseInput
            value={input}
            onChangeValue={setInput}
            placeholder="0000 0000 0000 0000"
            className={styles.numberInput}
          />

          {cleanInput.length > 1 && (
            <div className={clsx(styles.statusIndicator, isValid ? styles.valid : styles.invalid)}>
              {isValid ? t('label_valid') : t('label_invalid')}
            </div>
          )}

          <div className={styles.visualization}>
            {visualization.map((item, i) => (
              <div key={`${item.digit}-${i}`} className={styles.digitBox}>
                <div className={styles.original}>{item.original}</div>
                <div className={clsx(styles.processed, item.isDoubled && styles.doubled)}>
                  {item.processed}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FUIGlassPanel>
    </div>
  );
};
