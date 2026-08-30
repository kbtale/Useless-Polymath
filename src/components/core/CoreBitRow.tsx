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
    <div className={styles.coreBitRow} role="group" aria-label={ariaLabel || 'Binary bit array'}>
      {bitArray.map(({ bitIndex, isActive }) => (
        <div
          key={bitIndex}
          role={interactive ? 'checkbox' : undefined}
          aria-checked={interactive ? isActive : undefined}
          tabIndex={interactive ? 0 : undefined}
          aria-label={`Bit ${bitIndex}, value ${Math.pow(2, bitIndex)}`}
          className={clsx(styles.bit, isActive && styles.active, interactive && styles.interactive)}
          onClick={() => toggleBit(bitIndex)}
          onKeyDown={(e) => {
            if (interactive && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              toggleBit(bitIndex);
            }
          }}
          title={`Bit ${bitIndex} (${Math.pow(2, bitIndex)})`}
        >
          <div className={styles.led} />
          <span className={styles.label}>{isActive ? '1' : '0'}</span>
        </div>
      ))}
    </div>
  );
};
