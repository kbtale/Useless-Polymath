import React from 'react';
import styles from './CoreBandSelector.module.scss';


export interface BandOption {
  value: number | string;
  color: string;
  label: string;
  textColor?: string;
}

interface CoreBandSelectorProps {
  options: BandOption[];
  selectedValue: number | string;
  onChange: (val: number | string) => void;
  placeholder?: string;
}

export const CoreBandSelector: React.FC<CoreBandSelectorProps> = ({
  options,
  selectedValue,
  onChange,
  placeholder = "Select Band"
}) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      // Logic to determine if number or string based on options[0].value type?
      // For simplicity, pass back string and let parent parse if needed, 
      // or try to find the option.
      const val = e.target.value;
      const option = options.find(o => o.value.toString() === val);
      if (option) {
          onChange(option.value);
      }
  };
  
  const selectedOption = options.find(o => o.value === selectedValue);

  return (
    <div className={styles.bandSelector}>
      <div 
        className={styles.colorPreview}
        style={{ 
            backgroundColor: selectedOption?.color || 'transparent',
            color: selectedOption?.textColor || '#000'
        }}
      >
        {/* Helper text or just color block? */}
      </div>
      
      <select 
        className={styles.select}
        value={selectedValue.toString()}
        onChange={handleSelect}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
