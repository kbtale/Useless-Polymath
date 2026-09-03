import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreDateInput } from '@/components/core/CoreDateInput';
import { FUIButton } from '@/components/core/FUIButton';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
import styles from './Doomsday.module.scss';
import { type DoomsdayLog, calculateDoomsdayWithLog } from './logic';

const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const DoomsdayTool: React.FC = () => {
  const { t } = useTranslation(['doomsday', 'common']);
  const [day, setDay] = useState('12');
  const [month, setMonth] = useState('03');
  const [year, setYear] = useState('2025');
  const [log, setLog] = useState<DoomsdayLog | null>(() => calculateDoomsdayWithLog(2025, 3, 12));

  const handleCalculate = () => {
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (Number.isNaN(d) || Number.isNaN(m) || Number.isNaN(y)) {
      setLog(null);
      return;
    }

    const resultLog = calculateDoomsdayWithLog(y, m, d);
    setLog(resultLog);
  };

  const handleClear = () => {
    setDay('');
    setMonth('');
    setYear('');
    setLog(null);
  };

  return (
    <div className={styles.toolLayout}>
      <FUIGlassPanel className={styles.panel}>
        <h2 className={styles.title}>{t('title')}</h2>

        <label className={styles.label}>{t('target_date', { ns: 'common' })}</label>

        <div className={styles.dateInputContainer}>
          <CoreDateInput
            day={day}
            month={month}
            year={year}
            setDay={setDay}
            setMonth={setMonth}
            setYear={setYear}
          />
        </div>

        <div className={styles.buttonGroup}>
          <FUIButton onClick={handleClear} variant="outline">
            {t('clear', { ns: 'common' })}
          </FUIButton>
          <FUIButton onClick={handleCalculate} variant="solid">
            {t('calculate', { ns: 'common' })}
          </FUIButton>
        </div>

        {log?.finalDay && (
          <div className={styles.resultDisplay}>
            <div className={styles.resultLabel}>{t('calculated_day', { ns: 'common' })}</div>
            <div className={styles.resultValue}>{log.finalDay.toUpperCase()}</div>
            <div className={styles.helperText}>{t('see_full_calculations', { ns: 'common' })}</div>
          </div>
        )}
      </FUIGlassPanel>

      {log && (
        <FUIGlassPanel className={styles.panel}>
          <h2 className={styles.title}>{t('log_title')}</h2>

          <div className={styles.logContainer}>
            {log.steps.map((step, idx) => (
              <div key={idx} className={styles.logStep}>
                <div className={styles.stepHeader}>
                  <span>
                    {t('step', { ns: 'common' })} {idx + 1}: {step.title}
                  </span>
                </div>
                <div className={styles.stepContent}>
                  <div>{t('input_label', { ns: 'common' })}: {step.input}</div>
                  <div>{t('result_label', { ns: 'common' })}: {step.result}</div>
                  {step.details && <div className={styles.stepDetails}>{step.details}</div>}
                </div>
              </div>
            ))}

            <div className={styles.finalResult}>
              <div className={styles.resultContent}>
                {t('final_result')}: {t('total')} ({log.finalNumber}) MOD 7 = {log.finalNumber} (
                {toTitleCase(log.finalDay || '')})
              </div>
            </div>
          </div>
        </FUIGlassPanel>
      )}
    </div>
  );
};
