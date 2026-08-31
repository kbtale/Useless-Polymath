import clsx from 'clsx';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { storageService } from '@/services/storage';
import { FUIButton } from '../core/FUIButton';
import styles from './AppShell.module.scss';
import { SettingsModal } from './SettingsModal';

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
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
  onModeChange,
}) => {
  const { t, i18n } = useTranslation(['common', 'navigation']);
  const [showSettings, setShowSettings] = useState(false);
  const [scoresVersion, setScoresVersion] = useState(0);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return storageService.getSidebarCollapsed();
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      storageService.setSidebarCollapsed(next);
      return next;
    });
  };

  const [hiddenModules, setHiddenModules] = useState<string[]>(() => {
    return storageService.getHiddenModules();
  });

  const [hiddenCategories, setHiddenCategories] = useState<string[]>(() => {
    return storageService.getHiddenCategories();
  });

  const toggleModuleVisibility = (moduleId: string) => {
    setHiddenModules((prev) => {
      const next = prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId];
      storageService.setHiddenModules(next);
      return next;
    });
  };

  const toggleCategoryVisibility = (catKey: string) => {
    setHiddenCategories((prev) => {
      const next = prev.includes(catKey) ? prev.filter((k) => k !== catKey) : [...prev, catKey];
      storageService.setHiddenCategories(next);
      return next;
    });
  };

  const handleIndividualReset = (moduleId: string) => {
    storageService.resetModuleScores(moduleId);
    setScoresVersion((v) => v + 1);
  };

  const handleMasterReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all practice streaks and high scores? This action cannot be undone.',
      )
    ) {
      storageService.resetAllScores(MODULES);
      setScoresVersion((v) => v + 1);
    }
  };

  const STYLES = [
    { id: 'mono', label: 'MONO' },
    { id: 'wellfound', label: 'WELLFOUND' },
    { id: 'ori', label: 'ORI' },
    { id: 'motherduck', label: 'MOTHERDUCK' },
  ];

  const [activeStyle, setActiveStyle] = useState(() => {
    return storageService.getAppStyle('mono');
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-style', activeStyle);
    storageService.setAppStyle(activeStyle);
  }, [activeStyle]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    storageService.setLanguage(lng);
  };

  const categories = Array.from(new Set(MODULES.map((m) => m.categoryKey)));

  const currentModule = MODULES.find((m) => m.id === activeModule);

  const categoryName = currentModule
    ? toTitleCase(t(currentModule.categoryKey, { ns: 'common' }))
    : 'UNKNOWN';

  const moduleName = currentModule
    ? toTitleCase(
        t(currentModule.id, {
          ns: 'navigation',
          defaultValue: formatDefaultTitle(currentModule.id),
        }),
      )
    : 'UNKNOWN';

  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => {
              if (window.innerWidth <= 768) {
                setIsMobileMenuOpen((prev) => !prev);
              } else {
                toggleSidebar();
              }
            }}
            aria-label="Toggle Navigation Sidebar"
            aria-expanded={!isSidebarCollapsed}
            aria-controls="main-sidebar"
          >
            ☰
          </button>
          <div className={styles.title}>
            <img src="/Logo.svg" alt="Useless Polymath" className={styles.logo} />
          </div>
        </div>

        <div className={styles.quickControls}>
          <div className={styles.styleControl}>
            <label htmlFor="theme-style-select" className={styles.styleLabel}>
              STYLE:
            </label>
            <select
              id="theme-style-select"
              aria-label="Theme Style"
              value={activeStyle}
              onChange={(e) => setActiveStyle(e.target.value)}
              className={styles.styleSelect}
            >
              {STYLES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.langButtonGroup} role="group" aria-label="Language options">
            <FUIButton
              onClick={() => changeLanguage('en')}
              variant={i18n.language === 'en' ? 'solid' : 'outline'}
              aria-label="Switch to English"
              className={styles.langButton}
            >
              EN
            </FUIButton>
            <FUIButton
              onClick={() => changeLanguage('es')}
              variant={i18n.language === 'es' ? 'solid' : 'outline'}
              aria-label="Cambiar a Español"
              className={styles.langButton}
            >
              ES
            </FUIButton>
            <FUIButton
              onClick={() => changeLanguage('it')}
              variant={i18n.language === 'it' ? 'solid' : 'outline'}
              aria-label="Passa all'Italiano"
              className={styles.langButton}
            >
              IT
            </FUIButton>
          </div>
        </div>

        <FUIButton
          id="settings-open-btn"
          aria-haspopup="dialog"
          aria-expanded={showSettings}
          onClick={() => setShowSettings(true)}
        >
          {t('settings')}
        </FUIButton>
        <div className={styles.cornerDeco} />
      </header>

      <div className={styles.mainLayout}>
        <aside
          id="main-sidebar"
          aria-label="Module Navigation"
          className={clsx(
            styles.sidebar,
            isSidebarCollapsed && styles.collapsed,
            isMobileMenuOpen && styles.mobileOpen,
          )}
        >
          <div className={styles.scrollArea}>
            {categories
              .filter((catKey) => {
                if (hiddenCategories.includes(catKey)) return false;
                const catModules = MODULES.filter((m) => m.categoryKey === catKey);
                const visibleCatModules = catModules.filter((m) => !hiddenModules.includes(m.id));
                return visibleCatModules.length > 0;
              })
              .map((catKey) => (
                <div key={catKey}>
                  <h2 className={styles.sectionTitle}>
                    {t(catKey, { ns: 'common', defaultValue: catKey })}
                  </h2>
                  <ul className={styles.menuList} role="menu">
                    {MODULES.filter(
                      (m) => m.categoryKey === catKey && !hiddenModules.includes(m.id),
                    ).map((m) => (
                      <li
                        key={m.id}
                        role="menuitem"
                        tabIndex={0}
                        aria-current={activeModule === m.id ? 'page' : undefined}
                        className={clsx(styles.menuItem, activeModule === m.id && styles.active)}
                        onClick={() => {
                          onModuleChange(m.id);
                          setIsMobileMenuOpen(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onModuleChange(m.id);
                            setIsMobileMenuOpen(false);
                          }
                        }}
                      >
                        {toTitleCase(
                          t(m.id, { ns: 'navigation', defaultValue: formatDefaultTitle(m.id) }),
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>

          <div className={`${styles.crosshair} ${styles['ch-tl']}`} />
          <div className={`${styles.crosshair} ${styles['ch-br']}`} />
        </aside>

        {isMobileMenuOpen && (
          <div className={styles.mobileBackdrop} onClick={() => setIsMobileMenuOpen(false)} />
        )}

        <main className={styles.contentArea}>
          <div className={styles.statusBar} role="status">
            {t('home')} &gt; {categoryName} &gt; {moduleName}
          </div>

          <div className={styles.tabs} role="tablist" aria-label="Module Views">
            <div className={styles.tabGroup}>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'tool'}
                aria-controls="tab-content-panel"
                className={clsx(styles.tabBtn, mode === 'tool' && styles.active)}
                onClick={() => onModeChange('tool')}
              >
                {t('visualizer')}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'practice'}
                aria-controls="tab-content-panel"
                className={clsx(styles.tabBtn, mode === 'practice' && styles.active)}
                onClick={() => onModeChange('practice')}
              >
                {t('practice')}
              </button>
            </div>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'guide'}
              aria-controls="tab-content-panel"
              className={clsx(styles.tabBtn, mode === 'guide' && styles.active, styles.helpTab)}
              onClick={() => onModeChange('guide')}
            >
              {t('guide')}
            </button>
          </div>

          <div id="tab-content-panel" role="tabpanel" className={styles.workspace}>
            {children}
          </div>
        </main>
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        modules={MODULES}
        stylesList={STYLES}
        activeStyle={activeStyle}
        onStyleChange={setActiveStyle}
        hiddenCategories={hiddenCategories}
        onToggleCategory={toggleCategoryVisibility}
        hiddenModules={hiddenModules}
        onToggleModule={toggleModuleVisibility}
        onResetIndividual={handleIndividualReset}
        onResetAll={handleMasterReset}
        scoresVersion={scoresVersion}
      />
    </div>
  );
};
