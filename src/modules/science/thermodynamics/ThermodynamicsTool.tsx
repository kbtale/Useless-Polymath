import clsx from 'clsx';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIButton } from '@/components/core/FUIButton';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
import {
  BENCHMARKS,
  celsiusToFahrenheit,
  celsiusToFahrenheitMental,
  fahrenheitToCelsius,
} from './logic';
import styles from './Thermodynamics.module.scss';

export const ThermodynamicsTool: React.FC = () => {
  const { t } = useTranslation('thermodynamics');

  const [celsius, setCelsius] = useState<number>(20);

  const fExact = celsiusToFahrenheit(celsius);
  const fMental = celsiusToFahrenheitMental(celsius);
  const deviation = Math.abs(fExact - fMental).toFixed(1);

  const handleCelsiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCelsius(Number(e.target.value));
  };

  const handleFahrenheitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = Number(e.target.value);
    setCelsius(Math.round(fahrenheitToCelsius(f)));
  };

  const handleBenchmark = (c: number) => {
    setCelsius(c);
  };

  const minC = -20;
  const maxC = 120;
  const rangeC = maxC - minC;
  const percentC = Math.min(100, Math.max(0, ((celsius - minC) / rangeC) * 100));

  const minF = -4;
  const maxF = 248;
  const rangeF = maxF - minF;
  const percentF = Math.min(100, Math.max(0, ((fExact - minF) / rangeF) * 100));

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <div className={styles.container}>
          <h2 className={styles.title}>{t('title')}</h2>

          <div className={styles.thermometerWrapper}>
            <div className={styles.scale}>
              <span className={styles.label}>{t('label_celsius')}</span>
              <div className={styles.track}>
                <div className={styles.fill} style={{ height: `${percentC}%` }} />
                <input
                  type="range"
                  aria-label={t('label_celsius')}
                  min={minC}
                  max={maxC}
                  value={celsius}
                  onChange={handleCelsiusChange}
                  className={styles.sliderInput}
                />
              </div>
              <span className={styles.valueDisplay}>{Math.round(celsius)}°</span>
            </div>

            <div className={styles.scale}>
              <span className={styles.label}>{t('label_fahrenheit')}</span>
              <div className={styles.track}>
                <div className={styles.fill} style={{ height: `${percentF}%` }} />
                <input
                  type="range"
                  aria-label={t('label_fahrenheit')}
                  min={minF}
                  max={maxF}
                  value={Math.round(fExact)}
                  onChange={handleFahrenheitChange}
                  className={styles.sliderInput}
                />
              </div>
              <span className={styles.valueDisplay}>{Math.round(fExact)}°</span>
            </div>
          </div>

          <div className={styles.comparison}>
            <div className={styles.compItem}>
              <span className={styles.compLabel}>{t('label_mental_math')}</span>
              <span className={clsx(styles.compValue, styles.mental)}>{Math.round(fMental)}°F</span>
            </div>
            <div className={styles.compItem}>
              <span className={styles.compLabel}>{t('label_exact')}</span>
              <span className={clsx(styles.compValue, styles.exact)}>{fExact.toFixed(1)}°F</span>
            </div>
            <div className={styles.compItem}>
              <span className={styles.compLabel}>{t('label_deviation')}</span>
              <span className={clsx(styles.compValue, styles.deviation)}>{deviation}</span>
            </div>
          </div>

          <div className={styles.benchmarks}>
            {BENCHMARKS.map((b) => (
              <FUIButton
                key={b.celsius}
                onClick={() => handleBenchmark(b.celsius)}
                variant={celsius === b.celsius ? 'solid' : 'outline'}
              >
                {t(b.labelKey)} ({b.celsius}°)
              </FUIButton>
            ))}
          </div>
        </div>
      </FUIGlassPanel>
    </div>
  );
};
