import {
  ACHIEVEMENTS,
  type AchievementDefinition,
  ALL_MODULE_IDS,
  MODULE_CATEGORIES,
  type ModuleTelemetry,
} from '@/services/storage';

export interface CategoryMasterySummary {
  categoryKey: string;
  totalAttempts: number;
  totalCorrect: number;
  accuracyRate: number;
  highestStreak: number;
  masteryPercentage: number;
  masteryLevelKey: 'novice' | 'apprentice' | 'proficient' | 'master';
  modulesCount: number;
  practicedModulesCount: number;
}

export interface GlobalAggregates {
  totalAttempts: number;
  totalCorrect: number;
  overallAccuracy: number;
  highestStreak: number;
  modulesPracticed: number;
  totalModules: number;
  achievementsUnlocked: number;
  totalAchievements: number;
  activeStreakToday: number;
}

export interface DailyActivityCell {
  date: string;
  dayLabel: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface AchievementProgress {
  definition: AchievementDefinition;
  isUnlocked: boolean;
  currentValue: number;
  targetValue: number;
  progressPercentage: number;
}

export const CATEGORY_KEYS = [
  'chronometry',
  'logic',
  'networks',
  'cryptography',
  'science',
] as const;

export const calculateMasteryLevel = (
  masteryPercentage: number,
): 'novice' | 'apprentice' | 'proficient' | 'master' => {
  if (masteryPercentage >= 75) return 'master';
  if (masteryPercentage >= 50) return 'proficient';
  if (masteryPercentage >= 25) return 'apprentice';
  return 'novice';
};

export const calculateCategoryMasteries = (
  allTelemetry: Record<string, ModuleTelemetry>,
): CategoryMasterySummary[] => {
  return CATEGORY_KEYS.map((catKey) => {
    const moduleIds = ALL_MODULE_IDS.filter((id) => MODULE_CATEGORIES[id] === catKey);
    let totalAttempts = 0;
    let totalCorrect = 0;
    let highestStreak = 0;
    let practicedModulesCount = 0;

    for (const modId of moduleIds) {
      const tel = allTelemetry[modId] || {
        attempts: 0,
        correct: 0,
        currentStreak: 0,
        highScore: 0,
      };
      totalAttempts += tel.attempts;
      totalCorrect += tel.correct;
      if (tel.highScore > highestStreak) {
        highestStreak = tel.highScore;
      }
      if (tel.attempts > 0) {
        practicedModulesCount += 1;
      }
    }

    const accuracyRate = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

    // Mastery calculation blends accuracy, practice breadth, and streak
    const coverageFraction = moduleIds.length > 0 ? practicedModulesCount / moduleIds.length : 0;
    const streakBonus = Math.min(30, highestStreak * 3);
    const volumeScore = Math.min(30, totalCorrect);
    const accuracyScore = (accuracyRate / 100) * 40;
    const rawMastery = Math.round(coverageFraction * (accuracyScore + streakBonus + volumeScore));
    const masteryPercentage = Math.max(0, Math.min(100, rawMastery));

    return {
      categoryKey: catKey,
      totalAttempts,
      totalCorrect,
      accuracyRate,
      highestStreak,
      masteryPercentage,
      masteryLevelKey: calculateMasteryLevel(masteryPercentage),
      modulesCount: moduleIds.length,
      practicedModulesCount,
    };
  });
};

export const calculateGlobalAggregates = (
  allTelemetry: Record<string, ModuleTelemetry>,
  unlockedAchievementIds: string[],
  dailyActivity: Record<string, number>,
): GlobalAggregates => {
  let totalAttempts = 0;
  let totalCorrect = 0;
  let highestStreak = 0;
  let modulesPracticed = 0;

  for (const tel of Object.values(allTelemetry)) {
    totalAttempts += tel.attempts;
    totalCorrect += tel.correct;
    if (tel.highScore > highestStreak) {
      highestStreak = tel.highScore;
    }
    if (tel.attempts > 0) {
      modulesPracticed += 1;
    }
  }

  const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  const todayIso = new Date().toISOString().slice(0, 10);
  const activeStreakToday = dailyActivity[todayIso] || 0;

  return {
    totalAttempts,
    totalCorrect,
    overallAccuracy,
    highestStreak,
    modulesPracticed,
    totalModules: ALL_MODULE_IDS.length,
    achievementsUnlocked: unlockedAchievementIds.length,
    totalAchievements: ACHIEVEMENTS.length,
    activeStreakToday,
  };
};

export const generateLast30DaysActivity = (
  activityMap: Record<string, number>,
): DailyActivityCell[] => {
  const result: DailyActivityCell[] = [];
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() - i);
    const dateString = targetDate.toISOString().slice(0, 10);
    const dayLabel = targetDate.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
    const count = activityMap[dateString] || 0;

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count >= 20) level = 4;
    else if (count >= 10) level = 3;
    else if (count >= 5) level = 2;
    else if (count >= 1) level = 1;

    result.push({
      date: dateString,
      dayLabel,
      count,
      level,
    });
  }

  return result;
};

export const calculateAchievementProgressList = (
  allTelemetry: Record<string, ModuleTelemetry>,
  unlockedIds: string[],
): AchievementProgress[] => {
  const unlockedSet = new Set(unlockedIds);

  let totalAttempts = 0;
  let maxStreak = 0;
  const categoriesWithStreaks = new Set<string>();

  for (const [modId, tel] of Object.entries(allTelemetry)) {
    totalAttempts += tel.attempts;
    if (tel.highScore > maxStreak) {
      maxStreak = tel.highScore;
    }
    const cat = MODULE_CATEGORIES[modId];
    if (cat && tel.highScore >= 5) {
      categoriesWithStreaks.add(cat);
    }
  }

  return ACHIEVEMENTS.map((achievement) => {
    const isUnlocked = unlockedSet.has(achievement.id);
    let currentValue = 0;
    let targetValue = 1;

    if (achievement.id === 'first_step') {
      currentValue = Math.min(1, totalAttempts);
      targetValue = 1;
    } else if (achievement.id === 'streak_5') {
      currentValue = Math.min(5, maxStreak);
      targetValue = 5;
    } else if (achievement.id === 'streak_15') {
      currentValue = Math.min(15, maxStreak);
      targetValue = 15;
    } else if (achievement.id === 'centurion') {
      currentValue = Math.min(100, totalAttempts);
      targetValue = 100;
    } else if (achievement.id === 'grand_polymath') {
      currentValue = Math.min(5, categoriesWithStreaks.size);
      targetValue = 5;
    } else if (achievement.category) {
      const categoryModules = Object.keys(MODULE_CATEGORIES).filter(
        (m) => MODULE_CATEGORIES[m] === achievement.category,
      );
      const masteredCount = categoryModules.filter(
        (m) => (allTelemetry[m]?.highScore ?? 0) >= 3,
      ).length;
      currentValue = masteredCount;
      targetValue = categoryModules.length;
    }

    const progressPercentage = isUnlocked
      ? 100
      : Math.min(100, Math.round((currentValue / targetValue) * 100));

    return {
      definition: achievement,
      isUnlocked,
      currentValue,
      targetValue,
      progressPercentage,
    };
  });
};
