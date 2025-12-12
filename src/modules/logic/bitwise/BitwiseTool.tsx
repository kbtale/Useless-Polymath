import React, { useState, useEffect } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { CoreBitRow } from '../../../components/core/CoreBitRow';
import { CoreSelect } from '../../../components/core/CoreSelect';
import { calculateBitwise, OPERATIONS } from './logic';
import type { BitwiseOperation } from './logic';
import styles from './Bitwise.module.scss';
import { useTranslation } from 'react-i18next';

export const BitwiseTool: React.FC = () => {
  const { t } = useTranslation(['bitwise', 'common']);
  
  const [valA, setValA] = useState(0);
  const [valB, setValB] = useState(0);
  const [op, setOp] = useState<BitwiseOperation>('AND');
  const [result, setResult] = useState(0);

  useEffect(() => {
    setResult(calculateBitwise(valA, valB, op));
  }, [valA, valB, op]);

  const isUnary = op === 'NOT';
  const isShift = op === 'LSHIFT' || op === 'RSHIFT';

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>{t('title')}</h2>

      <div className={styles.container}>
        
        {/* Operation Selection */}
        <div className={styles.controlRow}>
          <div style={{ width: '200px' }}>
            <CoreSelect
              label={t('operation', { defaultValue: 'OPERATION' })}
              options={OPERATIONS}
              value={op}
              onChange={(v) => setOp(v as BitwiseOperation)}
            />
          </div>
        </div>

        <div className={styles.toolLayout}>
        
          {/* Input A */}
          <div className={styles.bitRowWrapper}>
             <div className={styles.sectionTitle}>INPUT A ({valA})</div>
             <CoreBitRow 
               value={valA} 
               onChange={setValA} 
               bits={8} 
               interactive={true}
             />
          </div>

          <div className={styles.operatorDisplay}>
            {OPERATIONS.find(o => o.value === op)?.label.split(' ')[0]}
          </div>

          {/* Input B (Hidden for NOT) */}
          {!isUnary && (
            <div className={styles.bitRowWrapper}>
               <div className={styles.sectionTitle}>{isShift ? 'SHIFT AMOUNT' : 'INPUT B'} ({valB})</div>
               <CoreBitRow 
                 value={valB} 
                 onChange={setValB} 
                 bits={isShift ? 4 : 8} 
                 interactive={true}
               />
            </div>
          )}

          {/* Result */}
          <div className={styles.resultWrapper}>
             <div className={styles.sectionTitle}>RESULT ({result})</div>
             <CoreBitRow 
               value={result} 
               onChange={() => {}} // Read only
               bits={8} 
               interactive={false}
             />
          </div>

        </div>

      </div>
    </FUIGlassPanel>
  );
};
