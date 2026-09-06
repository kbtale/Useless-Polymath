import clsx from 'clsx';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreBaseInput } from '@/components/core/CoreBaseInput';
import { CoreSelect } from '@/components/core/CoreSelect';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
import styles from './StorageUnits.module.scss';
import {
  STORAGE_UNITS,
  type StorageUnitSymbol,
  convertStorageBySymbol,
} from './logic';

export const StorageUnitsTool: React.FC = () => {
  const { t } = useTranslation('storage_units');
  const [amountInput, setAmountInput] = useState('1');
  const [selectedUnit, setSelectedUnit] = useState<StorageUnitSymbol>('GB');

  const parsedAmount = parseFloat(amountInput);
  const conversionResults = convertStorageBySymbol(parsedAmount, selectedUnit);

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <div className={styles.container}>
          <h2 className={styles.title}>{t('title')}</h2>

          <div className={styles.inputSection}>
            <div className={styles.amountField}>
              <label htmlFor="storage-amount-input" className={styles.label}>{t('label_amount')}</label>
              <CoreBaseInput
                id="storage-amount-input"
                value={amountInput}
                onChangeValue={setAmountInput}
                allowedChars={/^[0-9.]*$/}
              />
            </div>
            <div className={styles.unitField}>
              <label htmlFor="storage-unit-select" className={styles.label}>{t('label_unit')}</label>
              <CoreSelect
                id="storage-unit-select"
                value={selectedUnit}
                onChange={(val) => setSelectedUnit(val as StorageUnitSymbol)}
                options={STORAGE_UNITS.map((unit) => ({ value: unit.symbol, label: unit.label }))}
              />
            </div>
          </div>

          {conversionResults.length > 0 && (
            <div className={styles.resultsGrid}>
              {conversionResults.map((result) => (
                <div
                  key={result.unit}
                  className={clsx(
                    styles.resultCard,
                    selectedUnit === result.unit && styles.active,
                  )}
                >
                  <span className={styles.resultUnit}>{result.unit}</span>
                  <span className={styles.resultValue}>{result.formatted}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </FUIGlassPanel>
    </div>
  );
};
