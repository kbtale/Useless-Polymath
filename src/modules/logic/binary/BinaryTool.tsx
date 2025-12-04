import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { BitBulb } from './components/BitBulb';
import { getActivePowers } from './logic';
import styles from './Binary.module.scss';

export const BinaryTool: React.FC = () => {
  const [value, setValue] = useState(0);
  const activePowers = getActivePowers(value);

  const toggleBit = (bitValue: number) => {
    if (activePowers.includes(bitValue)) {
      setValue(v => v - bitValue);
    } else {
      setValue(v => v + bitValue);
    }
  };

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>BINARY ARITHMETIC</h2>
      
      <div className={styles.bulbContainer}>
        {[128, 64, 32, 16, 8, 4, 2, 1].map(bit => (
          <BitBulb 
            key={bit} 
            value={bit} 
            active={activePowers.includes(bit)} 
            onClick={() => toggleBit(bit)} 
          />
        ))}
      </div>

      <div className={styles.resultArea}>
        <div className={styles.label}>DECIMAL VALUE</div>
        <div className={styles.valueDisplay}>
          {value}
        </div>
        <div className={styles.equation}>
          {activePowers.length > 0 
            ? activePowers.join(' + ') + ' = ' + value
            : '0 = 0'}
        </div>
      </div>
    </FUIGlassPanel>
  );
};
