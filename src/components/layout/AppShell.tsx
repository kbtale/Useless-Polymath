import React, { useState, useEffect } from 'react';
import styles from './AppShell.module.scss';
import { FUIButton } from '../core/FUIButton';
import clsx from 'clsx';

interface Module {
  id: string;
  name: string;
  category: string;
}

const MODULES: Module[] = [
  // CRONOMETRÍA Y ASTRONOMÍA
  { id: 'doomsday', name: 'DOOMSDAY ALGORITHM', category: '01 // CRONOMETRÍA' },
  { id: 'timezones', name: 'TIME ZONES', category: '01 // CRONOMETRÍA' },
  { id: 'moon', name: 'MOON PHASES', category: '01 // CRONOMETRÍA' },
  { id: 'calendar', name: 'CALENDAR ORDINAL', category: '01 // CRONOMETRÍA' },

  // BASES NUMÉRICAS
  { id: 'binary', name: 'BINARY ARITHMETIC', category: '02 // BASES NUMÉRICAS' },
  { id: 'hex', name: 'HEXADECIMAL', category: '02 // BASES NUMÉRICAS' },
  { id: 'roman', name: 'ROMAN NUMERALS', category: '02 // BASES NUMÉRICAS' },
  { id: 'bitwise', name: 'BITWISE LOGIC', category: '02 // BASES NUMÉRICAS' },
  { id: 'rule72', name: 'RULE OF 72', category: '02 // BASES NUMÉRICAS' },

  // REDES E INFORMÁTICA
  { id: 'subnetting', name: 'SUBNETTING (CIDR)', category: '03 // REDES' },
  { id: 'hexcolor', name: 'HEX COLOR EST.', category: '03 // REDES' },
  { id: 'ascii', name: 'ASCII TABLE', category: '03 // REDES' },
  { id: 'storage', name: 'STORAGE UNITS', category: '03 // REDES' },

  // CRIPTOGRAFÍA Y SEÑALES
  { id: 'morse', name: 'MORSE CODE', category: '04 // CRIPTOGRAFÍA' },
  { id: 'nato', name: 'NATO PHONETIC', category: '04 // CRIPTOGRAFÍA' },
  { id: 'cipher', name: 'CAESAR/ROT CIPHER', category: '04 // CRIPTOGRAFÍA' },
  { id: 'braille', name: 'BRAILLE READING', category: '04 // CRIPTOGRAFÍA' },
  { id: 'semaphore', name: 'SEMAPHORE FLAGS', category: '04 // CRIPTOGRAFÍA' },

  // CIENCIA Y ALGORITMOS
  { id: 'periodic', name: 'PERIODIC TABLE', category: '05 // CIENCIA' },
  { id: 'thermo', name: 'THERMODYNAMICS', category: '05 // CIENCIA' },
  { id: 'resistors', name: 'RESISTOR CODES', category: '05 // CIENCIA' },
  { id: 'luhn', name: 'LUHN ALGORITHM', category: '05 // CIENCIA' },
  { id: 'barcodes', name: 'BARCODES (EAN-13)', category: '05 // CIENCIA' },
  { id: 'blackjack', name: 'CARD COUNTING', category: '05 // CIENCIA' },
];

interface AppShellProps {
  children: React.ReactNode;
  activeModule: string;
  onModuleChange: (id: string) => void;
  mode: 'tool' | 'practice' | 'guide';
  onModeChange: (mode: 'tool' | 'practice' | 'guide') => void;
}

export const AppShell: React.FC<AppShellProps> = ({ 
  children, 
  activeModule, 
  onModuleChange,
  mode,
  onModeChange
}) => {
  const [uptime, setUptime] = useState('00:00:00');

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      setUptime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Group modules by category
  const categories = Array.from(new Set(MODULES.map(m => m.category)));

  // Breadcrumbs
  const currentModule = MODULES.find(m => m.id === activeModule);
  const categoryName = currentModule?.category.split('//')[1]?.trim() || 'UNKNOWN';
  const moduleName = currentModule?.name || 'UNKNOWN';

  return (
    <div className={styles.appShell}>
      {/* TOP BAR */}
      <header className={styles.header}>
        <div className={styles.title}>
          <div className={styles.square}></div>
          <h1>USELESS <span className={styles.version}>v1.0.4-RC</span></h1>
        </div>
        <FUIButton onClick={() => alert('SETTINGS // ACCESS DENIED')}>SETTINGS</FUIButton>
        <div className={styles.cornerDeco}></div>
      </header>

      {/* MAIN LAYOUT */}
      <div className={styles.mainLayout}>
        
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.scrollArea}>
            {categories.map(cat => (
              <div key={cat}>
                <h2 className={styles.sectionTitle}>{cat}</h2>
                <ul className={styles.menuList}>
                  {MODULES.filter(m => m.category === cat).map(m => (
                    <li 
                      key={m.id}
                      className={clsx(styles.menuItem, activeModule === m.id && styles.active)}
                      onClick={() => onModuleChange(m.id)}
                    >
                      {m.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <div className={styles.stat}>
              <span>UPTIME:</span>
              <span>{uptime}</span>
            </div>
            <div className={styles.stat}>
              <span>MEMORY:</span>
              <span>64KB</span>
            </div>
          </div>

          <div className={`${styles.crosshair} ${styles['ch-tl']}`}></div>
          <div className={`${styles.crosshair} ${styles['ch-br']}`}></div>
        </aside>

        {/* MAIN CONTENT */}
        <main className={styles.contentArea}>
          {/* STATUS BAR (Wayfinding) */}
          <div className={styles.statusBar}>
            HOME &gt; {categoryName} &gt; {moduleName}
          </div>

          {/* TABS */}
          <div className={styles.tabs}>
            <div className={styles.tabGroup}>
              <button 
                className={clsx(styles.tabBtn, mode === 'tool' && styles.active)}
                onClick={() => onModeChange('tool')}
              >
                VISUALIZER
              </button>
              <button 
                className={clsx(styles.tabBtn, mode === 'practice' && styles.active)}
                onClick={() => onModeChange('practice')}
              >
                PRACTICE
              </button>
            </div>
            <button 
              className={clsx(styles.tabBtn, mode === 'guide' && styles.active, styles.helpTab)}
              onClick={() => onModeChange('guide')}
            >
              [ ? ] GUIDE
            </button>
          </div>

          {/* WORKSPACE */}
          <div className={styles.workspace}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
