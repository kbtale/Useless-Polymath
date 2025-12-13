
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreMarkdownRenderer } from '../../../components/core/CoreMarkdownRenderer';
import { FUIButton } from '../../../components/core/FUIButton';
import { 
  celsiusToFahrenheit, 
  fahrenheitToCelsius, 
  celsiusToFahrenheitMental, 
  BENCHMARKS } from './logic';
import styles from './Thermodynamics.module.scss';

export const ThermodynamicsTool: React.FC = () => {
  const { t } = useTranslation('thermodynamics');
  
  // State tracks Celsius as the source of truth
  const [celsius, setCelsius] = useState<number>(20);

  const fExact = celsiusToFahrenheit(celsius);
  const fMental = celsiusToFahrenheitMental(celsius);
  const deviation = Math.abs(fExact - fMental).toFixed(1);

  // Handlers
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

  // Percentages for visualization (Scale 0-100 range for display, though logic goes beyond)
  // Map -20C to 120C range to 0-100% height
  const minC = -20;
  const maxC = 120;
  const rangeC = maxC - minC;
  const percentC = Math.min(100, Math.max(0, ((celsius - minC) / rangeC) * 100));
  
  // Similar logic for F (-4F to 248F matches the C range approx)
  const minF = -4;
  const maxF = 248;
  const rangeF = maxF - minF;
  const percentF = Math.min(100, Math.max(0, ((fExact - minF) / rangeF) * 100));

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <h2 className={styles.title}>{t('title')}</h2>

        <div className={styles.thermometerWrapper}>
          
          {/* Celsius Scale */}
          <div className={styles.scale}>
            <span className={styles.label}>{t('label_celsius')}</span>
            <div className={styles.track}>
              <div 
                className={styles.fill} 
                style={{ height: `${percentC}%` }} 
              />
              <input 
                type="range" 
                min={minC} 
                max={maxC} 
                value={celsius} 
                onChange={handleCelsiusChange}
                className={styles.sliderInput}
              />
            </div>
            <span className={styles.valueDisplay}>{Math.round(celsius)}°</span>
          </div>

          {/* Fahrenheit Scale */}
          <div className={styles.scale}>
            <span className={styles.label}>{t('label_fahrenheit')}</span>
            <div className={styles.track}>
              <div 
                className={styles.fill} 
                style={{ height: `${percentF}%` }} 
              />
               <input 
                type="range" 
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

        {/* Mental Math Comparison */}
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

        {/* Benchmarks */}
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

      </FUIGlassPanel>

      <FUIGlassPanel className={styles.panel}>
        <CoreMarkdownRenderer content={t('guide')} />
      </FUIGlassPanel>
    </div>
  );
};

// Helper for class names (since I didn't import it above, adding now)
import clsx from 'clsx';
