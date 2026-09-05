import clsx from 'clsx';
import type React from 'react';
import styles from './CoreBitRow.module.scss';

export interface CoreBitRowProps {
  bits?: number;
  value: number;
  onChange?: (val: number) => void;
  interactive?: boolean;
  'aria-label'?: string;
}

export const CoreBitRow: React.FC<CoreBitRowProps> = ({
  bits = 8,
  value,
  onChange,
  interactive = false,
  'aria-label': ariaLabel,
}) => {
  const toggleBit = (index: number) => {
    if (!interactive || !onChange) return;
    const bitMask = 1 << index;
    const newValue = value ^ bitMask;
    onChange(newValue);
  };

  const bitArray = Array.from({ length: bits }, (_, i) => {
    const bitIndex = bits - 1 - i;
    const isActive = !!((value >> bitIndex) & 1);

    return { bitIndex, isActive };
  });

  return (
    <fieldset className={styles.coreBitRow} aria-label={ariaLabel || 'Binary bit array'}>
      {bitArray.map(({ bitIndex, isActive }) =>
        interactive ? (
          <label
            key={bitIndex}
            className={clsx(styles.bit, isActive && styles.active, styles.interactive)}
            title={`Bit ${bitIndex} (${2 ** bitIndex})`}
          >
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => toggleBit(bitIndex)}
              aria-label={`Bit ${bitIndex}, value ${2 ** bitIndex}`}
              className={styles.visuallyHiddenInput}
            />
            <span className={styles.led} />
            <span className={styles.label}>{isActive ? '1' : '0'}</span>
          </label>
        ) : (
          <div key={bitIndex} className={clsx(styles.bit, isActive && styles.active)}>
            <div className={styles.led} />
            <span className={styles.label}>{isActive ? '1' : '0'}</span>
          </div>
        ),
      )}
    </fieldset>
  );
};
