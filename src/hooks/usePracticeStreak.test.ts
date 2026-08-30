// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { usePracticeStreak } from './usePracticeStreak';

describe('usePracticeStreak', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with 0 when localStorage is empty', () => {
    const { result } = renderHook(() => usePracticeStreak('test_module'));
    expect(result.current.streak).toBe(0);
    expect(result.current.highScore).toBe(0);
  });

  it('loads saved streak and highScore from localStorage', () => {
    localStorage.setItem('polymath_streak_test_module', '5');
    localStorage.setItem('polymath_high_test_module', '12');

    const { result } = renderHook(() => usePracticeStreak('test_module'));
    expect(result.current.streak).toBe(5);
    expect(result.current.highScore).toBe(12);
  });

  it('increments streak and updates highScore when streak exceeds previous high score', () => {
    const { result } = renderHook(() => usePracticeStreak('test_module'));

    act(() => {
      result.current.setStreak(1);
    });
    expect(result.current.streak).toBe(1);
    expect(result.current.highScore).toBe(1);
    expect(localStorage.getItem('polymath_streak_test_module')).toBe('1');
    expect(localStorage.getItem('polymath_high_test_module')).toBe('1');

    act(() => {
      result.current.setStreak((prev) => prev + 1);
    });
    expect(result.current.streak).toBe(2);
    expect(result.current.highScore).toBe(2);
  });

  it('resets streak to 0 without clearing highScore', () => {
    localStorage.setItem('polymath_high_test_module', '10');
    const { result } = renderHook(() => usePracticeStreak('test_module'));

    act(() => {
      result.current.setStreak(3);
    });
    expect(result.current.streak).toBe(3);
    expect(result.current.highScore).toBe(10);

    act(() => {
      result.current.resetStreak();
    });
    expect(result.current.streak).toBe(0);
    expect(result.current.highScore).toBe(10);
    expect(localStorage.getItem('polymath_streak_test_module')).toBe('0');
    expect(localStorage.getItem('polymath_high_test_module')).toBe('10');
  });
});
