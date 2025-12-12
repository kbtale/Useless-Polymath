import React, { useState, useEffect } from 'react';
import styles from './AppShell.module.scss';
import { FUIButton } from '../core/FUIButton';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface Module {
  id: string;
  categoryKey: string;
}

const MODULES: Module[] = [
  { id: 'doomsday', categoryKey: 'modules.cronometria' },
  { id: 'time_zones', categoryKey: 'modules.cronometria' },
  { id: 'moon', categoryKey: 'modules.cronometria' },
  { id: 'ordinal', categoryKey: 'modules.cronometria' },

  { id: 'binary', categoryKey: 'modules.logic' },
  { id: 'hexadecimal', categoryKey: 'modules.logic' },
  { id: 'roman_numerals', categoryKey: 'modules.logic' },
  { id: 'bitwise', categoryKey: 'modules.logic' },
  { id: 'rule_72', categoryKey: 'modules.logic' },

  { id: 'subnetting', categoryKey: 'modules.redes' },
  { id: 'color_theory', categoryKey: 'modules.redes' },
  { id: 'ascii', categoryKey: 'modules.redes' },
  { id: 'storage_units', categoryKey: 'modules.redes' },

  { id: 'morse_code', categoryKey: 'modules.criptografia' },
  { id: 'nato_alphabet', categoryKey: 'modules.criptografia' },
  { id: 'caesar_cipher', categoryKey: 'modules.criptografia' },
  { id: 'braille', categoryKey: 'modules.criptografia' },
  { id: 'semaphore', categoryKey: 'modules.criptografia' },

  { id: 'periodic_table', categoryKey: 'modules.ciencia' },
  { id: 'thermodynamics', categoryKey: 'modules.ciencia' },
  { id: 'resistor_codes', categoryKey: 'modules.ciencia' },
  { id: 'luhn_algorithm', categoryKey: 'modules.ciencia' },
  { id: 'ean_13', categoryKey: 'modules.ciencia' },
  { id: 'card_counting', categoryKey: 'modules.ciencia' },
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
  const { t, i18n } = useTranslation(['common', 'doomsday', 'time_zones', 'moon', 'ordinal', 'binary', 'hexadecimal']);
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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const categories = Array.from(new Set(MODULES.map(m => m.categoryKey)));

  // Resolve current module
  // Note: activeModule from App.tsx is now normalized to match module IDs (e.g. 'hexadecimal', 'ordinal').
  
  const currentModule = MODULES.find(m => m.id === activeModule);
  
  const categoryName = currentModule ? t(currentModule.categoryKey, { ns: 'common' }) : 'UNKNOWN';
  const moduleName = currentModule ? t('title', { ns: currentModule.id, defaultValue: currentModule.id.toUpperCase() }) : 'UNKNOWN';

  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <div className={styles.title}>
          <div className={styles.square}></div>
          <h1>{t('app_title')} <span className={styles.version}>v0.0.1-ALPHA</span></h1>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginRight: '1rem' }}>
          <FUIButton 
            onClick={() => changeLanguage('en')} 
            variant={i18n.language === 'en' ? 'solid' : 'outline'}
            style={{ padding: '0.25rem 0.75rem', minHeight: '32px', fontSize: '0.7rem' }}
          >
            EN
          </FUIButton>
          <FUIButton 
            onClick={() => changeLanguage('es')} 
            variant={i18n.language === 'es' ? 'solid' : 'outline'}
            style={{ padding: '0.25rem 0.75rem', minHeight: '32px', fontSize: '0.7rem' }}
          >
            ES
          </FUIButton>
          <FUIButton 
            onClick={() => changeLanguage('it')} 
            variant={i18n.language === 'it' ? 'solid' : 'outline'}
             style={{ padding: '0.25rem 0.75rem', minHeight: '32px', fontSize: '0.7rem' }}
          >
            IT
          </FUIButton>
        </div>

        <FUIButton onClick={() => alert(t('settings') + ' // ' + t('access_denied', { ns: 'common' }))}>{t('settings')}</FUIButton>
        <div className={styles.cornerDeco}></div>
      </header>

      <div className={styles.mainLayout}>
        
        <aside className={styles.sidebar}>
          <div className={styles.scrollArea}>
            {categories.map(catKey => (
              <div key={catKey}>
                <h2 className={styles.sectionTitle}>{t(catKey, { ns: 'common', defaultValue: catKey })}</h2>
                <ul className={styles.menuList}>
                  {MODULES.filter(m => m.categoryKey === catKey).map(m => (
                    <li 
                      key={m.id}
                      className={clsx(styles.menuItem, activeModule === m.id && styles.active)}
                      onClick={() => onModuleChange(m.id)}
                    >
                      {t('title', { ns: m.id, defaultValue: m.id.toUpperCase().replace('_', ' ') })}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <div className={styles.stat}>
              <span>{t('uptime', { ns: 'common' })}:</span>
              <span>{uptime}</span>
            </div>
            <div className={styles.stat}>
              <span>{t('memory', { ns: 'common' })}:</span>
              <span>64KB</span>
            </div>
          </div>

          <div className={`${styles.crosshair} ${styles['ch-tl']}`}></div>
          <div className={`${styles.crosshair} ${styles['ch-br']}`}></div>
        </aside>

        <main className={styles.contentArea}>
          <div className={styles.statusBar}>
            {t('home')} &gt; {categoryName} &gt; {moduleName}
          </div>

          <div className={styles.tabs}>
            <div className={styles.tabGroup}>
              <button 
                className={clsx(styles.tabBtn, mode === 'tool' && styles.active)}
                onClick={() => onModeChange('tool')}
              >
                {t('visualizer')}
              </button>
              <button 
                className={clsx(styles.tabBtn, mode === 'practice' && styles.active)}
                onClick={() => onModeChange('practice')}
              >
                {t('practice')}
              </button>
            </div>
            <button 
              className={clsx(styles.tabBtn, mode === 'guide' && styles.active, styles.helpTab)}
              onClick={() => onModeChange('guide')}
            >
              [ ? ] {t('guide')}
            </button>
          </div>

          <div className={styles.workspace}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
