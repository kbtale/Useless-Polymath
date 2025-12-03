import React from 'react';
import clsx from 'clsx';
import styles from './FUIButton.module.scss';

interface FUIButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
  children: React.ReactNode;
}

export const FUIButton: React.FC<FUIButtonProps> = ({ 
  variant = 'solid', 
  className, 
  children, 
  ...props 
}) => {
  return (
    <button 
      className={clsx(styles.button, styles[variant], className)} 
      {...props}
    >
      {children}
    </button>
  );
};
