// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
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
});
