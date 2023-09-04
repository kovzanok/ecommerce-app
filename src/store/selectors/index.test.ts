import { RootState } from '..';
import userSelector, { productSelector, productsSelector } from './index';

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
    const cart = { cart: null, loading: false, error: '' };
    const store: RootState = {
      user,
      products,
      product: { product: null, loading: false, error: '' },
      cart,
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
    const product = { product: null, loading: false, error: '' };
    const cart = { cart: null, loading: false, error: '' };
    const store: RootState = {
      user,
      products,
      product,
      cart,
    };

    const result = productsSelector(store);
    expect(result).toBe(products);
  });
});

describe('productSelector', () => {
  it('should return product state from store', () => {
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
    const product = { product: null, loading: false, error: '' };
    const cart = { cart: null, loading: false, error: '' };
    const store: RootState = {
      user,
      products,
      product,
      cart,
    };

    const result = productSelector(store);
    expect(result).toBe(product);
  });
});
