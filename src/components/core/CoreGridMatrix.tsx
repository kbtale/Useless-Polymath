import { Fragment } from 'react';
import type { ReactNode } from 'react';
import styles from './CoreGridMatrix.module.scss';
import clsx from 'clsx';

interface CoreGridMatrixProps<T> {
  items: T[];
  columns?: number;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  gap?: string;
}

export const CoreGridMatrix = <T,>({
  items,
  columns = 4,
  renderItem,
  className,
  gap = '1rem'
}: CoreGridMatrixProps<T>) => {
  return (
    <div 
      className={clsx(styles.gridMatrix, className)}
      style={{ 
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gap 
      }}
    >
      {items.map((item, index) => (
        <Fragment key={index}>
          {renderItem(item, index)}
        </Fragment>
      ))}
    </div>
  );
};
