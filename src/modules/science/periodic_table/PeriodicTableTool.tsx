import clsx from 'clsx';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIGlassPanel } from '@/components/core/FUIGlassPanel';
import styles from './PeriodicTable.module.scss';
import { ELEMENTS, type Element } from './logic';

const MAIN_ELEMENTS = ELEMENTS.filter((e) => e.period <= 7);
const F_BLOCK_ELEMENTS = ELEMENTS.filter((e) => e.period > 7);

export const PeriodicTableTool: React.FC = () => {
  const { t } = useTranslation('periodic_table');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  return (
    <div className={styles.toolContainer}>
      <FUIGlassPanel className={styles.panel}>
        <h2 className={styles.title}>{t('title')}</h2>

        <div className={styles.scrollContainer}>
          <div className={styles.gridWrapper}>
            <div className={styles.mainGrid}>
              {MAIN_ELEMENTS.map((el) => (
                <div
                  key={el.number}
                  className={clsx(styles.elementCell, styles[el.category])}
                  style={{
                    gridColumn: el.group,
                    gridRow: el.period,
                  }}
                  onClick={() => setSelectedElement(el)}
                  onMouseEnter={() => setSelectedElement(el)}
                >
                  <div className={styles.atomicNumber}>{el.number}</div>
                  <div className={styles.symbol}>{el.symbol}</div>
                </div>
              ))}
            </div>

            <div className={styles.fBlockGrid}>
              {F_BLOCK_ELEMENTS.map((el) => {
                const colOffset = 4;
                const indexInRow = el.number >= 90 ? el.number - 90 : el.number - 58;

                return (
                  <div
                    key={el.number}
                    className={clsx(styles.elementCell, styles[el.category])}
                    style={{
                      gridColumn: colOffset + indexInRow,
                      gridRow: el.period - 7,
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
                <div className={styles.prop}>
                  {t('label_no')}: <strong>{selectedElement.number}</strong>
                </div>
                <div className={styles.prop}>
                  {t('label_mass')}: <strong>{selectedElement.mass}</strong>
                </div>
                <div className={styles.prop}>
                  {t('label_group')}:{' '}
                  <strong>
                    {selectedElement.group} ({t('suffix_std')})
                  </strong>
                </div>
                <div className={styles.prop}>
                  {t('label_period')}:{' '}
                  <strong>
                    {selectedElement.period <= 7
                      ? selectedElement.period
                      : selectedElement.period === 8
                        ? `6 (${t('suffix_lan')})`
                        : `7 (${t('suffix_act')})`}
                  </strong>
                </div>
                <div className={styles.prop}>
                  {t('label_category')}:{' '}
                  <strong>{t(`category_${selectedElement.category}`).toUpperCase()}</strong>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.placeholderHint}>{t('placeholder_hover')}</div>
          )}
        </div>
      </FUIGlassPanel>
    </div>
  );
};
