import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithProviders } from '../../test';
import SortSelect from '.';
import { Sorting } from '../../types';

type SortSelectProps = {
  loading: boolean;
  value: Sorting;
  handleChange: (value: string | null) => void;
};

describe('SortSelect', () => {
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
  it('should render select', async () => {
    const selectProps: SortSelectProps = {
      loading: false,
      value: 'name.en-US asc',
      handleChange: () => {},
    };
    renderWithProviders(<SortSelect {...selectProps} />);

    expect(await screen.findByLabelText('Sorting')).toHaveAttribute(
      'value',
      'A-Z',
    );
  });
  it('should render disabled select during loading', async () => {
    const selectProps: SortSelectProps = {
      loading: true,
      value: 'name.en-US asc',
      handleChange: () => {},
    };
    renderWithProviders(<SortSelect {...selectProps} />);

    expect(await screen.findByLabelText('Sorting')).toBeDisabled();
  });
});
