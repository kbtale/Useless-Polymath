import clsx from 'clsx';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreBaseInput } from '@/components/core/CoreBaseInput';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
import styles from './Ascii.module.scss';
import { charToCode, codeToChar, getPrintableAscii } from './logic';

export const AsciiTool: React.FC = () => {
  const { t } = useTranslation('ascii');
  const [char, setChar] = useState('A');
  const [code, setCode] = useState('65');

  const handleCharChange = (val: string) => {
    const c = val.slice(0, 1);
    setChar(c);
    setCode(c ? charToCode(c).toString() : '');
  };

  const handleCodeChange = (val: string) => {
    setCode(val);
    const num = parseInt(val, 10);
    setChar(codeToChar(num));
  };

  const tableData = getPrintableAscii();

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <div className={styles.container}>
          <h2 className={styles.title}>{t('title')}</h2>

          <div className={styles.converter}>
            <div className={styles.inputGroup}>
<label htmlFor="ascii-char-input">{t('label_char')}</label>
            <CoreBaseInput
              id="ascii-char-input"
                value={char}
                onChangeValue={handleCharChange}
                maxLength={1}
                className={styles.charInput}
              />
            </div>

            <div className={styles.arrow}>⇄</div>

            <div className={styles.inputGroup}>
<label htmlFor="ascii-code-input">{t('label_code')}</label>
            <CoreBaseInput
              id="ascii-code-input"
                value={code}
                onChangeValue={handleCodeChange}
                allowedChars={/^[0-9]*$/}
                maxLength={3}
                className={styles.codeInput}
              />
            </div>
          </div>

          <div className={styles.tableSection}>
            <h3 className={clsx(styles.label, styles.tableTitle)}>
              {t('label_table')}
            </h3>
            <div className={styles.grid}>
              {tableData.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={clsx(styles.cell, item.code.toString() === code && styles.active)}
                  onClick={() => handleCodeChange(item.code.toString())}
                >
                  <span className={styles.code}>{item.code}</span>
                  <span className={styles.char}>{item.char}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </FUIGlassPanel>
    </div>
  );
};
