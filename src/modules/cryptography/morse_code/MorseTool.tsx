import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { encodeMode, decodeMorse } from './logic';
import styles from './Morse.module.scss';
import { useTranslation } from 'react-i18next';

export const MorseTool: React.FC = () => {
  const { t } = useTranslation(['morse_code', 'common']);
  const [textInput, setTextInput] = useState('');
  const [morseInput, setMorseInput] = useState('');

  const handleTextChange = (val: string) => {
    setTextInput(val);
    setMorseInput(encodeMode(val));
  };

  const handleMorseChange = (val: string) => {
    setMorseInput(val);
    setTextInput(decodeMorse(val));
  };

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('title')}</h2>

      <div className={styles.container}>
        
        <div className={styles.ioSection}>
            <label className={styles.label}>{t('text_input')}</label>
            <CoreBaseInput
                value={textInput}
                onChangeValue={handleTextChange}
                placeholder="SOS"
                allowedChars={/[a-zA-Z0-9\s]/}
                transformToUpper={true}
            />
        </div>

        <div className={styles.ioSection}>
            <label className={styles.label}>{t('morse_input')}</label>
            <CoreBaseInput
                value={morseInput}
                onChangeValue={handleMorseChange}
                placeholder="... --- ..."
                allowedChars={/[.\-\/\s]/}
            />
        </div>

        <div className={styles.visualOutput}>
            {morseInput.split('').map((char, idx) => {
                if (char === '.') return <div key={idx} className={styles.dot} />;
                if (char === '-') return <div key={idx} className={styles.dash} />;
                if (char === ' ' || char === '/') return <div key={idx} className={styles.space} />;
                return null;
            })}
        </div>

      </div>
    </FUIGlassPanel>
  );
};
