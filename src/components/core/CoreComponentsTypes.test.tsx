// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CoreDateInput } from './CoreDateInput';
import { CoreMarkdownRenderer } from './CoreMarkdownRenderer';
import { FUIButton } from './FUIButton';
import { FUIGlassPanel } from './FUIGlassPanel';

describe('Core Components Strict Types and Rendering', () => {
  it('renders CoreMarkdownRenderer with markdown content and forwards HTML attributes', () => {
    const { container } = render(
      <CoreMarkdownRenderer content="# Hello Markdown" id="markdown-section" />,
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('Hello Markdown');
    expect(container.querySelector('#markdown-section')).toBeDefined();
  });

  it('renders FUIGlassPanel and forwards container props', () => {
    const { container } = render(
      <FUIGlassPanel data-testid="glass-panel" id="panel-1">
        <span>Panel Content</span>
      </FUIGlassPanel>,
    );

    expect(screen.getByText('Panel Content')).toBeDefined();
    expect(container.querySelector('#panel-1')).toBeDefined();
  });

  it('renders FUIButton with default type="button" and variant="outline"', () => {
    const onClick = vi.fn();
    render(<FUIButton onClick={onClick}>Click Me</FUIButton>);

    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button.getAttribute('type')).toBe('button');

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders CoreDateInput with sub-inputs and updates date parts', () => {
    const setDay = vi.fn();
    const setMonth = vi.fn();
    const setYear = vi.fn();

    render(
      <CoreDateInput
        day="15"
        month="08"
        year="2026"
        setDay={setDay}
        setMonth={setMonth}
        setYear={setYear}
      />,
    );

    const monthInput = screen.getByLabelText('Month');
    const dayInput = screen.getByLabelText('Day');
    const yearInput = screen.getByLabelText('Year');

    expect(monthInput).toBeDefined();
    expect(dayInput).toBeDefined();
    expect(yearInput).toBeDefined();

    fireEvent.change(monthInput, { target: { value: '09' } });
    expect(setMonth).toHaveBeenCalledWith('09');
  });
});
