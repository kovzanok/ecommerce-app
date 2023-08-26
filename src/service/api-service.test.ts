import { vi } from 'vitest';
import {
  Category,
  CustomerDraft,
  CustomerSignInResult,
  CustomerSignin,
  ProductProjection,
} from '@commercetools/platform-sdk';
import ApiService from './api-service';
import AuthModule from './modules/auth-module';
import ProductsModule from './modules/products-module';
import { ProductsQuery } from '../types';

vi.mock('./modules/auth-module');
vi.mock('./modules/products-module');

describe('ApiService', () => {
  const customer: CustomerSignInResult = {
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
  };

  beforeEach(() => {
    AuthModule.createApiRoot = vi
      .mocked(AuthModule.createApiRoot)
      .mockReturnValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return customer info on successful sign in', async () => {
    const mockLoginCredentials: CustomerSignin = {
      email: 'mock@email.com',
      password: 'mock',
    };

    AuthModule.login = vi.mocked(AuthModule.login).mockResolvedValue(customer);
    expect(await ApiService.signIn(mockLoginCredentials)).toStrictEqual(
      customer,
    );
  });

  it('should return customer info on successful sign up', async () => {
    const customerDraft: CustomerDraft = {
      email: 'johndoe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'secret123',
    };

    AuthModule.createCustomer = vi
      .mocked(AuthModule.createCustomer)
      .mockResolvedValue(customer);
    expect(await ApiService.signUp(customerDraft)).toStrictEqual(customer);
  });

  it('should return product list', async () => {
    const query: ProductsQuery = {
      category: '',
      filters: {
        Age_restrictions: '',
        Author: '',
        Cover: '',
        price: { max: 100, min: 0 },
        publisher: '',
      },
      search: '',
      sort: 'name.en-US asc',
    };
    const products: ProductProjection[] = [];
    ProductsModule.getProducts = vi
      .mocked(ProductsModule.getProducts)
      .mockResolvedValue(products);

    expect(await ApiService.getProducts(query)).toStrictEqual(products);
  });

  it('should return categories', async () => {
    const categories: Category[] = [];
    ProductsModule.getCategories = vi
      .mocked(ProductsModule.getCategories)
      .mockResolvedValue(categories);
    expect(await ApiService.getCategories()).toStrictEqual(categories);
  });
});
