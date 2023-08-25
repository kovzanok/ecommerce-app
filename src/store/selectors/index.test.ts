import { RootState } from '..';
import userSelector, { productsSelector } from './index';

describe('userSelector', () => {
  it('should return user state from store', () => {
    const user = {
      error: '',
      loading: true,
      user: null,
    };
    const products = {
      products: [],
      loading: false,
      error: '',
    };
    const store: RootState = {
      user,
      products,
    };

    const result = userSelector(store);
    expect(result).toBe(user);
  });
});

describe('productsSelector', () => {
  it('should return products state from store', () => {
    const user = {
      error: '',
      loading: true,
      user: null,
    };
    const products = {
      products: [],
      loading: false,
      error: '',
    };
    const store: RootState = {
      user,
      products,
    };

    const result = productsSelector(store);
    expect(result).toBe(products);
  });
});
