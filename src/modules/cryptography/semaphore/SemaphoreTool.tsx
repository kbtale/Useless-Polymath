
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBaseInput } from '../../../components/core/CoreBaseInput';
import { CoreSemaphoreFigure } from '../../../components/core/CoreSemaphoreFigure';
import { CoreMarkdownRenderer } from '../../../components/core/CoreMarkdownRenderer';
import { FUIButton } from '../../../components/core/FUIButton';
import { getSemaphorePattern } from './logic';
import styles from './SemaphoreTool.module.scss'; 

export const SemaphoreTool: React.FC = () => {
  const { t } = useTranslation('semaphore');
  const [input, setInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Normalize input to A-Z 0-9
  const cleanInput = input.replace(/[^a-zA-Z0-9 ]/g, '');
  const currentChar = cleanInput[currentIndex] || 'rest';
  const pattern = getSemaphorePattern(currentChar);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && cleanInput.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= cleanInput.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, cleanInput]);

  const handleStopStart = () => {
    setIsPlaying(!isPlaying);
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
              className="text-black" // Using standard coloration, SVG uses currentColor
            />
            <div className={styles.charDisplay}>
              {currentChar === 'rest' ? 'READY' : currentChar.toUpperCase()}
            </div>
          </div>

          <div className={styles.controls}>
            <FUIButton 
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              variant="outline"
            >
              {t('prev', 'Prev')}
            </FUIButton>
            
            <FUIButton 
              onClick={handleStopStart}
              variant={isPlaying ? 'solid' : 'outline'}
            >
              {isPlaying ? t('stop', 'Stop') : t('play', 'Play')}
            </FUIButton>

            <FUIButton 
              onClick={() => setCurrentIndex(Math.min(cleanInput.length - 1, currentIndex + 1))}
              disabled={currentIndex >= cleanInput.length - 1}
              variant="outline"
            >
              {t('next', 'Next')}
            </FUIButton>
          </div>

          <div className={styles.inputArea}>
            <label className={styles.label}>{t('text_input')}</label>
            <CoreBaseInput
              value={input}
              onChangeValue={(val) => {
                setInput(val);
                setCurrentIndex(0);
                setIsPlaying(false);
              }}
              placeholder="HELLO WORLD"
              maxLength={50}
            />
          </div>
        </div>
      </FUIGlassPanel>

      <FUIGlassPanel className={styles.panel}>
         <CoreMarkdownRenderer content={t('guide')} />
      </FUIGlassPanel>
    </div>
  );
};
