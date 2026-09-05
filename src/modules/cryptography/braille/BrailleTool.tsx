import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreBaseInput } from '@/components/core/CoreBaseInput';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
import styles from './Braille.module.scss';
import { getBraillePattern } from './logic';

export const BrailleTool: React.FC = () => {
  const { t } = useTranslation('braille');
  const [input, setInput] = useState('HELLO');

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <h2 className={styles.title}>{t('title')}</h2>

        <div className={styles.inputSection}>
<label htmlFor="braille-text-input" className={styles.label}>
          {t('label_type_text')}
        </label>
        <CoreBaseInput
          id="braille-text-input"
            value={input}
            onChangeValue={setInput}
            placeholder="A B C"
            allowedChars={/[a-zA-Z0-9\s]/}
            transformToUpper={true}
            className={styles.textInput}
          />
        </div>

        <div className={styles.outputArea}>
          {input.split('').map((char, idx) => {
            const pattern = getBraillePattern(char);
            return (
              <div key={`${char}-${idx}`} className={styles.brailleCell}>
                <div className={styles.dotsGrid}>
                  {[0, 1, 2, 3, 4, 5].map((dotIndex) => (
                    <div
                      key={dotIndex}
                      className={`${styles.dot} ${pattern[dotIndex] ? styles.active : ''}`}
                    />
                  ))}
                </div>
                <div className={styles.charLabel}>{char}</div>
              </div>
            );
          })}
        </div>
      </FUIGlassPanel>
    </div>
  );
};
