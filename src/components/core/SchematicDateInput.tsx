import React, { useRef } from 'react';
import styles from './SchematicDateInput.module.scss';

interface SchematicDateInputProps {
  day: string;
  month: string;
  year: string;
  setDay: (val: string) => void;
  setMonth: (val: string) => void;
  setYear: (val: string) => void;
}

export const SchematicDateInput: React.FC<SchematicDateInputProps> = ({
  day,
  month,
  year,
  setDay,
  setMonth,
  setYear
}) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateVal = e.target.value;
    if (dateVal) {
      const [y, m, d] = dateVal.split('-');
      setYear(y);
      setMonth(m);
      setDay(d);
    }
  };

  return (
    <div className={styles.schematicInput}>
      
      <div className={styles.innerGrid}>
        {/* Clickable Icon */}
        <div className={styles.cellIcon} onClick={handleIconClick} title="Pick a date">
          <svg viewBox="0 0 24 24">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/>
          </svg>
        </div>
        
        {/* Hidden Native Input for Picker */}
        <input 
          type="date" 
          ref={dateInputRef} 
          className={styles.hiddenDateInput}
          onChange={handleDateChange}
          tabIndex={-1}
        />

        {/* Manual Inputs */}
        <input 
          className={styles.cellInput} 
          placeholder="MM" 
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          maxLength={2}
        />
        <input 
          className={styles.cellInput} 
          placeholder="DD" 
          value={day}
          onChange={(e) => setDay(e.target.value)}
          maxLength={2}
        />
        <input 
          className={`${styles.cellInput} ${styles.year}`} 
          placeholder="YYYY" 
          value={year}
          onChange={(e) => setYear(e.target.value)}
          maxLength={4}
        />
      </div>
    </div>
  );
};
