import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreSlider } from '../../../components/core/CoreSlider';
import { CoreSelect } from '../../../components/core/CoreSelect';
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
          <CoreSelect 
            label="ORIGIN"
            value={originId}
            onChange={(val) => setOriginId(val)}
            options={COMMON_ZONES.map(z => ({
              value: z.id,
              label: `${z.name} (UTC${z.offset >= 0 ? '+' : ''}${z.offset})`
            }))}
          />
          
          <CoreSlider 
            min={0} 
            max={23} 
            value={hour} 
            onChange={(val) => setHour(val)}
            className={styles.rangeInput}
          />

          <div className={styles.resultValue} style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
            {hour.toString().padStart(2, '0')}:00
          </div>
        </div>

        {/* Destination */}
        <div className={styles.resultArea}>
           <CoreSelect 
            label="DESTINATION"
            value={destId}
            onChange={(val) => setDestId(val)}
            options={COMMON_ZONES.map(z => ({
              value: z.id,
              label: `${z.name} (UTC${z.offset >= 0 ? '+' : ''}${z.offset})`
            }))}
          />

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
