import clsx from 'clsx';
import React, { useId } from 'react';
import styles from './CoreSelect.module.scss';

export interface SelectOption {
  value: string | number;
  label: string;
}

interface CoreSelectProps {
  options: SelectOption[];
  value: string | number;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  'aria-label'?: string;
}

export const CoreSelect: React.FC<CoreSelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder,
  className,
  id,
  'aria-label': ariaLabel,
}) => {
  const generatedId = useId();
  const selectId = id || (label ? generatedId : undefined);

  return (
    <div className={clsx(styles.selectContainer, className)}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.wrapper}>
        <select
          id={selectId}
          aria-label={
            ariaLabel || (!label && typeof placeholder === 'string' ? placeholder : undefined)
          }
          className={styles.select}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className={styles.arrow} />
      </div>
    </div>
  );
};
