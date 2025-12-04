import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { FUIButton } from '../../../components/core/FUIButton';
import { calculateDoomsdayWithLog } from './logic';
import type { DoomsdayLog } from './logic';
import styles from './Doomsday.module.scss';

export const DoomsdayTool: React.FC = () => {
  const [day, setDay] = useState('12');
  const [month, setMonth] = useState('03');
  const [year, setYear] = useState('2025');
  // Initialize with default calculation so UI is full on load
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
      {/* INPUT PANEL */}
      <FUIGlassPanel className={styles.panel}>
        <h2 className={styles.title}>DOOMSDAY ALGORITHM</h2>
        
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

      {/* LOG PANEL */}
      {log && (
        <FUIGlassPanel className={styles.panel}>
          <h2 className={styles.title}>CALCULATION PROCESS LOG</h2>
          
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
                FINAL RESULT CONFIRMATION [ TOTAL ({log.finalNumber}) ] MOD 7 ==&gt; [ {log.finalNumber} ] // FINAL DAY: {log.finalDay.toUpperCase()}
              </div>
            </div>
          </div>
        </FUIGlassPanel>
      )}
    </div>
  );
};
