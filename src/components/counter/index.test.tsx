import { vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test';
import Counter, { CounterProps } from '.';

describe('Counter', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('should render page with actions buttons and number input', async () => {
    const counterProps: CounterProps = {
      id: '1221dff12f',
      initialValue: 2,
    };
    renderWithProviders(<Counter {...counterProps} />);

    const input: HTMLElement = await screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('2');

    const actionButtonMinus: HTMLElement = await screen.findByText('–');
    expect(actionButtonMinus).toBeInTheDocument();

    const actionButtonPlus: HTMLElement = await screen.findByText('+');
    expect(actionButtonPlus).toBeInTheDocument();
  });

  it('should change input value', async () => {
    const counterProps: CounterProps = {
      id: '1221dff12sdasf',
      initialValue: 2,
    };
    renderWithProviders(<Counter {...counterProps} />);

    const input: HTMLElement = await screen.getByRole('textbox');
    const actionButtonMinus: HTMLElement = await screen.findByText('–');
    const actionButtonPlus: HTMLElement = await screen.findByText('+');

    fireEvent.click(actionButtonMinus);

    expect(actionButtonMinus).toBeDisabled();
    expect(input).toHaveValue('1');

    fireEvent.click(actionButtonPlus);
    fireEvent.click(actionButtonPlus);

    expect(input).toHaveValue('3');

    fireEvent.focus(input);
    fireEvent.blur(input, { target: { value: '10' } });
    expect(input).toHaveValue('10');

    fireEvent.focus(input);
    fireEvent.blur(input, { target: { value: '5' } });
    expect(input).toHaveValue('5');
  });
});
