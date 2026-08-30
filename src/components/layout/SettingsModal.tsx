import type React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
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

  if (!isOpen) return null;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div onClick={(e: React.MouseEvent) => e.stopPropagation()} className={styles.settingsModal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{t('settings', 'Settings')}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.settingsSection}>
            <h3 className={styles.sectionHeader}>{t('general', 'General')}</h3>

            <div className={styles.settingsRow}>
              <span className={styles.rowLabel}>{t('theme', 'Style Theme')}</span>
              <select
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
                style={{ color: '#ef4444', borderColor: '#fca5a5' }}
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
                              checked={isCatVisible}
                              onChange={() => onToggleCategory(m.categoryKey)}
                              className={styles.visibilityCheckbox}
                            />
                            <span style={{ opacity: isCatVisible ? 1 : 0.5 }}>
                              {toTitleCase(t(m.categoryKey, { ns: 'common' }))}
                            </span>
                          </label>
                        </td>
                        <td style={{ opacity: isModVisible && isCatVisible ? 1 : 0.5 }}>
                          {toTitleCase(
                            t(m.id, {
                              ns: 'navigation',
                              defaultValue: formatDefaultTitle(m.id),
                            }),
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="checkbox"
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
