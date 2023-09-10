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
    total: 0,
  };
  const product = { product: null, loading: false, error: '' };
  const cart = { cart: null, loading: false, error: '' };
  const preloadedState = {
    user,
    product,
    products,
    cart,
  };
  it('should render page with submit button', async () => {
    renderWithProviders(<AddressesUserPage />, {
      preloadedState,
    });
    const button: HTMLElement = await screen.findByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Add address');
  });
});
