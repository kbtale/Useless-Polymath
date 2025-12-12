import React from 'react';
import styles from './CoreSelect.module.scss';
import clsx from 'clsx';

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
}

export const CoreSelect: React.FC<CoreSelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder,
  className
}) => {
  return (
    <div className={clsx(styles.selectContainer, className)}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.wrapper}>
        <select
          className={styles.select}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
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
