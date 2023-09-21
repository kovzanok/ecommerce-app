import { ProductProjection } from '@commercetools/platform-sdk';
import { vi } from 'vitest';
import productReducer, { fetchProductById } from '.';
import ProductsModule from '../../../service/modules/products-module';

vi.mock('../../../service/modules/products-module');

describe('productSlice', () => {
  const initialState = {
    product: null,
    loading: true,
    error: '',
  };

  it('should return initial state', () => {
    const result = productReducer(undefined, { type: '' });
    expect(result).toStrictEqual(initialState);
  });
});

describe('fetchProductById', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return product', async () => {
    const product: ProductProjection = {
      categories: [],
      createdAt: '',
      id: '1',
      version: 1,
      name: { 'en-US': 'Name' },
      variants: [],
      lastModifiedAt: '',
      masterVariant: { id: 1 },
      productType: { id: '1', typeId: 'product-type' },
      slug: { 'en-US': 'slug' },
    };
    const id = '1';
    ProductsModule.getProductById = vi
      .mocked(ProductsModule.getProductById)
      .mockResolvedValueOnce(product);

    const dispatch = vi.fn();
    const thunk = fetchProductById(id);
    await thunk(dispatch, () => {}, {});
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(fetchProductById.pending.type);
    expect(end[0].type).toBe(fetchProductById.fulfilled.type);
    expect(end[0].payload).toBe(product);
  });
});
