import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIButton } from '../core/FUIButton';
import styles from './AppShell.module.scss';

export interface ModuleItem {
  id: string;
  categoryKey: string;
}

export interface StyleOption {
  id: string;
  label: string;
}

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  modules: ModuleItem[];
  stylesList: StyleOption[];
  activeStyle: string;
  onStyleChange: (style: string) => void;
  hiddenCategories: string[];
  onToggleCategory: (categoryKey: string) => void;
  hiddenModules: string[];
  onToggleModule: (moduleId: string) => void;
  onResetIndividual: (moduleId: string) => void;
  onResetAll: () => void;
  scoresVersion: number;
}

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

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  modules,
  stylesList,
  activeStyle,
  onStyleChange,
  hiddenCategories,
  onToggleCategory,
  hiddenModules,
  onToggleModule,
  onResetIndividual,
  onResetAll,
  scoresVersion,
}) => {
  const { t, i18n } = useTranslation(['common', 'navigation']);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    triggerElementRef.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const initialFocusTimeout = setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        focusable?.focus();
      }
    }, 0);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(initialFocusTimeout);
      triggerElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-dialog-title"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className={styles.settingsModal}
      >
        <div className={styles.modalHeader}>
          <h2 id="settings-dialog-title" className={styles.modalTitle}>
            {t('settings', 'Settings')}
          </h2>
          <button
            aria-label={t('close', { ns: 'common', defaultValue: 'Close settings' })}
            className={styles.closeBtn}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.settingsSection}>
            <h3 className={styles.sectionHeader}>{t('general', 'General')}</h3>

            <div className={styles.settingsRow}>
              <label htmlFor="settings-theme-select" className={styles.rowLabel}>
                {t('theme', 'Style Theme')}
              </label>
              <select
                id="settings-theme-select"
                aria-label={t('theme', 'Style Theme')}
                value={activeStyle}
                onChange={(e) => onStyleChange(e.target.value)}
                className={styles.selectInput}
              >
                {stylesList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.settingsRow}>
              <span className={styles.rowLabel}>{t('language', 'Language')}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['en', 'es', 'it'].map((lng) => (
                  <FUIButton
                    key={lng}
                    aria-label={`Switch language to ${lng.toUpperCase()}`}
                    onClick={() => changeLanguage(lng)}
                    variant={i18n.language === lng ? 'solid' : 'outline'}
                    style={{
                      padding: '0.25rem 0.75rem',
                      minHeight: '32px',
                      fontSize: '0.7rem',
                    }}
                  >
                    {lng.toUpperCase()}
                  </FUIButton>
                ))}
              </div>
            </div>

            <div
              className={styles.settingsRow}
              style={{
                marginTop: '1.25rem',
                borderTop: '1px solid var(--line-color)',
                paddingTop: '1.25rem',
              }}
            >
              <span className={styles.rowLabel}>
                {t('master_stats_control', 'Master Stats Reset')}
              </span>
              <FUIButton
                onClick={onResetAll}
                variant="outline"
                style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)' }}
              >
                {t('reset_all_scores', 'Reset All Practice Scores')}
              </FUIButton>
            </div>
          </div>

          <div className={clsx(styles.settingsSection, styles.scoreboardSection)}>
            <h3 className={styles.sectionHeader}>
              {t('practice_scoreboards', 'Practice Scoreboards & Visibility')}
            </h3>
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
                  {modules.map((m) => {
                    const streak = parseInt(
                      localStorage.getItem(`polymath_streak_${m.id}`) || '0',
                      10,
                    );
                    const high = parseInt(localStorage.getItem(`polymath_high_${m.id}`) || '0', 10);
                    const isCatVisible = !hiddenCategories.includes(m.categoryKey);
                    const isModVisible = !hiddenModules.includes(m.id);
                    const categoryName = toTitleCase(t(m.categoryKey, { ns: 'common' }));
                    const moduleName = toTitleCase(
                      t(m.id, {
                        ns: 'navigation',
                        defaultValue: formatDefaultTitle(m.id),
                      }),
                    );
                    return (
                      <tr key={m.id}>
                        <td>
                          <label
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              cursor: 'pointer',
                            }}
                          >
                            <input
                              type="checkbox"
                              aria-label={`Toggle category ${categoryName}`}
                              checked={isCatVisible}
                              onChange={() => onToggleCategory(m.categoryKey)}
                              className={styles.visibilityCheckbox}
                            />
                            <span style={{ opacity: isCatVisible ? 1 : 0.5 }}>{categoryName}</span>
                          </label>
                        </td>
                        <td style={{ opacity: isModVisible && isCatVisible ? 1 : 0.5 }}>
                          {moduleName}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            aria-label={`Toggle module ${moduleName}`}
                            checked={isModVisible}
                            onChange={() => onToggleModule(m.id)}
                            disabled={!isCatVisible}
                            className={styles.visibilityCheckbox}
                          />
                        </td>
                        <td>{streak}</td>
                        <td>{high}</td>
                        <td>
                          <button
                            className={styles.rowResetBtn}
                            aria-label={`Reset score for ${moduleName}`}
                            onClick={() => onResetIndividual(m.id)}
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
  );
};
