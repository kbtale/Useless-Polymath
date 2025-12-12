import React from 'react';
import styles from './CoreSlider.module.scss';
import clsx from 'clsx';

interface CoreSliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  label?: string;
  unit?: string;
  className?: string;
}

export const CoreSlider: React.FC<CoreSliderProps> = ({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  unit,
  className
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={clsx(styles.sliderContainer, className)}>
      {(label || unit) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          <span className={styles.value}>
            {value}{unit && <span className={styles.unit}>{unit}</span>}
          </span>
        </div>
      )}
      
      <div className={styles.trackWrapper}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={styles.rangeInput}
        />
        <div 
          className={styles.progressTrack} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
