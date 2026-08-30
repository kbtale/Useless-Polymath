import clsx from 'clsx';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
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
              <label>{t('label_char')}</label>
              <CoreBaseInput
                value={char}
                onChangeValue={handleCharChange}
                maxLength={1}
                className={styles.charInput}
              />
            </div>

            <div className={styles.arrow}>⇄</div>

            <div className={styles.inputGroup}>
              <label>{t('label_code')}</label>
              <CoreBaseInput
                value={code}
                onChangeValue={handleCodeChange}
                allowedChars={/^[0-9]*$/}
                maxLength={3}
                className={styles.codeInput}
              />
            </div>
          </div>

          <div style={{ width: '100%' }}>
            <h3 className={styles.label} style={{ marginTop: '2rem' }}>
              {t('label_table')}
            </h3>
            <div className={styles.grid}>
              {tableData.map((item) => (
                <div
                  key={item.code}
                  className={clsx(styles.cell, item.code.toString() === code && styles.active)}
                  onClick={() => handleCodeChange(item.code.toString())}
                >
                  <span className={styles.code}>{item.code}</span>
                  <span className={styles.char}>{item.char}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FUIGlassPanel>
    </div>
  );
};
