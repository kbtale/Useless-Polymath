import clsx from 'clsx';
import type React from 'react';
import styles from './FUIGlassPanel.module.scss';

export interface FUIGlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FUIGlassPanel: React.FC<FUIGlassPanelProps> = ({
  children,
  style,
  className,
  ...props
}) => {
  return (
    <div className={clsx(styles.glassPanel, className)} style={style} {...props}>
      <div className={styles.innerBorder}>
        <div className={`${styles.corner} ${styles.tl}`} />
        <div className={`${styles.corner} ${styles.tr}`} />
        <div className={`${styles.corner} ${styles.bl}`} />
        <div className={`${styles.corner} ${styles.br}`} />

        {children}
      </div>
    </div>
  );
};
