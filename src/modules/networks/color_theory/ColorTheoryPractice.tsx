import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { usePracticeStreak } from '@/hooks/usePracticeStreak';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
import { CoreSlider } from '@/components/core/CoreSlider';
import { FUIButton } from '@/components/core/FUIButton';
import { calculateColorDistance, rgbToHex } from './logic';
import styles from './ColorTheory.module.scss';

export const ColorTheoryPractice: React.FC = () => {
  const { streak, setStreak } = usePracticeStreak('color_theory');
  const getRandomColor = () => {
    return {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256),
    };
  };

  const { t } = useTranslation(['color_theory', 'common']);
  const [target, setTarget] = useState(getRandomColor);
  const targetR = target.r;
  const targetG = target.g;
  const targetB = target.b;

  const [userR, setUserR] = useState(128);
  const [userG, setUserG] = useState(128);
  const [userB, setUserB] = useState(128);

  const [score, setScore] = useState<number | null>(null);

  const generateColor = () => {
    setTarget(getRandomColor());
    setUserR(128);
    setUserG(128);
    setUserB(128);
    setScore(null);
  };

  const handleSubmit = () => {
    const dist = calculateColorDistance([targetR, targetG, targetB], [userR, userG, userB]);
    const maxDist = 442;
    const calcScore = Math.max(0, 100 - (dist / maxDist) * 100);
    setScore(calcScore);

    if (calcScore > 90) setStreak((s) => s + 1);
    else setStreak(0);
  };

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <div className={styles.container}>
          <div className={styles.headerRow}>
            <h2 className={styles.title}>{t('practice_title')}</h2>
            <span className={styles.streakValue}>
              {t('streak', { ns: 'common' })}: {streak}
            </span>
          </div>

          <div className={clsx(styles.flexRow, styles.flexRowCentered)}>
            <div className={styles.centerCol}>
              <div
                className={clsx(styles.colorPreview, styles.colorPreviewSpacing)}
                style={{ backgroundColor: rgbToHex(targetR, targetG, targetB) }}
              >
                <span className={styles.hexDisplay}>{t('target', { ns: 'common' })}</span>
              </div>
            </div>

            <div className={styles.centerCol}>
              <div
                className={clsx(styles.colorPreview, styles.colorPreviewSpacing)}
                style={{ backgroundColor: rgbToHex(userR, userG, userB) }}
              >
                <span className={styles.hexDisplay}>{t('result', { ns: 'common' })}</span>
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <div className={styles.sliderGroup}>
              <label className={styles.labelRed}>{t('label_red')}</label>
              <CoreSlider min={0} max={255} value={userR} onChange={setUserR} />
            </div>
            <div className={styles.sliderGroup}>
              <label className={styles.labelGreen}>{t('label_green')}</label>
              <CoreSlider min={0} max={255} value={userG} onChange={setUserG} />
            </div>
            <div className={styles.sliderGroup}>
              <label className={styles.labelBlue}>{t('label_blue')}</label>
              <CoreSlider min={0} max={255} value={userB} onChange={setUserB} />
            </div>
          </div>

          <div className={styles.actionRow}>
            <FUIButton onClick={handleSubmit}>{t('submit', { ns: 'common' })}</FUIButton>
            <FUIButton onClick={generateColor} variant="outline">
              {t('next', { ns: 'common' })}
            </FUIButton>
          </div>

          {score !== null && (
            <h3
              className={styles.scoreValue}
              style={{ color: score > 90 ? 'var(--text-highlight)' : 'var(--color-error)' }}
            >
              {score.toFixed(1)}%
            </h3>
          )}
        </div>
      </FUIGlassPanel>
    </div>
  );
};
