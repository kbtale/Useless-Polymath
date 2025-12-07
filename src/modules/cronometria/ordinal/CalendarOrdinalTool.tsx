import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { getOrdinalDate } from './logic';
import styles from './Ordinal.module.scss';

export const CalendarOrdinalTool: React.FC = () => {
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
        <h2 className={styles.title}>CALENDAR ORDINAL</h2>
        
        <label className={styles.label}>TARGET DATE</label>
        
        <div className={styles.dateInputContainer}>
          <div className={`${styles.dateBlock} ${styles.icon}`}>📅</div>
          <input 
            className={styles.dateBlock} 
            placeholder="MM" 
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            maxLength={2}
          />
          <input 
            className={styles.dateBlock} 
            placeholder="DD" 
            value={day}
            onChange={(e) => setDay(e.target.value)}
            maxLength={2}
          />
          <input 
            className={`${styles.dateBlock} ${styles.year}`} 
            placeholder="YYYY" 
            value={year}
            onChange={(e) => setYear(e.target.value)}
            maxLength={4}
          />
        </div>

        <div className={styles.buttonGroup}>
          <FUIButton onClick={handleClear} variant="outline">[ CLEAR ]</FUIButton>
          <FUIButton onClick={handleCalculate} variant="solid">&lt; EXECUTE &gt;</FUIButton>
        </div>
      </FUIGlassPanel>

      {result && (
        <FUIGlassPanel className={styles.panel}>
          <h2 className={styles.title}>ORDINAL CALCULATION</h2>
          
          <div className={styles.resultContainer}>
            <div className={styles.resultRow}>
              <span className={styles.key}>ORDINAL DAY</span>
              <span className={styles.value}>DAY {result.ordinal}</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.key}>REMAINING</span>
              <span className={styles.value}>{result.remaining} DAYS</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.key}>YEAR PROGRESS</span>
              <span className={styles.value}>{result.percentage}%</span>
            </div>
            
            <div className={styles.progressBar}>
              <div className={styles.fill} style={{ width: `${result.percentage}%` }}></div>
              <div className={styles.text}>{result.percentage}% COMPLETE</div>
            </div>
          </div>
        </FUIGlassPanel>
      )}
    </div>
  );
};
