import React from 'react';
import clsx from 'clsx';
import styles from './BitBulb.module.scss';

interface BitBulbProps {
  value: number;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const BitBulb: React.FC<BitBulbProps> = ({ value, active, onClick, disabled }) => {
  return (
    <button 
      className={clsx(styles.bulb, { [styles.active]: active })} 
      onClick={onClick}
      disabled={disabled}
      aria-label={`Toggle bit ${value}`}
    >
      <div className={styles.light} />
      <span className={styles.value}>{value}</span>
    </button>
  );
};
