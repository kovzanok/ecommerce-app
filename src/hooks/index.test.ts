import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector, useTitle } from './index';
import { renderHookWithProviders } from '../test';
import { AppDispatch, RootState } from '../store';

describe('useAppDispatch', () => {
  it('should return dispatch', () => {
    const {
      result: { current },
    } = renderHookWithProviders<AppDispatch>(() => useAppDispatch());
    const {
      result: { current: dispatch },
    } = renderHookWithProviders(() => useDispatch());
    expect(current.toString()).toBe(dispatch.toString());
  });
});

describe('useAppSelector', () => {
  it('should return user state from store', () => {
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
    const cart = { cart: null, loading: false, error: '' };
    const {
      result: { current },
    } = renderHookWithProviders<RootState['user']>(
      () => useAppSelector((state) => state.user),
      {
        preloadedState: {
          user,
          products,
          product: { product: null, loading: false, error: '' },
          cart,
        },
      },
    );
    expect(current).toStrictEqual(user);
  });
});

describe('useTitle', () => {
  it('should change document title', async () => {
    document.title = 'Initial title';
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
    const cart = { cart: null, loading: false, error: '' };
    renderHookWithProviders(() => useTitle('New title'), {
      preloadedState: {
        user,
        products,
        product: { product: null, loading: false, error: '' },
        cart,
      },
    });
    expect(document.title).toBe('New title');
  });
});
