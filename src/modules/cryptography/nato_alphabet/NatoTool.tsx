import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { toNato } from './logic';
import styles from './Nato.module.scss';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export const NatoTool: React.FC = () => {
  const { t } = useTranslation(['nato_alphabet', 'common']);
  const [input, setInput] = useState('');

  const result = toNato(input);

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('title')}</h2>

      <div className={styles.container}>
        
        <div className={styles.inputArea}>
          <label className={styles.label}>{t('text_input')}</label>
          <CoreBaseInput
            value={input}
            onChangeValue={setInput}
            placeholder="Hello World"
            allowedChars={/[a-zA-Z0-9\s]/}
          />
        </div>

        <div className={styles.outputArea}>
          {result.length === 0 && (
            <div style={{ padding: '1rem', color: '#666', fontFamily: 'JetBrains Mono' }}>
                // {t('waiting_for_input')}
            </div>
          )}
          {result.map((item, idx) => (
             <div key={idx} className={clsx(styles.card, !item.word && styles.unknown)}>
                <span className={styles.char}>{item.char}</span>
                {item.word && <span className={styles.word}>{item.word}</span>}
             </div>
          ))}
        </div>

      </div>
    </FUIGlassPanel>
  );
};
