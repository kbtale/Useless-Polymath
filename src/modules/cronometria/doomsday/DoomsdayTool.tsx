import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { SchematicDateInput } from '../../../components/core/SchematicDateInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { calculateDoomsdayWithLog } from './logic';
import type { DoomsdayLog } from './logic';
import styles from './Doomsday.module.scss';
import { useTranslation } from 'react-i18next';

export const DoomsdayTool: React.FC = () => {
  const { t } = useTranslation(['doomsday', 'common']);
  const [day, setDay] = useState('12');
  const [month, setMonth] = useState('03');
  const [year, setYear] = useState('2025');
  const [log, setLog] = useState<DoomsdayLog | null>(() => calculateDoomsdayWithLog(2025, 3, 12));

  const handleCalculate = () => {
    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);
    
    if (isNaN(d) || isNaN(m) || isNaN(y)) return;
    
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
          <SchematicDateInput 
            day={day}
            month={month}
            year={year}
            setDay={setDay}
            setMonth={setMonth}
            setYear={setYear}
          />
        </div>

        <div className={styles.buttonGroup}>
          <FUIButton onClick={handleClear} variant="outline">[ {t('clear', { ns: 'common' })} ]</FUIButton>
          <FUIButton onClick={handleCalculate} variant="solid">&lt; {t('execute', { ns: 'common' })} &gt;</FUIButton>
        </div>

        {log && (
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
                  <span>+--[ {step.title} ]---+</span>
                </div>
                <div className={styles.stepContent}>
                  <div>INPUT: {step.input}</div>
                  <div>RESULT: {step.result}</div>
                  {step.details && <div style={{ opacity: 0.6 }}>&gt; {step.details}</div>}
                </div>
              </div>
            ))}

            <div className={styles.finalResult}>
              <div className={styles.resultContent}>
                {t('final_result')} [ {t('total')} ({log.finalNumber}) ] MOD 7 ==&gt; [ {log.finalNumber} ] // {t('final_day')}: {log.finalDay.toUpperCase()}
              </div>
            </div>
          </div>
        </FUIGlassPanel>
      )}
    </div>
  );
};
