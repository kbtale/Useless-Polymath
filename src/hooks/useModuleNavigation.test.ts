// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useModuleNavigation } from './useModuleNavigation';

describe('useModuleNavigation', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('initializes with default module and tool mode when hash is empty', () => {
    const { result } = renderHook(() => useModuleNavigation('doomsday'));

    expect(result.current.activeModuleId).toBe('doomsday');
    expect(result.current.mode).toBe('tool');
  });

  it('parses initial hash and mode query param', () => {
    window.location.hash = '#/binary?mode=practice';

    const { result } = renderHook(() => useModuleNavigation('doomsday'));

    expect(result.current.activeModuleId).toBe('binary');
    expect(result.current.mode).toBe('practice');
  });

  it('updates state and location hash on setActiveModuleId', () => {
    const { result } = renderHook(() => useModuleNavigation('doomsday'));

    act(() => {
      result.current.setActiveModuleId('hexadecimal');
    });

    expect(result.current.activeModuleId).toBe('hexadecimal');
    expect(window.location.hash).toBe('#/hexadecimal');
  });

  it('updates state and location hash on setMode', () => {
    const { result } = renderHook(() => useModuleNavigation('binary'));

    act(() => {
      result.current.setMode('practice');
    });

    expect(result.current.mode).toBe('practice');
    expect(window.location.hash).toBe('#/binary?mode=practice');
  });

  it('updates state and location hash on navigate', () => {
    const { result } = renderHook(() => useModuleNavigation('doomsday'));

    act(() => {
      result.current.navigate('periodic_table', 'guide');
    });

    expect(result.current.activeModuleId).toBe('periodic_table');
    expect(result.current.mode).toBe('guide');
    expect(window.location.hash).toBe('#/periodic_table?mode=guide');
  });

  it('synchronizes state when hashchange event fires', () => {
    const { result } = renderHook(() => useModuleNavigation('doomsday'));

    act(() => {
      window.location.hash = '#/subnetting?mode=practice';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(result.current.activeModuleId).toBe('subnetting');
    expect(result.current.mode).toBe('practice');
  });
});
