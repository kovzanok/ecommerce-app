import { ProductProjection } from '@commercetools/platform-sdk';
import { vi } from 'vitest';
import productsReducer, { fetchProducts } from '.';
import ApiService from '../../../service/api-service';
import { Filters, ProductsQuery } from '../../../types';

vi.mock('../../../service/api-service');

describe('fetchProductsThunk', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return products', async () => {
    const products: ProductProjection[] = [];
    const filters: Filters = {
      Age_restrictions: '18',
      Author: 'author',
      Cover: 'paper',
      price: {
        max: 20,
        min: 0,
      },
      publisher: 'smt',
    };
    const query: ProductsQuery = {
      category: '',
      filters,
      search: '',
      sort: 'name.en-US asc',
    };

    ApiService.getProducts = vi
      .mocked(ApiService.getProducts)
      .mockResolvedValueOnce(products);

    const dispatch = vi.fn();
    const thunk = fetchProducts(query);
    await thunk(dispatch, () => {}, {});
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(fetchProducts.pending.type);
    expect(end[0].type).toBe(fetchProducts.fulfilled.type);
    expect(end[0].payload).toBe(products);
  });
});

describe('productsSlice', () => {
  const initialState = {
    products: [],
    loading: true,
    error: '',
  };

  it('should return initial state', () => {
    const result = productsReducer(undefined, { type: '' });
    expect(result).toStrictEqual(initialState);
  });
});
