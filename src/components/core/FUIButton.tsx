import clsx from 'clsx';
import React, { memo } from 'react';
import styles from './FUIButton.module.scss';

export interface FUIButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
}

export const FUIButton: React.FC<FUIButtonProps> = memo(
  ({ children, variant = 'outline', type = 'button', className, ...props }) => {
    return (
      <button
        type={type}
        className={clsx(styles.fuiButton, variant === 'solid' && styles.solid, className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
