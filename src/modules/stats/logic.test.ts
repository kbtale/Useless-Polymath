import { describe, expect, it } from 'vitest';
import {
  calculateAchievementProgressList,
  calculateCategoryMasteries,
  calculateGlobalAggregates,
  calculateMasteryLevel,
  generateLast30DaysActivity,
} from './logic';

describe('Stats Domain Logic', () => {
  it('determines mastery level based on score boundaries', () => {
    expect(calculateMasteryLevel(10)).toBe('novice');
    expect(calculateMasteryLevel(30)).toBe('apprentice');
    expect(calculateMasteryLevel(60)).toBe('proficient');
    expect(calculateMasteryLevel(90)).toBe('master');
  });

  it('calculates category masteries correctly from telemetry', () => {
    const telemetry = {
      binary: { attempts: 10, correct: 10, currentStreak: 10, highScore: 10 },
      hexadecimal: { attempts: 5, correct: 4, currentStreak: 4, highScore: 4 },
    };

    const masteries = calculateCategoryMasteries(telemetry);
    const logicMastery = masteries.find((m) => m.categoryKey === 'logic');
    expect(logicMastery).toBeDefined();
    expect(logicMastery?.totalAttempts).toBe(15);
    expect(logicMastery?.totalCorrect).toBe(14);
    expect(logicMastery?.accuracyRate).toBe(93);
    expect(logicMastery?.highestStreak).toBe(10);
    expect(logicMastery?.masteryPercentage).toBeGreaterThan(0);
  });

  it('computes global aggregates across all modules', () => {
    const telemetry = {
      subnetting: { attempts: 20, correct: 15, currentStreak: 5, highScore: 8 },
      doomsday: { attempts: 10, correct: 10, currentStreak: 10, highScore: 10 },
    };
    const dailyActivity = {
      [new Date().toISOString().slice(0, 10)]: 30,
    };

    const aggregates = calculateGlobalAggregates(telemetry, ['first_step'], dailyActivity);
    expect(aggregates.totalAttempts).toBe(30);
    expect(aggregates.totalCorrect).toBe(25);
    expect(aggregates.overallAccuracy).toBe(83);
    expect(aggregates.highestStreak).toBe(10);
    expect(aggregates.modulesPracticed).toBe(2);
    expect(aggregates.achievementsUnlocked).toBe(1);
    expect(aggregates.activeStreakToday).toBe(30);
  });

  it('generates 30 days of activity cells with correct levels', () => {
    const today = new Date().toISOString().slice(0, 10);
    const cells = generateLast30DaysActivity({ [today]: 25 });
    expect(cells).toHaveLength(30);

    const todayCell = cells[cells.length - 1];
    expect(todayCell.date).toBe(today);
    expect(todayCell.count).toBe(25);
    expect(todayCell.level).toBe(4);

    const emptyCell = cells[0];
    expect(emptyCell.count).toBe(0);
    expect(emptyCell.level).toBe(0);
  });

  it('computes achievement progress list accurately', () => {
    const telemetry = {
      binary: { attempts: 50, correct: 45, currentStreak: 6, highScore: 6 },
    };
    const progressList = calculateAchievementProgressList(telemetry, ['first_step']);
    expect(progressList.length).toBeGreaterThan(0);

    const firstStep = progressList.find((p) => p.definition.id === 'first_step');
    expect(firstStep?.isUnlocked).toBe(true);
    expect(firstStep?.progressPercentage).toBe(100);

    const centurion = progressList.find((p) => p.definition.id === 'centurion');
    expect(centurion?.isUnlocked).toBe(false);
    expect(centurion?.currentValue).toBe(50);
    expect(centurion?.progressPercentage).toBe(50);
  });
});
