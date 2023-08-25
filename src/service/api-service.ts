import {
  CustomerDraft,
  CustomerSignInResult,
  CustomerSignin,
} from '@commercetools/platform-sdk';
import AuthModule from './modules/auth-module';
import { CreateApiData, ProductsQuery } from '../types';
import ProductsModule from './modules/products-module';

export default class ApiService {
  static async signIn(
    loginData: CustomerSignin,
  ): Promise<CustomerSignInResult | undefined> {
    AuthModule.createApiRoot(loginData);
    const customer = await AuthModule.login(loginData);
    return customer;
  }

  static async signUp(
    customerDraft: CustomerDraft,
  ): Promise<CustomerSignInResult | undefined> {
    const { email, password } = customerDraft;
    AuthModule.resetApiRoot();
    await AuthModule.createCustomer(customerDraft);
    AuthModule.createApiRoot({ email, password } as CreateApiData);
    const customer = await AuthModule.login({
      email,
      password,
    } as CustomerSignin);
    return customer;
  }

  static async getProducts(query: ProductsQuery) {
    return ProductsModule.getProducts(query);
  }

  static async getCategories() {
    return ProductsModule.getCategories();
  }

  static async getCategoryChain(categoryId: string) {
    const category = await ProductsModule.getCategoryById(categoryId);
    const ancestors = await Promise.all(
      category.ancestors.map(async ({ id }) => ProductsModule.getCategoryById(id)),
    );
    return [...ancestors, category];
  }
}
