import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreSlider } from '../../../components/core/CoreSlider';
import { CoreSelect } from '../../../components/core/CoreSelect';
import { COMMON_ZONES, calculateDestinationTime } from './logic';
import styles from './TimeZones.module.scss';
import { useTranslation } from 'react-i18next';

export const TimeZonesTool: React.FC = () => {
  const { t } = useTranslation(['time_zones', 'common']);
  const [originId, setOriginId] = useState('utc');
  const [destId, setDestId] = useState('tokyo');
  const [hour, setHour] = useState(12);

  const origin = COMMON_ZONES.find(z => z.id === originId) || COMMON_ZONES[0];
  const dest = COMMON_ZONES.find(z => z.id === destId) || COMMON_ZONES[3];

  const result = calculateDestinationTime(hour, origin.offset, dest.offset);

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('title')}</h2>
      
      <div className={styles.container}>
        <div className={styles.inputGroup}>
          <CoreSelect 
            label={t('origin')}
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

        <div className={styles.resultArea}>
           <CoreSelect 
            label={t('destination')}
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
              {result.dayOffset === 0 ? t('same_day') : result.dayOffset > 0 ? t('next_day') : t('prev_day')}
            </div>
          </div>
        </div>
      </div>
    </FUIGlassPanel>
  );
};
