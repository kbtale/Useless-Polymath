import { useCallback, useEffect, useState } from 'react';
import { storageService } from '../services/storage';

export function usePracticeStreak(moduleId: string) {
  const [streak, setStreakState] = useState<number>(() => {
    return storageService.getStreak(moduleId);
  });

  const [highScore, setHighScoreState] = useState<number>(() => {
    return storageService.getHighScore(moduleId);
  });

  useEffect(() => {
    storageService.setStreak(moduleId, streak);
  }, [moduleId, streak]);

  useEffect(() => {
    if (streak > highScore) {
      setHighScoreState(streak);
      storageService.setHighScore(moduleId, streak);
    }
  }, [moduleId, streak, highScore]);

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
