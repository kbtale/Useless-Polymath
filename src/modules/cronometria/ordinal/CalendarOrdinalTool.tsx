import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { SchematicDateInput } from '../../../components/core/SchematicDateInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { getOrdinalDate } from './logic';
import styles from './Ordinal.module.scss';
import { useTranslation } from 'react-i18next';

export const CalendarOrdinalTool: React.FC = () => {
  const { t } = useTranslation(['ordinal', 'common']);
  const [day, setDay] = useState('01');
  const [month, setMonth] = useState('01');
  const [year, setYear] = useState('2025');
  const [result, setResult] = useState<{ ordinal: number, totalDays: number, percentage: string, remaining: number } | null>(null);

  const handleCalculate = () => {
    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);
    
    if (isNaN(d) || isNaN(m) || isNaN(y)) return;
    
    const res = getOrdinalDate(d, m, y);
    setResult(res);
  };

  const handleClear = () => {
    setDay('');
    setMonth('');
    setYear('');
    setResult(null);
  };

  return (
    <div className={styles.toolLayout}>
      <FUIGlassPanel className={styles.panel}>
        <h2 className={styles.title}>{t('tool_title')}</h2>
        
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
      </FUIGlassPanel>

      {result && (
        <FUIGlassPanel className={styles.panel}>
          <h2 className={styles.title}>{t('result_title')}</h2>
          
          <div className={styles.resultContainer}>
            <div className={styles.resultRow}>
              <span className={styles.key}>{t('ordinal_day')}</span>
              <span className={styles.value}>{t('days', { ns: 'ordinal', defaultValue: 'DAY' })} {result.ordinal}</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.key}>{t('remaining')}</span>
              <span className={styles.value}>{result.remaining} {t('days')}</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.key}>{t('year_progress')}</span>
              <span className={styles.value}>{result.percentage}%</span>
            </div>
            
            <div className={styles.progressBar}>
              <div className={styles.fill} style={{ width: `${result.percentage}%` }}></div>
              <div className={styles.text}>{result.percentage}% {t('complete')}</div>
            </div>
          </div>
        </FUIGlassPanel>
      )}
    </div>
  );
};
