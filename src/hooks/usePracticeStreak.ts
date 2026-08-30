import { useCallback, useEffect, useState } from 'react';

export function usePracticeStreak(moduleId: string) {
  const streakKey = `polymath_streak_${moduleId}`;
  const highScoreKey = `polymath_high_${moduleId}`;

  const [streak, setStreakState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(streakKey);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [highScore, setHighScoreState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(highScoreKey);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(streakKey, streak.toString());
    } catch (e) {
      console.error('Failed to save streak to localStorage:', e);
    }
  }, [streakKey, streak]);

  useEffect(() => {
    if (streak > highScore) {
      setHighScoreState(streak);
      try {
        localStorage.setItem(highScoreKey, streak.toString());
      } catch (e) {
        console.error('Failed to save high score to localStorage:', e);
      }
    }
  }, [highScoreKey, streak, highScore]);

  const setStreak = useCallback((newStreak: number | ((prev: number) => number)) => {
    setStreakState(newStreak);
  }, []);

  const resetStreak = useCallback(() => {
    setStreakState(0);
  }, []);

  return {
    streak,
    highScore,
    setStreak,
    resetStreak,
  };
}
