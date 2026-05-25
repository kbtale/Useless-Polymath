import { useState } from 'react';

export function usePracticeStreak(moduleId: string) {
  const streakKey = `polymath_streak_${moduleId}`;
  const highScoreKey = `polymath_high_${moduleId}`;

  const [streak, setStreakInternal] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(streakKey);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [highScore, setHighScoreInternal] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(highScoreKey);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const setStreak = (newStreak: number | ((prev: number) => number)) => {
    setStreakInternal(prev => {
      const val = typeof newStreak === 'function' ? newStreak(prev) : newStreak;
      try {
        localStorage.setItem(streakKey, val.toString());
      } catch (e) {
        console.error('Failed to save streak to localStorage:', e);
      }
      
      if (val > highScore) {
        setHighScoreInternal(val);
        try {
          localStorage.setItem(highScoreKey, val.toString());
        } catch (e) {
          console.error('Failed to save high score to localStorage:', e);
        }
      }
      return val;
    });
  };

  const resetStreak = () => {
    setStreak(0);
  };

  return {
    streak,
    highScore,
    setStreak,
    resetStreak
  };
}
