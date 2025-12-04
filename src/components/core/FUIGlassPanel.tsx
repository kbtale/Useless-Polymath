import React from 'react';
import styles from './FUIGlassPanel.module.scss';

interface FUIGlassPanelProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const FUIGlassPanel: React.FC<FUIGlassPanelProps> = ({ children, style, className }) => {
  return (
    <div className={`${styles.glassPanel} ${className || ''}`} style={style}>
      <div className={styles.innerBorder}>
        {/* Corner Decorations */}
        <div className={`${styles.corner} ${styles.tl}`} />
        <div className={`${styles.corner} ${styles.tr}`} />
        <div className={`${styles.corner} ${styles.bl}`} />
        <div className={`${styles.corner} ${styles.br}`} />
        
        {children}
      </div>
    </div>
  );
};
