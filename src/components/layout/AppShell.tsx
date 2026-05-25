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
  { id: 'doomsday', categoryKey: 'modules.chronometry' },
  { id: 'time_zones', categoryKey: 'modules.chronometry' },
  { id: 'moon', categoryKey: 'modules.chronometry' },
  { id: 'ordinal', categoryKey: 'modules.chronometry' },

  { id: 'binary', categoryKey: 'modules.logic' },
  { id: 'hexadecimal', categoryKey: 'modules.logic' },
  { id: 'roman_numerals', categoryKey: 'modules.logic' },
  { id: 'bitwise', categoryKey: 'modules.logic' },
  { id: 'rule_72', categoryKey: 'modules.logic' },

  { id: 'subnetting', categoryKey: 'modules.networks' },
  { id: 'color_theory', categoryKey: 'modules.networks' },
  { id: 'ascii', categoryKey: 'modules.networks' },
  { id: 'storage_units', categoryKey: 'modules.networks' },

  { id: 'morse_code', categoryKey: 'modules.cryptography' },
  { id: 'nato_alphabet', categoryKey: 'modules.cryptography' },
  { id: 'caesar_cipher', categoryKey: 'modules.cryptography' },
  { id: 'braille', categoryKey: 'modules.cryptography' },
  { id: 'semaphore', categoryKey: 'modules.cryptography' },

  { id: 'periodic_table', categoryKey: 'modules.science' },
  { id: 'thermodynamics', categoryKey: 'modules.science' },
  { id: 'resistor_codes', categoryKey: 'modules.science' },
  { id: 'luhn_algorithm', categoryKey: 'modules.science' },
  { id: 'ean_13', categoryKey: 'modules.science' },
  { id: 'card_counting', categoryKey: 'modules.science' },
];

const formatDefaultTitle = (id: string): string => {
  return id
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

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
  const { t, i18n } = useTranslation([
    'common',
    'doomsday',
    'time_zones',
    'moon',
    'ordinal',
    'binary',
    'hexadecimal',
    'roman_numerals',
    'bitwise',
    'rule_72',
    'subnetting',
    'color_theory',
    'ascii',
    'storage_units',
    'morse_code',
    'nato_alphabet',
    'caesar_cipher',
    'braille',
    'semaphore',
    'periodic_table',
    'thermodynamics',
    'resistor_codes',
    'luhn_algorithm',
    'ean_13',
    'card_counting'
  ]);
  const [uptime, setUptime] = useState('00:00:00');
  const [showSettings, setShowSettings] = useState(false);
  const [scoresVersion, setScoresVersion] = useState(0);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem('polymath_sidebar_collapsed');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('polymath_sidebar_collapsed', String(next));
      return next;
    });
  };

  const [hiddenModules, setHiddenModules] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('polymath_hidden_modules');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [hiddenCategories, setHiddenCategories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('polymath_hidden_categories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleModuleVisibility = (moduleId: string) => {
    setHiddenModules(prev => {
      const next = prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId];
      localStorage.setItem('polymath_hidden_modules', JSON.stringify(next));
      return next;
    });
  };

  const toggleCategoryVisibility = (catKey: string) => {
    setHiddenCategories(prev => {
      const next = prev.includes(catKey)
        ? prev.filter(k => k !== catKey)
        : [...prev, catKey];
      localStorage.setItem('polymath_hidden_categories', JSON.stringify(next));
      return next;
    });
  };

  const handleIndividualReset = (moduleId: string) => {
    localStorage.removeItem(`polymath_streak_${moduleId}`);
    localStorage.removeItem(`polymath_high_${moduleId}`);
    setScoresVersion(v => v + 1);
  };

  const handleMasterReset = () => {
    if (window.confirm('Are you sure you want to reset all practice streaks and high scores? This action cannot be undone.')) {
      MODULES.forEach(m => {
        localStorage.removeItem(`polymath_streak_${m.id}`);
        localStorage.removeItem(`polymath_high_${m.id}`);
      });
      setScoresVersion(v => v + 1);
    }
  };

  const STYLES = [
    { id: 'mono', label: 'MONO' },
    { id: 'wellfound', label: 'WELLFOUND' },
    { id: 'ori', label: 'ORI' },
    { id: 'motherduck', label: 'MOTHERDUCK' }
  ];

  const [activeStyle, setActiveStyle] = useState(() => {
    return localStorage.getItem('app-style') || 'mono';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-style', activeStyle);
    localStorage.setItem('app-style', activeStyle);
  }, [activeStyle]);

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
  
  const categoryName = currentModule ? toTitleCase(t(currentModule.categoryKey, { ns: 'common' })) : 'UNKNOWN';
  const moduleName = currentModule ? toTitleCase(t('title', { ns: currentModule.id, defaultValue: formatDefaultTitle(currentModule.id) })) : 'UNKNOWN';

  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button 
            className={styles.menuToggle}
            onClick={() => {
              if (window.innerWidth <= 768) {
                setIsMobileMenuOpen(prev => !prev);
              } else {
                toggleSidebar();
              }
            }}
            aria-label="Toggle Navigation Sidebar"
          >
            ☰
          </button>
          <div className={styles.title}>
            <div className={styles.square}></div>
            <h1>{t('app_title')} <span className={styles.version}>v0.0.1-ALPHA</span></h1>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginRight: '1rem' }}>
          {/* Style Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', opacity: 0.7 }}>STYLE:</span>
            <select 
              value={activeStyle}
              onChange={(e) => setActiveStyle(e.target.value)}
              style={{ 
                background: 'var(--bg-canvas)',
                color: 'var(--text-main)',
                border: '1px solid var(--line-color)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                cursor: 'pointer',
                outline: 'none',
                borderRadius: 'var(--radius-button)'
              }}
            >
              {STYLES.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Language Selector */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
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
        </div>

        <FUIButton onClick={() => setShowSettings(true)}>{t('settings')}</FUIButton>
        <div className={styles.cornerDeco}></div>
      </header>

      <div className={styles.mainLayout}>
        
        <aside className={clsx(
          styles.sidebar,
          isSidebarCollapsed && styles.collapsed,
          isMobileMenuOpen && styles.mobileOpen
        )}>
          <div className={styles.scrollArea}>
            {categories.filter(catKey => {
              if (hiddenCategories.includes(catKey)) return false;
              const catModules = MODULES.filter(m => m.categoryKey === catKey);
              const visibleCatModules = catModules.filter(m => !hiddenModules.includes(m.id));
              return visibleCatModules.length > 0;
            }).map(catKey => (
              <div key={catKey}>
                <h2 className={styles.sectionTitle}>
                  {t(catKey, { ns: 'common', defaultValue: catKey })}
                </h2>
                <ul className={styles.menuList}>
                  {MODULES.filter(m => m.categoryKey === catKey && !hiddenModules.includes(m.id)).map(m => (
                    <li 
                      key={m.id}
                      className={clsx(styles.menuItem, activeModule === m.id && styles.active)}
                      onClick={() => {
                        onModuleChange(m.id);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {toTitleCase(t('title', { ns: m.id, defaultValue: formatDefaultTitle(m.id) }))}
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

        {isMobileMenuOpen && (
          <div 
            className={styles.mobileBackdrop} 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

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
              {t('guide')}
            </button>
          </div>

          <div className={styles.workspace}>
            {children}
          </div>
        </main>
      </div>

      {showSettings && (
        <div className={styles.modalOverlay} onClick={() => setShowSettings(false)}>
          <div onClick={(e: React.MouseEvent) => e.stopPropagation()} className={styles.settingsModal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{t('settings')}</h2>
              <button className={styles.closeBtn} onClick={() => setShowSettings(false)}>×</button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.settingsSection}>
                <h3 className={styles.sectionHeader}>{t('general', 'General')}</h3>
                
                <div className={styles.settingsRow}>
                  <span className={styles.rowLabel}>{t('theme', 'Style Theme')}</span>
                  <select 
                    value={activeStyle}
                    onChange={(e) => setActiveStyle(e.target.value)}
                    className={styles.selectInput}
                  >
                    {STYLES.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.settingsRow}>
                  <span className={styles.rowLabel}>{t('language', 'Language')}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['en', 'es', 'it'].map(lng => (
                      <FUIButton 
                        key={lng}
                        onClick={() => changeLanguage(lng)} 
                        variant={i18n.language === lng ? 'solid' : 'outline'}
                        style={{ padding: '0.25rem 0.75rem', minHeight: '32px', fontSize: '0.7rem' }}
                      >
                        {lng.toUpperCase()}
                      </FUIButton>
                    ))}
                  </div>
                </div>

                <div className={styles.settingsRow} style={{ marginTop: '1.25rem', borderTop: '1px solid var(--line-color)', paddingTop: '1.25rem' }}>
                  <span className={styles.rowLabel}>{t('master_stats_control', 'Master Stats Reset')}</span>
                  <FUIButton onClick={handleMasterReset} variant="outline" style={{ color: '#ef4444', borderColor: '#fca5a5' }}>
                    {t('reset_all_scores', 'Reset All Practice Scores')}
                  </FUIButton>
                </div>
              </div>

              <div className={styles.settingsSection} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <h3 className={styles.sectionHeader}>{t('practice_scoreboards', 'Practice Scoreboards & Visibility')}</h3>
                <div key={scoresVersion} className={styles.scoreboardTableContainer}>
                  <table className={styles.scoreboardTable}>
                    <thead>
                      <tr>
                        <th>{t('category_header', 'Category')}</th>
                        <th>{t('module_header', 'Module')}</th>
                        <th style={{ textAlign: 'center' }}>{t('visible_header', 'Show')}</th>
                        <th>{t('streak_header', 'Streak')}</th>
                        <th>{t('high_score_header', 'High Score')}</th>
                        <th>{t('actions_header', 'Actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MODULES.map(m => {
                        const streak = parseInt(localStorage.getItem(`polymath_streak_${m.id}`) || '0', 10);
                        const high = parseInt(localStorage.getItem(`polymath_high_${m.id}`) || '0', 10);
                        const isCatVisible = !hiddenCategories.includes(m.categoryKey);
                        const isModVisible = !hiddenModules.includes(m.id);
                        return (
                          <tr key={m.id}>
                            <td>
                              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
                                <input 
                                  type="checkbox" 
                                  checked={isCatVisible}
                                  onChange={() => toggleCategoryVisibility(m.categoryKey)}
                                  className={styles.visibilityCheckbox}
                                />
                                <span style={{ opacity: isCatVisible ? 1 : 0.5 }}>
                                  {toTitleCase(t(m.categoryKey, { ns: 'common' }))}
                                </span>
                              </label>
                            </td>
                            <td style={{ opacity: isModVisible && isCatVisible ? 1 : 0.5 }}>
                              {toTitleCase(t('title', { ns: m.id, defaultValue: formatDefaultTitle(m.id) }))}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <input 
                                type="checkbox" 
                                checked={isModVisible}
                                onChange={() => toggleModuleVisibility(m.id)}
                                disabled={!isCatVisible}
                                className={styles.visibilityCheckbox}
                              />
                            </td>
                            <td>{streak}</td>
                            <td>{high}</td>
                            <td>
                              <button 
                                className={styles.rowResetBtn}
                                onClick={() => handleIndividualReset(m.id)}
                              >
                                {t('reset', 'Reset')}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
