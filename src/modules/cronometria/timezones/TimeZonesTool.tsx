import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { COMMON_ZONES, calculateDestinationTime } from './logic';
import styles from './TimeZones.module.scss';

export const TimeZonesTool: React.FC = () => {
  const [originId, setOriginId] = useState('utc');
  const [destId, setDestId] = useState('tokyo');
  const [hour, setHour] = useState(12);

  const origin = COMMON_ZONES.find(z => z.id === originId) || COMMON_ZONES[0];
  const dest = COMMON_ZONES.find(z => z.id === destId) || COMMON_ZONES[3];

  const result = calculateDestinationTime(hour, origin.offset, dest.offset);

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>TIME ZONES</h2>
      
      <div className={styles.container}>
        {/* Origin */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>ORIGIN</label>
          <select 
            value={originId}
            onChange={(e) => setOriginId(e.target.value)}
            className={styles.select}
          >
            {COMMON_ZONES.map(z => (
              <option key={z.id} value={z.id}>{z.name} (UTC{z.offset >= 0 ? '+' : ''}{z.offset})</option>
            ))}
          </select>
          
          <input 
            type="range" 
            min="0" 
            max="23" 
            value={hour} 
            onChange={(e) => setHour(parseInt(e.target.value))}
            className={styles.rangeInput}
          />
          <div className={styles.resultValue} style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
            {hour.toString().padStart(2, '0')}:00
          </div>
        </div>

        {/* Destination */}
        <div className={styles.resultArea}>
          <label className={styles.label}>DESTINATION</label>
          <select 
            value={destId}
            onChange={(e) => setDestId(e.target.value)}
            className={styles.select}
          >
            {COMMON_ZONES.map(z => (
              <option key={z.id} value={z.id}>{z.name} (UTC{z.offset >= 0 ? '+' : ''}{z.offset})</option>
            ))}
          </select>

          <div>
            <div className={styles.resultValue}>
              {result.hour.toString().padStart(2, '0')}:00
            </div>
            <div className={styles.resultDate}>
              {result.dayOffset === 0 ? 'SAME DAY' : result.dayOffset > 0 ? 'NEXT DAY (+1)' : 'PREVIOUS DAY (-1)'}
            </div>
          </div>
        </div>
      </div>
    </FUIGlassPanel>
  );
};
