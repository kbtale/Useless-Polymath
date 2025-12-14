
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreMarkdownRenderer } from '../../../components/core/CoreMarkdownRenderer';
import { FUIButton } from '../../../components/core/FUIButton';
import { CoreSelect } from '../../../components/core/CoreSelect';
import { BAND_COLORS, calculateResistance, formatOhms } from './logic';
import styles from './ResistorCodes.module.scss';

export const ResistorTool: React.FC = () => {
  const { t } = useTranslation('resistor_codes');
  const [mode, setMode] = useState<4 | 5>(4);
  const [bands, setBands] = useState<string[]>(mode === 4 
    ? ['brown', 'black', 'red', 'gold'] 
    : ['brown', 'black', 'black', 'brown', 'brown']
  );

  const resetBands = (m: 4 | 5) => {
    setMode(m);
    setBands(m === 4 
      ? ['brown', 'black', 'red', 'gold'] 
      : ['brown', 'black', 'black', 'brown', 'brown']
    );
  };

  const updateBand = (index: number, color: string) => {
    const newBands = [...bands];
    newBands[index] = color;
    setBands(newBands);
  };

  const { value, tolerance } = calculateResistance(bands, mode);

  // Helper to get hex for SVG
  const getHex = (name: string) => BAND_COLORS.find(c => c.name === name)?.hex ?? '#ccc';

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <div className={styles.container}>
          <h2 className={styles.title}>{t('title')}</h2>

        <div className={styles.modeToggle}>
          <FUIButton onClick={() => resetBands(4)} variant={mode === 4 ? 'solid' : 'outline'}>
            {t('label_bands_4')}
          </FUIButton>
          <FUIButton onClick={() => resetBands(5)} variant={mode === 5 ? 'solid' : 'outline'}>
            {t('label_bands_5')}
          </FUIButton>
        </div>

        {/* Resistor SVG Visualizer */}
        <div className={styles.resistorDisplay}>
          <svg viewBox="0 0 400 150">
            {/* Wires */}
            <path d="M0,75 L50,75 M350,75 L400,75" stroke="#999" strokeWidth="10" />
            
            {/* Body */}
            <path d="M50,40 Q50,25 75,25 L325,25 Q350,25 350,40 L350,110 Q350,125 325,125 L75,125 Q50,125 50,110 Z" fill="#E8D5B5" stroke="#333" strokeWidth="2" />

            {/* Bands */}
            {bands.map((color, i) => {
              // Calculate x position based on mode and index
              // 4 Bands: 100, 140, 180 ... 300
              // 5 Bands: 90, 130, 170, 210 ... 310
              let x = 0;
              if (mode === 4) {
                 if (i < 3) x = 100 + (i * 40);
                 else x = 300;
              } else {
                 if (i < 4) x = 90 + (i * 40);
                 else x = 310;
              }
              
              return (
                <rect 
                  key={i} 
                  x={x} 
                  y="25" 
                  width="15" 
                  height="100" 
                  fill={getHex(color)} 
                  stroke="rgba(0,0,0,0.2)"
                />
              );
            })}
          </svg>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          {bands.map((color, i) => (
            <div key={i} className={styles.controlGroup}>
              <CoreSelect
                value={color}
                onChange={(val) => updateBand(i, val)}
                options={BAND_COLORS
                  .filter(c => {
                    // Filter logic: Only show valid colors for this position
                    if (i < (mode === 4 ? 2 : 3)) return c.value !== null; // Digits
                    if (i === (mode === 4 ? 2 : 3)) return c.multipliers[mode] !== undefined; // Multiplier
                    if (i === (mode === 4 ? 3 : 4)) return c.tolerance !== null; // Tolerance
                    return true;
                  })
                  .map(c => ({
                    value: c.name,
                    label: t(`color_${c.name}`)
                  }))
                }
                className={styles.colorSelect}
              />
              <div 
                style={{ 
                   height: '4px', 
                   width: '100%', 
                   background: getHex(color),
                   borderRadius: '2px',
                   marginTop: '4px'
                }} 
              />
            </div>
          ))}
        </div>

        {/* Result */}
        <div className={styles.result}>
          <div className={styles.value}>{formatOhms(value)}</div>
          <div className={styles.tol}>±{tolerance}%</div>
        </div>

        </div>
      </FUIGlassPanel>

      <FUIGlassPanel className={styles.panel}>
        <CoreMarkdownRenderer content={t('guide')} />
      </FUIGlassPanel>
    </div>
  );
};
