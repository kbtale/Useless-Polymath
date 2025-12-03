import React from 'react';
import styles from './AppShell.module.scss';
import { FUIButton } from '../core/FUIButton';
import { FUIGlassPanel } from '../core/FUIGlassPanel';

interface AppShellProps {
  children: React.ReactNode;
  activeModule: string;
  onModuleChange: (id: string) => void;
}

const MODULES = [
  // MÓDULO I: CRONOMETRÍA Y ASTRONOMÍA
  { id: 'doomsday', name: 'Doomsday Algorithm', category: 'CRONOMETRÍA Y ASTRONOMÍA' },
  { id: 'timezones', name: 'Time Zones', category: 'CRONOMETRÍA Y ASTRONOMÍA' },
  { id: 'moon', name: 'Moon Phases', category: 'CRONOMETRÍA Y ASTRONOMÍA' },
  { id: 'calendar', name: 'Calendar Ordinal', category: 'CRONOMETRÍA Y ASTRONOMÍA' },

  // MÓDULO II: BASES NUMÉRICAS
  { id: 'binary', name: 'Binary Arithmetic', category: 'BASES NUMÉRICAS' },
  { id: 'hex', name: 'Hexadecimal Arithmetic', category: 'BASES NUMÉRICAS' },
  { id: 'roman', name: 'Roman Numerals', category: 'BASES NUMÉRICAS' },
  { id: 'bitwise', name: 'Bitwise Logic', category: 'BASES NUMÉRICAS' },
  { id: 'rule72', name: 'Rule of 72', category: 'BASES NUMÉRICAS' },

  // MÓDULO III: REDES E INFORMÁTICA
  { id: 'subnetting', name: 'Subnetting (CIDR)', category: 'REDES E INFORMÁTICA' },
  { id: 'hexcolor', name: 'Hex Color Est.', category: 'REDES E INFORMÁTICA' },
  { id: 'ascii', name: 'ASCII Table', category: 'REDES E INFORMÁTICA' },
  { id: 'storage', name: 'Storage Prefixes', category: 'REDES E INFORMÁTICA' },

  // MÓDULO IV: CRIPTOGRAFÍA Y SEÑALES
  { id: 'morse', name: 'Morse Code', category: 'CRIPTOGRAFÍA Y SEÑALES' },
  { id: 'nato', name: 'NATO Phonetic', category: 'CRIPTOGRAFÍA Y SEÑALES' },
  { id: 'cipher', name: 'Caesar/ROT Cipher', category: 'CRIPTOGRAFÍA Y SEÑALES' },
  { id: 'braille', name: 'Braille Reading', category: 'CRIPTOGRAFÍA Y SEÑALES' },
  { id: 'semaphore', name: 'Semaphore Flags', category: 'CRIPTOGRAFÍA Y SEÑALES' },

  // MÓDULO V: CIENCIA Y ALGORITMOS
  { id: 'periodic', name: 'Periodic Table', category: 'CIENCIA Y ALGORITMOS' },
  { id: 'thermo', name: 'Thermodynamics', category: 'CIENCIA Y ALGORITMOS' },
  { id: 'resistors', name: 'Resistor Codes', category: 'CIENCIA Y ALGORITMOS' },
  { id: 'luhn', name: 'Luhn Algorithm', category: 'CIENCIA Y ALGORITMOS' },
  { id: 'barcodes', name: 'Barcodes (EAN-13)', category: 'CIENCIA Y ALGORITMOS' },
  { id: 'blackjack', name: 'Card Counting', category: 'CIENCIA Y ALGORITMOS' },
];

export const AppShell: React.FC<AppShellProps> = ({ children, activeModule, onModuleChange }) => {
  const categories = Array.from(new Set(MODULES.map(m => m.category)));

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <h1>USELESS // SYSTEM</h1>
        <FUIButton variant="outline">Settings</FUIButton>
      </header>
      <main className={styles.main}>
        <aside className={styles.sidebar}>
          {categories.map(category => (
            <div key={category}>
              <h3>{category}</h3>
              <div className={styles.moduleGrid}>
                {MODULES.filter(m => m.category === category).map(module => (
                  <FUIButton 
                    key={module.id} 
                    variant={activeModule === module.id ? 'solid' : 'outline'}
                    onClick={() => onModuleChange(module.id)}
                    style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem' }}
                  >
                    {module.name}
                  </FUIButton>
                ))}
              </div>
            </div>
          ))}
        </aside>
        <div className={styles.content}>
          <FUIGlassPanel style={{ height: '100%' }}>
            {children}
          </FUIGlassPanel>
        </div>
      </main>
    </div>
  );
};
