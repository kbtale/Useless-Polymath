import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { SchematicDateInput } from '../../../components/core/SchematicDateInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { calculateDoomsdayWithLog } from './logic';
import type { DoomsdayLog } from './logic';
import styles from './Doomsday.module.scss';

export const DoomsdayTool: React.FC = () => {
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
      {/* INPUT PANEL */}
      <FUIGlassPanel className={styles.panel}>
        <h2 className={styles.title}>DOOMSDAY ALGORITHM</h2>
        
        <label className={styles.label}>TARGET DATE</label>
        
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
          <FUIButton onClick={handleClear} variant="outline">[ CLEAR ]</FUIButton>
          <FUIButton onClick={handleCalculate} variant="solid">&lt; EXECUTE &gt;</FUIButton>
        </div>

        {log && (
          <div className={styles.resultDisplay}>
            <div className={styles.resultLabel}>CALCULATED DAY</div>
            <div className={styles.resultValue}>{log.finalDay.toUpperCase()}</div>
            <div className={styles.helperText}>See the full calculations below</div>
          </div>
        )}
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
