import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreMarkdownRenderer } from '../../../components/core/CoreMarkdownRenderer';
import { CoreSlider } from '../../../components/core/CoreSlider';
import { rgbToHex } from './logic';
import styles from './ColorTheory.module.scss';


export const ColorTheoryTool: React.FC = () => {
  const { t } = useTranslation('color_theory');
  const [r, setR] = useState(100);
  const [g, setG] = useState(149);
  const [b, setB] = useState(237); // Cornflower blueish default

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
                <label style={{ color: '#ff6b6b' }}>{t('label_red')} ({r})</label>
                <CoreSlider min={0} max={255} value={r} onChange={setR} />
              </div>
              <div className={styles.sliderGroup}>
                <label style={{ color: '#4ade80' }}>{t('label_green')} ({g})</label>
                <CoreSlider min={0} max={255} value={g} onChange={setG} />
              </div>
              <div className={styles.sliderGroup}>
                <label style={{ color: '#60a5fa' }}>{t('label_blue')} ({b})</label>
                <CoreSlider min={0} max={255} value={b} onChange={setB} />
              </div>
            </div>
          </div>

        </div>
      </FUIGlassPanel>

      <FUIGlassPanel className={styles.panel}>
        <CoreMarkdownRenderer content={t('guide')} />
      </FUIGlassPanel>
    </div>
  );
};
