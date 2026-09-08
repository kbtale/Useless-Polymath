// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
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
    cleanup();
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

    render(
      <AppShell
        activeModule="doomsday"
        onModuleChange={onModuleChange}
        mode="tool"
        onModeChange={vi.fn()}
      >
        <div>Content Workspace</div>
      </AppShell>,
    );

    const sidebar = screen.getByTestId('main-sidebar');
    expect(sidebar).toBeDefined();

    const doomsdayBtn = within(sidebar).getByRole('button', { name: 'Doomsday' });
    expect(doomsdayBtn).toBeDefined();
    fireEvent.click(doomsdayBtn);
    expect(onModuleChange).toHaveBeenCalledWith('doomsday');

    const user = userEvent.setup();
    const timeZonesBtn = within(sidebar).getByRole('button', { name: 'Time Zones' });
    timeZonesBtn.focus();
    await user.keyboard('{Enter}');
    expect(onModuleChange).toHaveBeenCalledWith('time_zones');
  });

  it('allows collapsing and expanding category sections in the sidebar', () => {
    render(
      <AppShell activeModule="doomsday" onModuleChange={vi.fn()} mode="tool" onModeChange={vi.fn()}>
        <div>Content Workspace</div>
      </AppShell>,
    );

    const sidebar = screen.getByTestId('main-sidebar');
    const chronometryHeader = within(sidebar).getByRole('button', {
      name: /modules\.chronometry/i,
    });
    expect(chronometryHeader.getAttribute('aria-expanded')).toBe('true');

    // Collapse section
    fireEvent.click(chronometryHeader);
    expect(chronometryHeader.getAttribute('aria-expanded')).toBe('false');
    expect(within(sidebar).queryByRole('button', { name: 'Doomsday' })).toBeNull();

    // Expand section again
    fireEvent.click(chronometryHeader);
    expect(chronometryHeader.getAttribute('aria-expanded')).toBe('true');
    expect(within(sidebar).getByRole('button', { name: 'Doomsday' })).toBeDefined();
  });

  it('handles language selection via header dropdown', () => {
    render(
      <AppShell activeModule="doomsday" onModuleChange={vi.fn()} mode="tool" onModeChange={vi.fn()}>
        <div>Content Workspace</div>
      </AppShell>,
    );

    const langSelect = screen.getByRole('combobox', { name: /language/i });
    expect(langSelect).toBeDefined();
    fireEvent.change(langSelect, { target: { value: 'es' } });
    expect(langSelect).toBeDefined();
  });
});
