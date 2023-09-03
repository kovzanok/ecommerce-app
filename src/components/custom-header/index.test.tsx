import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test';
import CustomHeader from '.';
import { RootState } from '../../store';

describe('CustomHeader', () => {
  it('should render header with logo', async () => {
    renderWithProviders(<CustomHeader />);
    expect(await screen.findByRole('img')).toHaveAttribute(
      'src',
      '/src/assets/logo.png',
    );
  });
  it('should render logout button to authorized users', async () => {
    const preloadedState: RootState = {
      user: {
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
      },
      products: {
        products: [],
        loading: false,
        error: '',
      },
      product: { product: null, loading: false, error: '' },
    };
    renderWithProviders(<CustomHeader />, { preloadedState });
    expect(await screen.findByRole('button')).toHaveTextContent('Logout');
  });
  it('should render link to catalog page', async () => {
    renderWithProviders(<CustomHeader />);
    expect(await screen.findByText('Catalog')).toHaveTextContent('Catalog');
  });
  it('should render link to profile page to authorized users', async () => {
    const preloadedState: RootState = {
      user: {
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
      },
      products: {
        products: [],
        loading: false,
        error: '',
      },
      product: { product: null, loading: false, error: '' },
    };
    renderWithProviders(<CustomHeader />, { preloadedState });
    expect(await screen.findByText('Profile')).toHaveTextContent('Profile');
  });
});
