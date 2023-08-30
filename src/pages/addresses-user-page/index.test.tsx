import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test';
import AddressesUserPage from '.';

describe('AddressesUserPage', () => {
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

  it('should render page with submit button', async () => {
    renderWithProviders(<AddressesUserPage />);
    const button: HTMLElement = await screen.findByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Add address');
  });
});
