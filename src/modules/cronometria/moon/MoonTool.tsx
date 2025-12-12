import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreDateInput } from '../../../components/core/CoreDateInput';
import { getMoonPhase } from './logic';
import styles from './Moon.module.scss';

export const MoonTool: React.FC = () => {
  const [day, setDay] = useState(new Date().getDate().toString().padStart(2, '0'));
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const d = parseInt(day) || 1;
  const m = parseInt(month) || 1;
  const y = parseInt(year) || 2000;
  
  const { age, phaseName, phaseIcon } = getMoonPhase(d, m, y);

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>MOON PHASES</h2>
      
      <div className={styles.container}>
        <div>
           <CoreDateInput 
            day={day}
            month={month}
            year={year}
            setDay={setDay}
            setMonth={setMonth}
            setYear={setYear}
          />
        </div>

        <div className={styles.phaseIcon}>
          {phaseIcon}
        </div>

        <div>
          <div className={styles.phaseName}>
            {phaseName.toUpperCase()}
          </div>
          <div className={styles.phaseAge}>
            LUNAR AGE: {age} / 29.5
          </div>
        </div>
      </div>
    </FUIGlassPanel>
  );
};
