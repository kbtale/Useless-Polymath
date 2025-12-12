import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { CoreSlider } from '../../../components/core/CoreSlider';
import { encrypt } from './logic';
import styles from './Caesar.module.scss';
import { useTranslation } from 'react-i18next';

export const CaesarTool: React.FC = () => {
  const { t } = useTranslation(['caesar_cipher', 'common']);
  const [input, setInput] = useState('');
  const [shift, setShift] = useState(3);

  const output = encrypt(input, shift);

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('title')}</h2>

      <div className={styles.container}>
        
        <div className={styles.controls}>
             <label className={styles.label}>
                {t('shift_key')}
                <span>{shift}</span>
             </label>
             <CoreSlider 
                min={0}
                max={25}
                value={shift}
                onChange={setShift}
             />
             <div className={styles.shiftDisplay}>
                A → {encrypt('A', shift)}
             </div>
        </div>

        <div className={styles.ioSection}>
            <div className={styles.column}>
                <label className={styles.label}>{t('plaintext')}</label>
                <CoreBaseInput 
                    value={input}
                    onChangeValue={setInput}
                    placeholder="HELLO WORLD"
                    allowedChars={/[a-zA-Z0-9\s.,!?-]/}
                    transformToUpper={true}
                />
            </div>

            <div className={styles.arrow}>
                ➜
            </div>

            <div className={styles.column}>
                <label className={styles.label}>{t('ciphertext')}</label>
                <CoreBaseInput 
                    value={output}
                    onChangeValue={() => {}} // Read only roughly, or bi-directional later? keeping simple 1-way for now
                    readOnly
                    placeholder={encrypt("HELLO WORLD", shift)}
                />
            </div>
        </div>

      </div>
    </FUIGlassPanel>
  );
};
