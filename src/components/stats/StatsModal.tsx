import clsx from 'clsx';
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FUIButton } from '@/components/core/FUIButton';
import {
  calculateAchievementProgressList,
  calculateCategoryMasteries,
  calculateGlobalAggregates,
  generateLast30DaysActivity,
} from '@/modules/stats/logic';
import { ALL_MODULE_IDS, MODULE_CATEGORIES, storageService } from '@/services/storage';
import { formatDefaultTitle, toTitleCase } from '@/utils/text';
import styles from './StatsModal.module.scss';

export interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'overview' | 'telemetry' | 'achievements' | 'backup';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation(['stats', 'navigation', 'common']);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [dataVersion, setDataVersion] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const telemetry = useMemo(() => {
    void dataVersion;
    return storageService.getAllModuleTelemetry();
  }, [dataVersion]);

  const dailyActivity = useMemo(() => {
    void dataVersion;
    return storageService.getDailyActivity();
  }, [dataVersion]);

  const unlockedAchievements = useMemo(() => {
    void dataVersion;
    return storageService.getUnlockedAchievements();
  }, [dataVersion]);

  const aggregates = useMemo(() => {
    return calculateGlobalAggregates(telemetry, unlockedAchievements, dailyActivity);
  }, [telemetry, unlockedAchievements, dailyActivity]);

  const categoryMasteries = useMemo(() => {
    return calculateCategoryMasteries(telemetry);
  }, [telemetry]);

  const activityCells = useMemo(() => {
    return generateLast30DaysActivity(dailyActivity);
  }, [dailyActivity]);

  const achievementsList = useMemo(() => {
    return calculateAchievementProgressList(telemetry, unlockedAchievements);
  }, [telemetry, unlockedAchievements]);

  if (!isOpen) return null;

  const handleExportJson = () => {
    const jsonString = storageService.exportBackupJson();
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `useless_polymath_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const success = storageService.importBackupJson(content);
        if (success) {
          setDataVersion((v) => v + 1);
          alert(t('import_success', { defaultValue: 'Stats backup successfully imported.' }));
        } else {
          alert(t('import_error', { defaultValue: 'Invalid backup JSON file format.' }));
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetAnalytics = () => {
    const confirmed = window.confirm(
      t('confirm_reset_analytics', {
        defaultValue:
          'Are you sure you want to permanently reset all practice stats, streaks, and achievements? This cannot be undone.',
      }),
    );
    if (confirmed) {
      storageService.resetAllAnalytics();
      setDataVersion((v) => v + 1);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="stats-dialog-title"
        className={styles.statsModal}
      >
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <h2 id="stats-dialog-title" className={styles.modalTitle}>
              {t('title', { defaultValue: 'Performance & Statistics' })}
            </h2>
          </div>
          <button
            type="button"
            aria-label={t('close', { ns: 'common', defaultValue: 'Close stats' })}
            className={styles.closeBtn}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <nav className={styles.modalNav} aria-label="Stats Sections">
          <button
            type="button"
            className={clsx(styles.navTab, activeTab === 'overview' && styles.activeTab)}
            onClick={() => setActiveTab('overview')}
          >
            {t('tab_overview', { defaultValue: 'Overview' })}
          </button>
          <button
            type="button"
            className={clsx(styles.navTab, activeTab === 'telemetry' && styles.activeTab)}
            onClick={() => setActiveTab('telemetry')}
          >
            {t('tab_telemetry', { defaultValue: 'Telemetry' })}
          </button>
          <button
            type="button"
            className={clsx(styles.navTab, activeTab === 'achievements' && styles.activeTab)}
            onClick={() => setActiveTab('achievements')}
          >
            {t('tab_achievements', { defaultValue: 'Achievements' })}
          </button>
          <button
            type="button"
            className={clsx(styles.navTab, activeTab === 'backup' && styles.activeTab)}
            onClick={() => setActiveTab('backup')}
          >
            {t('tab_backup', { defaultValue: 'Backup' })}
          </button>
        </nav>

        <div className={styles.modalBody}>
          {activeTab === 'overview' && (
            <>
              <div className={styles.kpiGrid}>
                <div className={styles.kpiCard}>
                  <span className={styles.kpiLabel}>
                    {t('stat_total_solved', { defaultValue: 'Total Solved' })}
                  </span>
                  <span className={styles.kpiValue}>
                    {aggregates.totalCorrect.toLocaleString()}
                  </span>
                </div>
                <div className={styles.kpiCard}>
                  <span className={styles.kpiLabel}>
                    {t('stat_accuracy', { defaultValue: 'Accuracy' })}
                  </span>
                  <span className={styles.kpiValue}>{aggregates.overallAccuracy}%</span>
                </div>
                <div className={styles.kpiCard}>
                  <span className={styles.kpiLabel}>
                    {t('stat_best_streak', { defaultValue: 'Best Streak' })}
                  </span>
                  <span className={styles.kpiValue}>{aggregates.highestStreak}</span>
                </div>
                <div className={styles.kpiCard}>
                  <span className={styles.kpiLabel}>
                    {t('stat_achievements_count', { defaultValue: 'Achievements' })}
                  </span>
                  <span className={styles.kpiValue}>
                    {aggregates.achievementsUnlocked} / {aggregates.totalAchievements}
                  </span>
                </div>
              </div>

              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <span>
                    {t('activity_heatmap_title', { defaultValue: '30-Day Activity Heatmap' })}
                  </span>
                  <div className={styles.heatmapLegend} aria-hidden="true">
                    <span>{t('activity_legend_less', { defaultValue: 'Less' })}</span>
                    <span className={clsx(styles.legendCell, styles.heatmapCell)} data-level="0" />
                    <span className={clsx(styles.legendCell, styles.heatmapCell)} data-level="1" />
                    <span className={clsx(styles.legendCell, styles.heatmapCell)} data-level="2" />
                    <span className={clsx(styles.legendCell, styles.heatmapCell)} data-level="3" />
                    <span className={clsx(styles.legendCell, styles.heatmapCell)} data-level="4" />
                    <span>{t('activity_legend_more', { defaultValue: 'More' })}</span>
                  </div>
                </div>

                <div className={styles.heatmapWrapper}>
                  <div className={styles.heatmapGrid}>
                    {activityCells.map((cell) => (
                      <span
                        key={cell.date}
                        className={styles.heatmapCell}
                        data-level={cell.level}
                        title={t('activity_tooltip', {
                          count: cell.count,
                          date: cell.dayLabel,
                          defaultValue: `${cell.count} solved on ${cell.dayLabel}`,
                        })}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.sectionBlock}>
                <h3 className={styles.sectionHeader}>
                  {t('category_mastery_title', { defaultValue: 'Domain Competencies' })}
                </h3>
                <div className={styles.masteryGrid}>
                  {categoryMasteries.map((cat) => (
                    <div key={cat.categoryKey} className={styles.masteryCard}>
                      <div className={styles.masteryCardHeader}>
                        <h4 className={styles.masteryTitle}>
                          {t(`modules.${cat.categoryKey}`, {
                            ns: 'common',
                            defaultValue: cat.categoryKey,
                          })}
                        </h4>
                        <span className={styles.masteryTierBadge}>
                          {t(`level_${cat.masteryLevelKey}`, { defaultValue: cat.masteryLevelKey })}
                        </span>
                      </div>
                      <div className={styles.progressBarTrack}>
                        <div
                          className={styles.progressBarFill}
                          style={{ width: `${cat.masteryPercentage}%` }}
                        />
                      </div>
                      <div className={styles.masteryMeta}>
                        <span>
                          {cat.practicedModulesCount}/{cat.modulesCount}{' '}
                          {t('tab_modules', { defaultValue: 'tools' })}
                        </span>
                        <span>{cat.accuracyRate}% acc</span>
                        <span>streak: {cat.highestStreak}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'telemetry' && (
            <div className={styles.tableContainer}>
              <table className={styles.telemetryTable}>
                <thead>
                  <tr>
                    <th>{t('col_category', { defaultValue: 'Category' })}</th>
                    <th>{t('col_module', { defaultValue: 'Tool' })}</th>
                    <th>{t('col_attempts', { defaultValue: 'Attempts' })}</th>
                    <th>{t('col_correct', { defaultValue: 'Correct' })}</th>
                    <th>{t('col_accuracy', { defaultValue: 'Accuracy' })}</th>
                    <th>{t('col_streak', { defaultValue: 'Streak' })}</th>
                    <th>{t('col_high_score', { defaultValue: 'Best Score' })}</th>
                    <th>{t('col_last_practiced', { defaultValue: 'Last Practiced' })}</th>
                  </tr>
                </thead>
                <tbody>
                  {ALL_MODULE_IDS.map((modId) => {
                    const tel = telemetry[modId] || {
                      attempts: 0,
                      correct: 0,
                      currentStreak: 0,
                      highScore: 0,
                    };
                    const acc =
                      tel.attempts > 0 ? `${Math.round((tel.correct / tel.attempts) * 100)}%` : '-';
                    const cat = MODULE_CATEGORIES[modId] || 'other';
                    const formattedDate = tel.lastPracticed
                      ? new Date(tel.lastPracticed).toLocaleDateString()
                      : t('never_practiced', { defaultValue: 'Never' });

                    return (
                      <tr key={modId}>
                        <td>{t(`modules.${cat}`, { ns: 'common', defaultValue: cat })}</td>
                        <td className={styles.toolTitle}>
                          {toTitleCase(
                            t(modId, {
                              ns: 'navigation',
                              defaultValue: formatDefaultTitle(modId),
                            }),
                          )}
                        </td>
                        <td>{tel.attempts}</td>
                        <td>{tel.correct}</td>
                        <td>{acc}</td>
                        <td>{tel.currentStreak}</td>
                        <td>{tel.highScore}</td>
                        <td>{formattedDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className={styles.achievementsList}>
              {achievementsList.map((item) => (
                <div
                  key={item.definition.id}
                  className={clsx(styles.achievementCard, !item.isUnlocked && styles.locked)}
                >
                  <div className={styles.achievementDetails}>
                    <div className={styles.achievementHeader}>
                      <h4 className={styles.achievementTitle}>
                        {t(item.definition.titleKey, { defaultValue: item.definition.id })}
                      </h4>
                      <span className={styles.achievementStatus}>
                        {item.isUnlocked
                          ? t('unlocked', { defaultValue: 'Unlocked' })
                          : `${item.currentValue}/${item.targetValue}`}
                      </span>
                    </div>
                    <p className={styles.achievementDesc}>
                      {t(item.definition.descriptionKey, { defaultValue: '' })}
                    </p>
                    {!item.isUnlocked && (
                      <div className={styles.progressBarTrack} style={{ marginTop: '0.25rem' }}>
                        <div
                          className={styles.progressBarFill}
                          style={{ width: `${item.progressPercentage}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'backup' && (
            <div className={styles.backupSection}>
              <div className={styles.sectionBlock}>
                <h3 className={styles.sectionHeader}>
                  {t('data_portability_title', { defaultValue: 'Backup & Restore' })}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', margin: 0 }}>
                  {t('data_portability_desc', {
                    defaultValue:
                      'Export your local practice statistics and streaks to a JSON file, or restore from a previous backup.',
                  })}
                </p>
                <div className={styles.backupControls} style={{ marginTop: '0.5rem' }}>
                  <FUIButton onClick={handleExportJson}>
                    {t('btn_export_json', { defaultValue: 'Export Backup (JSON)' })}
                  </FUIButton>
                  <FUIButton onClick={handleImportClick} variant="outline">
                    {t('btn_import_json', { defaultValue: 'Import Backup (JSON)' })}
                  </FUIButton>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".json,application/json"
                    className={styles.hiddenFileInput}
                    aria-label="Upload JSON Backup"
                  />
                </div>
              </div>

              <div className={styles.sectionBlock}>
                <h3 className={styles.sectionHeader}>
                  {t('danger_zone_title', { defaultValue: 'Danger Zone' })}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', margin: 0 }}>
                  {t('danger_zone_desc', {
                    defaultValue:
                      'Permanently reset all practice telemetry, streaks, heatmap activity, and achievements.',
                  })}
                </p>
                <div style={{ marginTop: '0.5rem' }}>
                  <FUIButton
                    onClick={handleResetAnalytics}
                    variant="outline"
                    className={styles.dangerBtn}
                  >
                    {t('btn_reset_analytics', { defaultValue: 'Reset All Analytics' })}
                  </FUIButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
