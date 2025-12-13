import React from 'react';
import styles from './CoreBaseInput.module.scss';
import clsx from 'clsx';

interface CoreBaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChangeValue: (val: string) => void;
  allowedChars?: RegExp;
  transformToUpper?: boolean;
  maxLength?: number;
  onEnter?: () => void;
}

export const CoreBaseInput: React.FC<CoreBaseInputProps> = ({
  value,
  onChangeValue,
  allowedChars,
  transformToUpper,
  maxLength,
  onEnter,
  className,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    
    if (transformToUpper) {
      val = val.toUpperCase();
    }

    if (allowedChars && val && !allowedChars.test(val)) {
        // Validation logic matching previous simple implementation
        return;
    }
    
    if (allowedChars && !allowedChars.test(val) && val !== '') {
        return; 
    }

    if (maxLength && val.length > maxLength) {
      return;
    }

    onChangeValue(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
        onEnter();
    }
  };

  return (
    <input
      type="text"
      className={clsx(styles.coreBaseInput, className)}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      maxLength={maxLength}
      {...props}
    />
  );
};
