// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CoreBitRow } from './CoreBitRow';
import { CoreDateInput } from './CoreDateInput';
import { CoreSelect } from './CoreSelect';
import { CoreSlider } from './CoreSlider';

describe('Core Components Accessibility', () => {
  it('associates label with select input using htmlFor and id in CoreSelect', () => {
    render(
      <CoreSelect
        label="Algorithm Choice"
        options={[{ value: 'luhn', label: 'Luhn' }]}
        value="luhn"
        onChange={vi.fn()}
      />,
    );

    const select = screen.getByLabelText('Algorithm Choice');
    expect(select).toBeDefined();
    expect(select.tagName.toLowerCase()).toBe('select');
  });

  it('associates label with range input using htmlFor and id in CoreSlider', () => {
    render(<CoreSlider label="CIDR Prefix" min={0} max={32} value={24} onChange={vi.fn()} />);

    const slider = screen.getByLabelText('CIDR Prefix');
    expect(slider).toBeDefined();
    expect(slider.getAttribute('type')).toBe('range');
    expect(slider.getAttribute('value')).toBe('24');
  });

  it('renders accessible checkboxes with keyboard toggle on CoreBitRow', () => {
    const onChange = vi.fn();
    render(
      <CoreBitRow
        bits={8}
        value={1}
        interactive={true}
        onChange={onChange}
        aria-label="8-bit test array"
      />,
    );

    const group = screen.getByRole('group', { name: '8-bit test array' });
    expect(group).toBeDefined();

    const bit0 = screen.getByLabelText('Bit 0, value 1');
    expect(bit0.getAttribute('role')).toBe('checkbox');
    expect(bit0.getAttribute('aria-checked')).toBe('true');

    fireEvent.keyDown(bit0, { key: ' ' });
    expect(onChange).toHaveBeenCalledWith(0);

    const bit1 = screen.getByLabelText('Bit 1, value 2');
    fireEvent.keyDown(bit1, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('associates accessible labels across sub-inputs in CoreDateInput', () => {
    render(
      <CoreDateInput
        day="10"
        month="05"
        year="2026"
        setDay={vi.fn()}
        setMonth={vi.fn()}
        setYear={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Month')).toBeDefined();
    expect(screen.getByLabelText('Day')).toBeDefined();
    expect(screen.getByLabelText('Year')).toBeDefined();
    expect(screen.getByLabelText('Pick date from calendar picker')).toBeDefined();
  });
});
