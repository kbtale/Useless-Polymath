import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { getMoonPhase } from './logic';
import styles from './Moon.module.scss';

export const MoonTool: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const [y, m, d] = date.split('-').map(Number);
  const { age, phaseName, phaseIcon } = getMoonPhase(d, m, y);

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>MOON PHASES</h2>
      
      <div className={styles.container}>
        <div>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.input}
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
