import React from 'react';
import clsx from 'clsx';
import styles from './FUIGlassPanel.module.scss';

interface FUIGlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FUIGlassPanel: React.FC<FUIGlassPanelProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={clsx(styles.panel, className)} 
      {...props}
    >
      {children}
    </div>
  );
};
