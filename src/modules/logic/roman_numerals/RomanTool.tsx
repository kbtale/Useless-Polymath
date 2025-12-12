import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIButton } from '../../../components/core/FUIButton';
import { toRoman, fromRoman, isValidRoman } from './logic';
import styles from './Roman.module.scss';
import { useTranslation } from 'react-i18next';

export const RomanTool: React.FC = () => {
  const { t } = useTranslation(['roman_numerals', 'common']);
  const [roman, setRoman] = useState('');
  const [decimal, setDecimal] = useState('');
  const [error, setError] = useState('');

  const handleRomanChange = (val: string) => {
    setRoman(val);
    setError('');
    
    if (!val) {
      setDecimal('');
      return;
    }

    if (isValidRoman(val)) {
      const num = fromRoman(val);
      setDecimal(num.toString());
    } else {
      // Even if regex fails (e.g. IIII), we might still compute it, 
      // but let's strictly follow standard form or just show invalid if it parses weirdly
      const num = fromRoman(val);
      if (!isNaN(num)) {
        // Warning: This might be non-standard Roman
        // For bidirectional consistency, check if toRoman(num) === val
        if (toRoman(num) !== val) {
            // Technically valid sum, but non-standard form
             setDecimal(num.toString());
             // Optional: setError(t('non_standard')); 
        } else {
            setDecimal(num.toString());
        }
      }
    }
  };

  const handleDecimalChange = (val: string) => {
    setDecimal(val);
    setError('');

    if (!val) {
      setRoman('');
      return;
    }

    const num = parseInt(val);
    if (isNaN(num)) return;

    if (num > 3999) {
      setError(t('range_limit', { defaultValue: 'Max value is 3999' }));
      return;
    }

    setRoman(toRoman(num));
  };

  const clear = () => {
    setRoman('');
    setDecimal('');
    setError('');
  };

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('title')}</h2>

      <div className={styles.container}>
        
        {/* Decimal Input */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>{t('decimal', { defaultValue: 'DECIMAL (Integer)' })}</label>
          <CoreBaseInput
            value={decimal}
            onChangeValue={handleDecimalChange}
            allowedChars={/[0-9]/}
            maxLength={4}
            placeholder="e.g. 1987"
          />
        </div>

        {/* Roman Input */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>{t('roman', { defaultValue: 'ROMAN NUMERALS' })}</label>
          <CoreBaseInput
            value={roman}
            onChangeValue={handleRomanChange}
            allowedChars={/[IVXLCDM]/i}
            transformToUpper={true}
            maxLength={15}
            placeholder="e.g. MCMLXXXVII"
          />
          {error && <div className={styles.error}>{error}</div>}
        </div>

        <div className={styles.controls}>
          <FUIButton onClick={clear} variant="outline">[ {t('clear', { ns: 'common' })} ]</FUIButton>
        </div>

      </div>
    </FUIGlassPanel>
  );
};
