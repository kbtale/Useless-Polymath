import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { getBraillePattern } from './logic';
import styles from './Braille.module.scss';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export const BrailleTool: React.FC = () => {
  const { t } = useTranslation(['braille', 'common']);
  const [input, setInput] = useState('');

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('title')}</h2>

      <div className={styles.container}>
        
        <div className={styles.inputSection}>
            <label className={styles.label}>{t('text_input')}</label>
            <CoreBaseInput
                value={input}
                onChangeValue={setInput}
                placeholder="A B C"
                allowedChars={/[a-zA-Z0-9\s]/}
                transformToUpper={true}
            />
        </div>

        <div className={styles.outputArea}>
            {input.split('').map((char, idx) => {
                const pattern = getBraillePattern(char);
                return (
                    <div key={idx} className={styles.brailleCell}>
                        <div className={styles.dotsGrid}>
                            {pattern.map((isActive, i) => (
                                <div key={i} className={clsx(styles.dot, isActive && styles.active)} />
                            ))}
                        </div>
                        <span className={styles.charLabel}>{char}</span>
                    </div>
                );
            })}
            
            {input.length === 0 && (
                <div style={{ color: '#999', fontFamily: 'JetBrains Mono', padding: '1rem' }}>
                    // {t('output_placeholder')}
                </div>
            )}
        </div>

      </div>
    </FUIGlassPanel>
  );
};
