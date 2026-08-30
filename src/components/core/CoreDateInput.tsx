import clsx from 'clsx';
import type React from 'react';
import { useRef } from 'react';
import styles from './CoreDateInput.module.scss';

export interface CoreDateInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  day: string;
  month: string;
  year: string;
  setDay: (val: string) => void;
  setMonth: (val: string) => void;
  setYear: (val: string) => void;
  showDay?: boolean;
  showMonth?: boolean;
  showYear?: boolean;
}

export const CoreDateInput: React.FC<CoreDateInputProps> = ({
  day,
  month,
  year,
  setDay,
  setMonth,
  setYear,
  showDay = true,
  showMonth = true,
  showYear = true,
  className,
  ...props
}) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.();
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateVal = e.target.value;
    if (dateVal) {
      const [y, m, d] = dateVal.split('-');
      if (showYear) setYear(y);
      if (showMonth) setMonth(m);
      if (showDay) setDay(d);
    }
  };

  return (
    <div className={clsx(styles.coreDateInput, className)} {...props}>
      <div className={styles.innerGrid}>
        <div
          className={styles.cellIcon}
          onClick={handleIconClick}
          title="Pick a date"
          role="button"
          tabIndex={0}
          aria-label="Pick date from calendar picker"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleIconClick();
            }
          }}
        >
          <svg viewBox="0 0 24 24">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z" />
          </svg>
        </div>

        <input
          type="date"
          ref={dateInputRef}
          aria-label="Calendar date picker"
          className={styles.hiddenDateInput}
          onChange={handleDateChange}
          tabIndex={-1}
        />

        {showMonth && (
          <input
            className={styles.cellInput}
            aria-label="Month"
            placeholder="MM"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            maxLength={2}
          />
        )}

        {showDay && (
          <input
            className={styles.cellInput}
            aria-label="Day"
            placeholder="DD"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            maxLength={2}
          />
        )}

        {showYear && (
          <input
            className={clsx(styles.cellInput, styles.year)}
            aria-label="Year"
            placeholder="YYYY"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            maxLength={4}
          />
        )}
      </div>
    </div>
  );
};
