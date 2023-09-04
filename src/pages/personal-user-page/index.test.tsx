import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithProviders } from '../../test';
import UserPage from '.';

describe('UserPage', () => {
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
        dateOfBirth: '2023-12-12',
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
  const cart = { cart: null, loading: false, error: '' };
  const preloadedState = {
    user, product, products, cart,
  };

  it('should render all fields', async () => {
    renderWithProviders(<UserPage />, { preloadedState });

    expect(await screen.findByLabelText('First name')).toBeInTheDocument();
    expect(await screen.findByLabelText('First name')).toHaveAttribute(
      'placeholder',
      'Vasya',
    );

    expect(await screen.findByLabelText('Last name')).toBeInTheDocument();
    expect(await screen.findByLabelText('Last name')).toHaveAttribute(
      'placeholder',
      'Pupkin',
    );

    expect(await screen.findByLabelText('Email')).toBeInTheDocument();
    expect(await screen.findByLabelText('Email')).toHaveAttribute(
      'placeholder',
      'example@email.com',
    );

    expect(await screen.findByLabelText('Birthday')).toBeInTheDocument();
    expect(await screen.findByLabelText('Birthday')).toHaveAttribute(
      'placeholder',
      '1974-01-01',
    );

    expect(await screen.findByText('Change password')).toBeInTheDocument();
    expect(await screen.findByText('Change password')).toHaveTextContent(
      'Change password',
    );

    expect(await screen.findByText('Edit')).toHaveTextContent('Edit');
  });
});
