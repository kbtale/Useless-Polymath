import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { CoreSemaphoreFigure } from '../../../components/core/CoreSemaphoreFigure';
import { FUIButton } from '../../../components/core/FUIButton';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import styles from './SemaphoreTool.module.scss';
import { getSemaphorePattern } from './logic';

export const SemaphoreTool: React.FC = () => {
  const { t } = useTranslation('semaphore');
  const [currentChar, setCurrentChar] = useState<string>('a');
  const [inputText, setInputText] = useState<string>('a');

  const pattern = getSemaphorePattern(currentChar);

  const handleInputChange = (val: string) => {
    setInputText(val);
    if (val.length > 0) {
      setCurrentChar(val[val.length - 1].toLowerCase());
    } else {
      setCurrentChar('rest');
    }
  };

  const handleCharSelect = (char: string) => {
    setCurrentChar(char.toLowerCase());
    setInputText(char);
  };

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <h2 className={styles.title}>{t('title')}</h2>

        <div className={styles.toolContent}>
          <div className={styles.visualizationArea}>
            <CoreSemaphoreFigure
              leftAngle={pattern.left}
              rightAngle={pattern.right}
              size={300}
              className={styles.figureIcon}
            />
            <div className={styles.charDisplay}>
              {currentChar === 'rest' ? 'READY' : currentChar.toUpperCase()}
            </div>
          </div>

          <div className={styles.controls}>
            <FUIButton
              variant={currentChar === 'rest' ? 'solid' : 'outline'}
              onClick={() => handleCharSelect('rest')}
            >
              REST
            </FUIButton>
          </div>

          <div className={styles.inputArea}>
            <label className={styles.label}>{t('label_type_char')}</label>
            <CoreBaseInput
              value={inputText}
              onChangeValue={handleInputChange}
              placeholder={t('placeholder_type')}
              maxLength={1}
              allowedChars={/[a-zA-Z]/}
              transformToUpper={true}
            />
          </div>
        </div>
      </FUIGlassPanel>
    </div>
  );
};
