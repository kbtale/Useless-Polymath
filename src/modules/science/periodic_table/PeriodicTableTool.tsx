
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreMarkdownRenderer } from '../../../components/core/CoreMarkdownRenderer';
import { ELEMENTS } from './logic';
import type { Element } from './logic';
import clsx from 'clsx';
import styles from './PeriodicTable.module.scss'; 

export const PeriodicTableTool: React.FC = () => {
  const { t } = useTranslation('periodic_table');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const mainElements = ELEMENTS.filter(e => e.period <= 7);
  const fBlockElements = ELEMENTS.filter(e => e.period > 7);

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <h2 className={styles.title}>{t('title')}</h2>

        <div className={styles.scrollContainer}>
          <div className={styles.gridWrapper}>
            {/* Main Table */}
            <div className={styles.mainGrid}>
              {mainElements.map((el) => (
                <div
                  key={el.number}
                  className={clsx(styles.elementCell, styles[el.category])}
                  style={{
                    gridColumn: el.group,
                    gridRow: el.period
                  }}
                  onClick={() => setSelectedElement(el)}
                  onMouseEnter={() => setSelectedElement(el)}
                >
                  <div className={styles.atomicNumber}>{el.number}</div>
                  <div className={styles.symbol}>{el.symbol}</div>
                </div>
              ))}
            </div>

            {/* F-Block (Lanthanides & Actinides) */}
            <div className={styles.fBlockGrid}>
              {fBlockElements.map((el) => {
                 // Calculate visual column offset. 
                 // Logic: First F-block element (58 or 90) starts at Column 4 (Period 8/9)
                 // There are 14 elements. 
                 const colOffset = 4; // Visual Start Column
                 const indexInRow = el.number >= 90 ? el.number - 90 : el.number - 58;
                 
                 return (
                  <div
                    key={el.number}
                    className={clsx(styles.elementCell, styles[el.category])}
                    style={{
                      gridColumn: colOffset + indexInRow,
                      gridRow: el.period - 7 // Visual row 1 or 2
                    }}
                    onClick={() => setSelectedElement(el)}
                    onMouseEnter={() => setSelectedElement(el)}
                  >
                    <div className={styles.atomicNumber}>{el.number}</div>
                    <div className={styles.symbol}>{el.symbol}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.detailPanel}>
          {selectedElement ? (
            <>
              <div className={clsx(styles.largeSymbol, styles[selectedElement.category])}>
                {selectedElement.symbol}
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{t(`elements.${selectedElement.symbol}`)}</div>
                <div className={styles.prop}>{t('label_no')}: <strong>{selectedElement.number}</strong></div>
                <div className={styles.prop}>{t('label_mass')}: <strong>{selectedElement.mass}</strong></div>
                <div className={styles.prop}>{t('label_group')}: <strong>{selectedElement.group} ({t('suffix_std')})</strong></div>
                <div className={styles.prop}>{t('label_period')}: <strong>{selectedElement.period <= 7 ? selectedElement.period : (selectedElement.period === 8 ? `6 (${t('suffix_lan')})` : `7 (${t('suffix_act')})`)}</strong></div>
                <div className={styles.prop}>{t('label_category')}: <strong>{t(`category_${selectedElement.category}`).toUpperCase()}</strong></div>
              </div>
            </>
          ) : (
            <div style={{ fontStyle: 'italic', opacity: 0.5 }}>
              {t('placeholder_hover')}
            </div>
          )}
        </div>
      </FUIGlassPanel>

      <FUIGlassPanel className={styles.panel}>
         <CoreMarkdownRenderer content={t('guide')} />
      </FUIGlassPanel>
    </div>
  );
};
