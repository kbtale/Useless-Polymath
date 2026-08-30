// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SettingsModal } from './SettingsModal';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultVal?: string | object) =>
      typeof defaultVal === 'string' ? defaultVal : key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
}));

describe('SettingsModal', () => {
  const dummyModules = [
    { id: 'doomsday', categoryKey: 'modules.chronometry' },
    { id: 'binary', categoryKey: 'modules.logic' },
  ];

  const dummyStyles = [
    { id: 'mono', label: 'MONO' },
    { id: 'wellfound', label: 'WELLFOUND' },
  ];

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <SettingsModal
        isOpen={false}
        onClose={vi.fn()}
        modules={dummyModules}
        stylesList={dummyStyles}
        activeStyle="mono"
        onStyleChange={vi.fn()}
        hiddenCategories={[]}
        onToggleCategory={vi.fn()}
        hiddenModules={[]}
        onToggleModule={vi.fn()}
        onResetIndividual={vi.fn()}
        onResetAll={vi.fn()}
        scoresVersion={0}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders dialog with accessibility attributes and handles user interactions', () => {
    const onClose = vi.fn();
    const onResetAll = vi.fn();

    render(
      <SettingsModal
        isOpen={true}
        onClose={onClose}
        modules={dummyModules}
        stylesList={dummyStyles}
        activeStyle="mono"
        onStyleChange={vi.fn()}
        hiddenCategories={[]}
        onToggleCategory={vi.fn()}
        hiddenModules={[]}
        onToggleModule={vi.fn()}
        onResetIndividual={vi.fn()}
        onResetAll={onResetAll}
        scoresVersion={0}
      />,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeDefined();
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.getAttribute('aria-labelledby')).toBe('settings-dialog-title');

    expect(screen.getByText('Settings')).toBeDefined();
    expect(screen.getByText('Reset All Practice Scores')).toBeDefined();

    fireEvent.click(screen.getByText('×'));
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Reset All Practice Scores'));
    expect(onResetAll).toHaveBeenCalledTimes(1);
  });

  it('dismisses modal when Escape key is pressed', () => {
    const onClose = vi.fn();

    render(
      <SettingsModal
        isOpen={true}
        onClose={onClose}
        modules={dummyModules}
        stylesList={dummyStyles}
        activeStyle="mono"
        onStyleChange={vi.fn()}
        hiddenCategories={[]}
        onToggleCategory={vi.fn()}
        hiddenModules={[]}
        onToggleModule={vi.fn()}
        onResetIndividual={vi.fn()}
        onResetAll={vi.fn()}
        scoresVersion={0}
      />,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
