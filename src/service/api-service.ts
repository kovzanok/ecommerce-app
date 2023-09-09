import {
  CustomerDraft,
  CustomerSignInResult,
  CustomerSignin,
  DiscountCode,
  MyCartUpdateAction,
} from '@commercetools/platform-sdk';
import AuthModule from './modules/auth-module';
import { CreateApiData, ProductsQuery } from '../types';
import ProductsModule from './modules/products-module';
import CartModule from './modules/cart-module';

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

  static async verifyToken(): Promise<CustomerSignInResult | undefined> {
    const tokenState = await AuthModule.introspectToken();
    if (tokenState.active) {
      AuthModule.createApiRootWithToken();
      const customerId = tokenState.scope.split('customer_id:')[1];
      const customer = await AuthModule.getClientById(customerId);
      // const cart = await AuthModule.getCartById(customerId);
      return { customer };
    }
    AuthModule.creatAnonymousApiRoot();
    throw new Error('Invalid token');
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

  static async updateCart(actions: MyCartUpdateAction[]) {
    try {
      const cart = await CartModule.checkCart();
      if (cart) {
        const { id, version } = cart;
        const newCart = await CartModule.modifyCart({ id, version, actions });
        return newCart;
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.startsWith('The discount code')) {
          throw new Error(err.message);
        }

        const { id, version } = await CartModule.createCart();
        const cart = await CartModule.modifyCart({ id, version, actions });
        return cart;
      }
    }
  }

  static async getPromocodeById(id: string): Promise<DiscountCode | undefined> {
    try {
      const promo = await CartModule.getPromocode({ id });

      if (promo) {
        return promo;
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }
}
