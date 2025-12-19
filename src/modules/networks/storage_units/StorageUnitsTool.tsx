import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreMarkdownRenderer } from '../../../components/core/CoreMarkdownRenderer';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { CoreSelect } from '../../../components/core/CoreSelect';
import { convertStorage, UNITS } from './logic';
import styles from './StorageUnits.module.scss';
import clsx from 'clsx';

export const StorageUnitsTool: React.FC = () => {
  const { t } = useTranslation('storage_units');
  const [amount, setAmount] = useState('1');
  const [unitIdx, setUnitIdx] = useState('3'); // GB default

  const am = parseFloat(amount);
  const results = convertStorage(am, parseInt(unitIdx));

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

          {results.length > 0 && (
            <div className={styles.resultsGrid}>
              {results.map((res) => (
                <div 
                  key={res.unit} 
                  className={clsx(
                    styles.resultCard,
                    UNITS[parseInt(unitIdx)].label === res.unit && styles.active
                  )}
                >
                  <span className={styles.resultUnit}>{res.unit}</span>
                  <span className={styles.resultValue}>{res.formatted}</span>
                </div>
              ))}
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
