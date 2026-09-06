import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { usePracticeStreak } from '@/hooks/usePracticeStreak';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
import { CoreSlider } from '@/components/core/CoreSlider';
import { FUIButton } from '@/components/core/FUIButton';
import {
  type RGBColor,
  calculateColorDistance,
  calculateColorScore,
  rgbToHex,
} from './logic';
import styles from './ColorTheory.module.scss';

export const ColorTheoryPractice: React.FC = () => {
  const { streak, setStreak } = usePracticeStreak('color_theory');
  const getRandomColor = (): RGBColor => {
    return {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256),
    };
  };

  const { t } = useTranslation(['color_theory', 'common']);
  const [targetColor, setTargetColor] = useState<RGBColor>(getRandomColor);
  const targetR = targetColor.r;
  const targetG = targetColor.g;
  const targetB = targetColor.b;

  const [userR, setUserR] = useState(128);
  const [userG, setUserG] = useState(128);
  const [userB, setUserB] = useState(128);

  const [matchScore, setMatchScore] = useState<number | null>(null);

  const generateColor = () => {
    setTargetColor(getRandomColor());
    setUserR(128);
    setUserG(128);
    setUserB(128);
    setMatchScore(null);
  };

  const handleSubmit = () => {
    const distance = calculateColorDistance(
      [targetR, targetG, targetB],
      [userR, userG, userB],
    );
    const calculatedScore = calculateColorScore(distance);
    setMatchScore(calculatedScore);

    if (calculatedScore > 90) {
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
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
              <label htmlFor="color-r-slider" className={styles.labelRed}>{t('label_red')}</label>
              <CoreSlider id="color-r-slider" min={0} max={255} value={userR} onChange={setUserR} />
            </div>
            <div className={styles.sliderGroup}>
              <label htmlFor="color-g-slider" className={styles.labelGreen}>{t('label_green')}</label>
              <CoreSlider id="color-g-slider" min={0} max={255} value={userG} onChange={setUserG} />
            </div>
            <div className={styles.sliderGroup}>
              <label htmlFor="color-b-slider" className={styles.labelBlue}>{t('label_blue')}</label>
              <CoreSlider id="color-b-slider" min={0} max={255} value={userB} onChange={setUserB} />
            </div>
          </div>

          <div className={styles.actionRow}>
            <FUIButton onClick={handleSubmit}>{t('submit', { ns: 'common' })}</FUIButton>
            <FUIButton onClick={generateColor} variant="outline">
              {t('next', { ns: 'common' })}
            </FUIButton>
          </div>

          {matchScore !== null && (
            <h3
              className={styles.scoreValue}
              style={{ color: matchScore > 90 ? 'var(--text-highlight)' : 'var(--color-error)' }}
            >
              {matchScore.toFixed(1)}%
            </h3>
          )}
        </div>
      </FUIGlassPanel>
    </div>
  );
};
