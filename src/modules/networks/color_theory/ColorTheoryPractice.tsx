import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreSlider } from '../../../components/core/CoreSlider';
import { FUIButton } from '../../../components/core/FUIButton';
import { calculateColorDistance, rgbToHex } from './logic';
import styles from './ColorTheory.module.scss';

export const ColorTheoryPractice: React.FC = () => {
  const { t } = useTranslation(['color_theory', 'common']);
  const [targetR, setTargetR] = useState(0);
  const [targetG, setTargetG] = useState(0);
  const [targetB, setTargetB] = useState(0);
  
  const [userR, setUserR] = useState(128);
  const [userG, setUserG] = useState(128);
  const [userB, setUserB] = useState(128);

  const [score, setScore] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);

  const generateColor = () => {
    setTargetR(Math.floor(Math.random() * 256));
    setTargetG(Math.floor(Math.random() * 256));
    setTargetB(Math.floor(Math.random() * 256));
    setUserR(128); setUserG(128); setUserB(128);
    setScore(null);
  };

  useEffect(() => {
    generateColor();
  }, []);

  const handleSubmit = () => {
    const dist = calculateColorDistance([targetR, targetG, targetB], [userR, userG, userB]);
    // Max distance is ~442. Map to 0-100 score.
    // 0 dist = 100 score. 442 dist = 0 score.
    const maxDist = 442;
    const calcScore = Math.max(0, 100 - (dist / maxDist) * 100);
    setScore(calcScore);
    
    if (calcScore > 90) setStreak(s => s + 1);
    else setStreak(0);
  };

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <div className={styles.container}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
             <h2 className={styles.title}>{t('practice_title')}</h2>
             <span style={{ fontFamily: 'JetBrains Mono', color: '#4ade80' }}>{t('streak', { ns: 'common' })}: {streak}</span>
          </div>

          <div className={styles.flexRow} style={{ alignItems: 'center' }}>
            {/* Target */}
            <div style={{ textAlign: 'center' }}>
              <div className={styles.colorPreview} style={{ backgroundColor: rgbToHex(targetR, targetG, targetB), marginBottom: '1rem' }}>
                 <span className={styles.hexDisplay}>{t('target', { ns: 'common' })}</span>
              </div>
            </div>

            {/* User */}
             <div style={{ textAlign: 'center' }}>
              <div className={styles.colorPreview} style={{ backgroundColor: rgbToHex(userR, userG, userB), marginBottom: '1rem' }}>
                 <span className={styles.hexDisplay}>{t('result', { ns: 'common' })}</span>
              </div>
            </div>
          </div>

          <div className={styles.controls}>
              <div className={styles.sliderGroup}>
                <label style={{ color: '#ff6b6b' }}>{t('label_red')}</label>
                <CoreSlider min={0} max={255} value={userR} onChange={setUserR} />
              </div>
              <div className={styles.sliderGroup}>
                <label style={{ color: '#4ade80' }}>{t('label_green')}</label>
                <CoreSlider min={0} max={255} value={userG} onChange={setUserG} />
              </div>
              <div className={styles.sliderGroup}>
                <label style={{ color: '#60a5fa' }}>{t('label_blue')}</label>
                <CoreSlider min={0} max={255} value={userB} onChange={setUserB} />
              </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <FUIButton onClick={handleSubmit}>{t('execute', { ns: 'common' })}</FUIButton>
            <FUIButton onClick={generateColor} variant="outline">{t('next', { ns: 'common' })}</FUIButton>
          </div>

          {score !== null && (
             <h3 style={{ fontSize: '2rem', color: score > 90 ? '#4ade80' : '#ff6b6b' }}>
               {score.toFixed(1)}%
             </h3>
          )}
        </div>
      </FUIGlassPanel>
    </div>
  );
};
