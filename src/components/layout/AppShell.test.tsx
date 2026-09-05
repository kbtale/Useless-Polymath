// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppShell } from './AppShell';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { defaultValue?: string }) => options?.defaultValue || key,
    i18n: {
      language: 'en',
      changeLanguage: vi.fn(),
    },
  }),
}));

describe('AppShell Accessibility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders navigation controls with ARIA semantics and handles tab switching', () => {
    const onModeChange = vi.fn();
    const onModuleChange = vi.fn();

    render(
      <AppShell
        activeModule="doomsday"
        onModuleChange={onModuleChange}
        mode="tool"
        onModeChange={onModeChange}
      >
        <div>Content Workspace</div>
      </AppShell>,
    );

    const toggleBtn = screen.getByLabelText('Toggle Navigation Sidebar');
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');
    expect(toggleBtn.getAttribute('aria-controls')).toBe('main-sidebar');

    const tablist = screen.getByRole('tablist', { name: 'Module Views' });
    expect(tablist).toBeDefined();

    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(3);
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');

    fireEvent.click(tabs[1]);
    expect(onModeChange).toHaveBeenCalledWith('practice');

    const settingsBtn = screen.getByRole('button', { name: 'settings' });
    expect(settingsBtn.getAttribute('aria-haspopup')).toBe('dialog');
  });

  it('allows keyboard navigation and selection on sidebar menu items', async () => {
    const onModuleChange = vi.fn();

    const { container } = render(
      <AppShell
        activeModule="doomsday"
        onModuleChange={onModuleChange}
        mode="tool"
        onModeChange={vi.fn()}
      >
        <div>Content Workspace</div>
      </AppShell>,
    );

    const items = container.querySelectorAll('ul button');
    expect(items.length).toBeGreaterThan(1);

    fireEvent.click(items[0]);
    expect(onModuleChange).toHaveBeenCalledWith('doomsday');

    const user = userEvent.setup();
    (items[1] as HTMLElement).focus();
    await user.keyboard('{Enter}');
    expect(onModuleChange).toHaveBeenCalledWith('time_zones');
  });
});
