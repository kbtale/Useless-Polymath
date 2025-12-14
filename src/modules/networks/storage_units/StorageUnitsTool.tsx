import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreMarkdownRenderer } from '../../../components/core/CoreMarkdownRenderer';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { CoreSelect } from '../../../components/core/CoreSelect';
import { calculateStorage, UNITS } from './logic';
import styles from './StorageUnits.module.scss';
import clsx from 'clsx';

export const StorageUnitsTool: React.FC = () => {
  const { t } = useTranslation('storage_units');
  const [amount, setAmount] = useState('1');
  const [unitIdx, setUnitIdx] = useState('2'); // GB default

  const am = parseFloat(amount);
  const result = calculateStorage(am, parseInt(unitIdx));

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <div className={styles.container}>
          <h2 className={styles.title}>{t('title')}</h2>

          <div className={styles.inputSection}>
            <div style={{ flex: 1 }}>
              <label className={styles.label}>{t('label_amount')}</label>
              <CoreBaseInput
                value={amount}
                onChangeValue={setAmount}
                allowedChars={/^[0-9.]*$/}
              />
            </div>
            <div style={{ width: 100 }}>
               <label className={styles.label}>{t('label_unit')}</label>
               <CoreSelect
                 value={unitIdx}
                 onChange={setUnitIdx}
                 options={UNITS.map((u, i) => ({ value: i.toString(), label: u.label }))}
               />
            </div>
          </div>

          {result && (
            <div className={styles.comparison}>
              <div className={styles.compRow}>
                <span className={styles.compLabel}>{t('label_market_bytes')}</span>
                <span className={styles.compValue}>{result.marketBytes.toLocaleString()} B</span>
              </div>

              <div className={styles.compRow}>
                <span className={styles.compLabel}>{t('label_result')}</span>
                <span className={styles.compValue}>{result.windowsValue.toFixed(2)} {result.unitLabel}</span>
              </div>

               <div className={clsx(styles.compRow, styles.highlight)}>
                <span className={styles.compLabel}>{t('label_difference')}</span>
                <span className={styles.compValue}>-{result.diffPercent.toFixed(2)}%</span>
              </div>

              <div className={styles.barChart}>
                 <div className={styles.barLabel}>{t('label_chart_market')}</div>
                 <div className={styles.barTrack}>
                   <div className={styles.barFill} style={{ width: '100%', background: '#4ade80' }}>
                     {am} {result.unitLabel}
                   </div>
                 </div>
                 
                 <div className={styles.barLabel}>{t('label_chart_windows')}</div>
                 <div className={styles.barTrack}>
                   <div className={styles.barFill} style={{ width: `${100 - result.diffPercent}%`, background: '#f87171' }}>
                     {result.windowsValue.toFixed(2)} {result.unitLabel}
                   </div>
                 </div>
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
