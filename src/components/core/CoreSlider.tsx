import clsx from 'clsx';
import React, { useId } from 'react';
import styles from './CoreSlider.module.scss';

interface CoreSliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  label?: string;
  unit?: string;
  className?: string;
  id?: string;
  'aria-label'?: string;
}

export const CoreSlider: React.FC<CoreSliderProps> = ({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  unit,
  className,
  id,
  'aria-label': ariaLabel,
}) => {
  const generatedId = useId();
  const sliderId = id || (label ? generatedId : undefined);
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={clsx(styles.sliderContainer, className)}>
      {(label || unit) && (
        <div className={styles.header}>
          {label && (
            <label htmlFor={sliderId} className={styles.label}>
              {label}
            </label>
          )}
          <span className={styles.value}>
            {value}
            {unit && <span className={styles.unit}>{unit}</span>}
          </span>
        </div>
      )}

      <div className={styles.trackWrapper}>
        <input
          id={sliderId}
          aria-label={ariaLabel || label}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={styles.rangeInput}
        />
        <div className={styles.progressTrack} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};
