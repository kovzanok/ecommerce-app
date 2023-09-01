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
    const user = {
      user: {
        customer: {
          addresses: [],
          email: 'johndoe@example.com',
          firstName: 'John',
          id: 'some_123_id',
          isEmailVerified: false,
          lastName: 'Doe',
          password: '****aGg=',
          version: 1,
          createdAt: '2015-07-06T13:22:33.339Z',
          lastModifiedAt: '2015-07-06T13:22:33.339Z',
          authenticationMode: 'Password',
        },
      },
      loading: false,
      error: '',
    };
    const products = {
      products: [],
      loading: false,
      error: '',
    };
    const product = { product: null, loading: false, error: '' };
    renderWithProviders(<AddressesUserPage />, {
      preloadedState: { user, product, products },
    });
    const button: HTMLElement = await screen.findByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Add address');
  });
});
