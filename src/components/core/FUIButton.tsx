import React from 'react';
import styles from './FUIButton.module.scss';
import clsx from 'clsx';

interface FUIButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
}

export const FUIButton: React.FC<FUIButtonProps> = ({ 
  children, 
  variant = 'outline', 
  className,
  ...props 
}) => {
  return (
    <button 
      className={clsx(styles.fuiButton, variant === 'solid' && styles.solid, className)}
      {...props}
    >
      {variant === 'outline' ? `[ ${children} ]` : `< ${children} >`}
    </button>
  );
};
