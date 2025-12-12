import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { calculateDoublingTime, preciseDoublingTime } from './logic';
import styles from './Rule72.module.scss';
import { useTranslation } from 'react-i18next';

export const Rule72Tool: React.FC = () => {
  const { t } = useTranslation(['rule_72', 'common']);
  const [rate, setRate] = useState('');

  const rateNum = parseFloat(rate);
  const isValid = !isNaN(rateNum) && rateNum > 0;

  const rule72Result = isValid ? calculateDoublingTime(rateNum) : 0;
  const preciseResult = isValid ? preciseDoublingTime(rateNum) : 0;

  const diff = Math.abs(rule72Result - preciseResult);
  const percentError = preciseResult > 0 ? (diff / preciseResult) * 100 : 0;

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('title')}</h2>

      <div className={styles.container}>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>{t('interest_rate')}</label>
          <CoreBaseInput
            value={rate}
            onChangeValue={setRate}
            allowedChars={/[0-9.]/}
            maxLength={5}
            placeholder="e.g. 8"
          />
        </div>

        {isValid && (
          <div className={styles.results}>
            <div className={styles.resultBox}>
              <span className={styles.resultLabel}>{t('years_rule_72')}</span>
              <span className={styles.resultValue}>{rule72Result.toFixed(2)}</span>
            </div>

             <div className={styles.resultBox}>
              <span className={styles.resultLabel}>{t('years_precise')}</span>
              <div className={styles.resultValue} style={{ fontSize: '1.5rem', marginTop: '0.4rem' }}>
                {preciseResult.toFixed(2)}
              </div>
              <div className={styles.difference}>
                 {t('error')}: {percentError.toFixed(2)}%
              </div>
            </div>
          </div>
        )}

      </div>
    </FUIGlassPanel>
  );
};
