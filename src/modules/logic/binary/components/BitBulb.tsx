import clsx from 'clsx';
import React, { memo } from 'react';
import styles from './BitBulb.module.scss';

export interface BitBulbProps {
  value: number;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const BitBulb: React.FC<BitBulbProps> = memo(({ value, active, onClick, disabled }) => {
  return (
    <button
      type="button"
      className={clsx(styles.bulb, { [styles.active]: active })}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Toggle bit ${value}`}
    >
      <div className={styles.light} />
      <span className={styles.value}>{value}</span>
    </button>
  );
});
