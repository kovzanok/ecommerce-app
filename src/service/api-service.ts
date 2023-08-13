import {
  CustomerDraft,
  CustomerSignInResult,
  CustomerSignin,
} from '@commercetools/platform-sdk';
import AuthModule from './modules/auth-module';
import { CreateApiData } from '../types';

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
    const customer = await AuthModule.createCustomer(customerDraft);
    AuthModule.createApiRoot({ email, password } as CreateApiData);
    return customer;
  }
}
