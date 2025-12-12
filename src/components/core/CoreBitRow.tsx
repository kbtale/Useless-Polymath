import React from 'react';
import styles from './CoreBitRow.module.scss';
import clsx from 'clsx';

interface CoreBitRowProps {
  bits?: number;
  value: number;
  onChange?: (val: number) => void;
  interactive?: boolean;
}

export const CoreBitRow: React.FC<CoreBitRowProps> = ({
  bits = 8,
  value,
  onChange,
  interactive = false
}) => {
  const toggleBit = (index: number) => {
    if (!interactive || !onChange) return;
    const bitMask = 1 << index;
    const newValue = value ^ bitMask;
    onChange(newValue);
  };

  const bitArray = Array.from({ length: bits }, (_, i) => {
    // Determine bit index (usually 0 is LSB, on the right)
    // Visualization: [7][6][5][4][3][2][1][0]
    // i=0 -> left (bit index = bits - 1)
    const bitIndex = bits - 1 - i; 
    const isActive = !!((value >> bitIndex) & 1);
    
    return { bitIndex, isActive };
  });

  return (
    <div className={styles.coreBitRow}>
      {bitArray.map(({ bitIndex, isActive }) => (
        <div 
          key={bitIndex}
          className={clsx(
            styles.bit, 
            isActive && styles.active,
            interactive && styles.interactive
          )}
          onClick={() => toggleBit(bitIndex)}
          title={`Bit ${bitIndex} (${Math.pow(2, bitIndex)})`}
        >
          <div className={styles.led}></div>
          <span className={styles.label}>{isActive ? '1' : '0'}</span>
        </div>
      ))}
    </div>
  );
};
