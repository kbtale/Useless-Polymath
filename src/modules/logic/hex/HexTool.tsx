import React, { useState } from 'react';
import { FUIGlassPanel } from '../../../components/core/FUIGlassPanel';
import { decimalToHex, hexToDecimal } from './logic';
import styles from './Hex.module.scss';

export const HexTool: React.FC = () => {
  const [dec, setDec] = useState('255');
  const [hex, setHex] = useState('FF');
  const [bin, setBin] = useState('11111111');

  const handleDecChange = (val: string) => {
    setDec(val);
    if (!val) { setHex(''); setBin(''); return; }
    try {
      const n = parseInt(val);
      if (isNaN(n)) return;
      setHex(decimalToHex(n));
      setBin(n.toString(2).padStart(8, '0'));
    } catch (e) { /* ignore */ }
  };

  const handleHexChange = (val: string) => {
    setHex(val.toUpperCase());
    if (!val) { setDec(''); setBin(''); return; }
    try {
      const n = hexToDecimal(val);
      setDec(n.toString());
      setBin(n.toString(2).padStart(8, '0'));
    } catch (e) { /* ignore */ }
  };

  return (
    <FUIGlassPanel className={styles.panel}>
      <h2 className={styles.title}>HEXADECIMAL</h2>
      
      <div className={styles.container}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>DECIMAL (Base 10)</label>
          <input 
            type="number" 
            value={dec}
            onChange={(e) => handleDecChange(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>HEXADECIMAL (Base 16)</label>
          <input 
            type="text" 
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>BINARY (Base 2)</label>
          <div style={{ 
            fontFamily: 'JetBrains Mono, monospace', 
            fontSize: '1rem', 
            color: '#666666',
            letterSpacing: '0.1em'
          }}>
            {bin.match(/.{1,4}/g)?.join(' ') || bin}
          </div>
        </div>
      </div>
    </FUIGlassPanel>
  );
};
