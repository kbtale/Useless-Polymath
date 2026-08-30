import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreSlider } from '../../../components/core/CoreSlider';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import styles from './ColorTheory.module.scss';
import { rgbToHex } from './logic';

export const ColorTheoryTool: React.FC = () => {
  const { t } = useTranslation('color_theory');
  const [r, setR] = useState(100);
  const [g, setG] = useState(149);
  const [b, setB] = useState(237);

  const hex = rgbToHex(r, g, b);

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <div className={styles.container}>
          <h2 className={styles.title}>{t('title')}</h2>

          <div className={styles.flexRow}>
            <div className={styles.colorPreview} style={{ backgroundColor: hex }}>
              <span className={styles.hexDisplay}>{hex}</span>
            </div>

            <div className={styles.controls}>
              <div className={styles.sliderGroup}>
                <label style={{ color: '#ff6b6b' }}>
                  {t('label_red')} ({r})
                </label>
                <CoreSlider min={0} max={255} value={r} onChange={setR} />
              </div>
              <div className={styles.sliderGroup}>
                <label style={{ color: '#4ade80' }}>
                  {t('label_green')} ({g})
                </label>
                <CoreSlider min={0} max={255} value={g} onChange={setG} />
              </div>
              <div className={styles.sliderGroup}>
                <label style={{ color: '#60a5fa' }}>
                  {t('label_blue')} ({b})
                </label>
                <CoreSlider min={0} max={255} value={b} onChange={setB} />
              </div>
            </div>
          </div>
        </div>
      </FUIGlassPanel>
    </div>
  );
};
