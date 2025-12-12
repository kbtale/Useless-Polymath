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
        // Simple rejection: if the new value doesn't match, 
        // strictly speaking we should check char by char, 
        // but checking the whole string against a whitelist regex is safer.
        // If allowedChars is e.g. /^[0-1]*$/ for binary.
        return;
    }


    // Simplest: If allowedChars is provided, it must match the *entire* string logic
    // But usually we want to prevent typing invalid chars.
    // Let's assume allowedChars matches a SINGLE character whitelist unless specified otherwise.
    // No, standard is usually Regex for the whole valid string or character set.
    // Let's try: allowedChars is a regex for VALID CONTENT.
    
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
