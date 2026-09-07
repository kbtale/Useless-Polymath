import clsx from 'clsx';
import type React from 'react';
import { useMemo, useRef, useState } from 'react';
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
import styles from './StatsDashboard.module.scss';

export const StatsDashboard: React.FC = () => {
  const { t } = useTranslation(['stats', 'navigation', 'common']);
  const [dataVersion, setDataVersion] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const telemetry = useMemo(() => {
    // Depend on dataVersion for manual refresh
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
    <div className={styles.statsContainer}>
      <header className={styles.headerSection}>
        <h1 className={styles.title}>{t('title', { defaultValue: 'Performance & Analytics' })}</h1>
        <p className={styles.subtitle}>
          {t('subtitle', {
            defaultValue:
              'Track your speed, accuracy, streaks, and domain mastery across all 24 interactive tools.',
          })}
        </p>
      </header>

      {/* KPI Cards */}
      <section className={styles.kpiGrid} aria-label="Key Performance Indicators">
        <div className={styles.kpiCard}>
          <span className={styles.kpiIcon} aria-hidden="true">
            🎯
          </span>
          <div className={styles.kpiInfo}>
            <span className={styles.kpiLabel}>
              {t('stat_total_solved', { defaultValue: 'Total Solved' })}
            </span>
            <span className={styles.kpiValue}>{aggregates.totalCorrect.toLocaleString()}</span>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <span className={styles.kpiIcon} aria-hidden="true">
            📈
          </span>
          <div className={styles.kpiInfo}>
            <span className={styles.kpiLabel}>
              {t('stat_accuracy', { defaultValue: 'Accuracy' })}
            </span>
            <span className={styles.kpiValue}>{aggregates.overallAccuracy}%</span>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <span className={styles.kpiIcon} aria-hidden="true">
            🔥
          </span>
          <div className={styles.kpiInfo}>
            <span className={styles.kpiLabel}>
              {t('stat_best_streak', { defaultValue: 'Best Streak' })}
            </span>
            <span className={styles.kpiValue}>{aggregates.highestStreak}</span>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <span className={styles.kpiIcon} aria-hidden="true">
            🏆
          </span>
          <div className={styles.kpiInfo}>
            <span className={styles.kpiLabel}>
              {t('stat_achievements_count', { defaultValue: 'Achievements' })}
            </span>
            <span className={styles.kpiValue}>
              {aggregates.achievementsUnlocked} / {aggregates.totalAchievements}
            </span>
          </div>
        </div>
      </section>

      {/* 30-Day Activity Heatmap */}
      <section className={styles.sectionCard} aria-labelledby="activity-heatmap-heading">
        <h2 id="activity-heatmap-heading" className={styles.sectionTitle}>
          <span>
            {t('activity_heatmap_title', { defaultValue: 'Last 30 Days Practice Heatmap' })}
          </span>
          <span className={styles.heatmapLegend} aria-hidden="true">
            <span>{t('activity_legend_less', { defaultValue: 'Less' })}</span>
            <span className={clsx(styles.legendCell, styles.heatmapCell)} data-level="0" />
            <span className={clsx(styles.legendCell, styles.heatmapCell)} data-level="1" />
            <span className={clsx(styles.legendCell, styles.heatmapCell)} data-level="2" />
            <span className={clsx(styles.legendCell, styles.heatmapCell)} data-level="3" />
            <span className={clsx(styles.legendCell, styles.heatmapCell)} data-level="4" />
            <span>{t('activity_legend_more', { defaultValue: 'More' })}</span>
          </span>
        </h2>

        <div className={styles.heatmapGrid}>
          {activityCells.map((cell) => (
            <span
              key={cell.date}
              className={styles.heatmapCell}
              data-level={cell.level}
              title={t('activity_tooltip', {
                count: cell.count,
                date: cell.dayLabel,
                defaultValue: `${cell.count} problems solved on ${cell.dayLabel}`,
              })}
            />
          ))}
        </div>
      </section>

      {/* Category Mastery */}
      <section className={styles.sectionCard} aria-labelledby="mastery-heading">
        <h2 id="mastery-heading" className={styles.sectionTitle}>
          {t('category_mastery_title', { defaultValue: 'Domain Competencies' })}
        </h2>

        <div className={styles.masteryGrid}>
          {categoryMasteries.map((cat) => (
            <div key={cat.categoryKey} className={styles.masteryCard}>
              <div className={styles.masteryHeader}>
                <h3 className={styles.categoryName}>
                  {t(`modules.${cat.categoryKey}`, { ns: 'common', defaultValue: cat.categoryKey })}
                </h3>
                <span className={styles.masteryBadge}>
                  {t(`level_${cat.masteryLevelKey}`, { defaultValue: cat.masteryLevelKey })}
                </span>
              </div>

              <div className={styles.masteryProgressWrap}>
                <div className={styles.progressBarBg}>
                  <div
                    className={styles.progressBarFill}
                    style={{ width: `${cat.masteryPercentage}%` }}
                  />
                </div>
              </div>

              <div className={styles.masteryStatsRow}>
                <span>
                  {cat.practicedModulesCount} / {cat.modulesCount}{' '}
                  {t('tab_modules', { defaultValue: 'Modules' })}
                </span>
                <span>{cat.accuracyRate}% Accuracy</span>
                <span>Streak: {cat.highestStreak}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Milestone Achievements */}
      <section className={styles.sectionCard} aria-labelledby="achievements-heading">
        <h2 id="achievements-heading" className={styles.sectionTitle}>
          {t('achievements_title', { defaultValue: 'Milestone Achievements' })}
        </h2>

        <div className={styles.achievementsGrid}>
          {achievementsList.map((item) => (
            <div
              key={item.definition.id}
              className={clsx(
                styles.achievementCard,
                item.isUnlocked ? styles.unlocked : styles.locked,
              )}
            >
              <div className={styles.achieveIcon} aria-hidden="true">
                {item.definition.icon}
              </div>
              <div className={styles.achieveInfo}>
                <h3 className={styles.achieveTitle}>
                  {t(item.definition.titleKey, { defaultValue: item.definition.id })}
                </h3>
                <p className={styles.achieveDesc}>
                  {t(item.definition.descriptionKey, { defaultValue: '' })}
                </p>
                {!item.isUnlocked && (
                  <div className={styles.masteryProgressWrap}>
                    <div className={styles.progressBarBg}>
                      <div
                        className={styles.progressBarFill}
                        style={{ width: `${item.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Module Telemetry Table */}
      <section className={styles.sectionCard} aria-labelledby="telemetry-table-heading">
        <h2 id="telemetry-table-heading" className={styles.sectionTitle}>
          {t('modules_table_title', { defaultValue: 'Module Telemetry Breakdown' })}
        </h2>

        <div className={styles.tableWrapper}>
          <table className={styles.telemetryTable}>
            <thead>
              <tr>
                <th>{t('col_module', { defaultValue: 'Tool' })}</th>
                <th>{t('col_category', { defaultValue: 'Category' })}</th>
                <th>{t('col_attempts', { defaultValue: 'Attempts' })}</th>
                <th>{t('col_correct', { defaultValue: 'Correct' })}</th>
                <th>{t('col_accuracy', { defaultValue: 'Accuracy' })}</th>
                <th>{t('col_streak', { defaultValue: 'Current Streak' })}</th>
                <th>{t('col_high_score', { defaultValue: 'Best Streak' })}</th>
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
                const acc = tel.attempts > 0 ? Math.round((tel.correct / tel.attempts) * 100) : 0;
                const cat = MODULE_CATEGORIES[modId] || 'other';
                const formattedDate = tel.lastPracticed
                  ? new Date(tel.lastPracticed).toLocaleDateString()
                  : t('never_practiced', { defaultValue: 'Never' });

                return (
                  <tr key={modId}>
                    <td className={styles.toolCell}>
                      {toTitleCase(
                        t(modId, {
                          ns: 'navigation',
                          defaultValue: formatDefaultTitle(modId),
                        }),
                      )}
                    </td>
                    <td>
                      <span className={styles.categoryTag}>
                        {t(`modules.${cat}`, { ns: 'common', defaultValue: cat })}
                      </span>
                    </td>
                    <td>{tel.attempts}</td>
                    <td>{tel.correct}</td>
                    <td>{tel.attempts > 0 ? `${acc}%` : '-'}</td>
                    <td>{tel.currentStreak}</td>
                    <td>{tel.highScore}</td>
                    <td>{formattedDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Data Management */}
      <section className={styles.sectionCard} aria-labelledby="data-management-heading">
        <h2 id="data-management-heading" className={styles.sectionTitle}>
          {t('data_portability_title', { defaultValue: 'Data Management & Portability' })}
        </h2>

        <div className={styles.dataControlsRow}>
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

          <FUIButton
            onClick={handleResetAnalytics}
            variant="outline"
            className={styles.dangerButton}
          >
            {t('btn_reset_analytics', { defaultValue: 'Reset All Analytics' })}
          </FUIButton>
        </div>
      </section>
    </div>
  );
};
