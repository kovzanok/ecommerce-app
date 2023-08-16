import { vi } from 'vitest';
import {
  CustomerDraft,
  CustomerSignInResult,
  CustomerSignin,
} from '@commercetools/platform-sdk';
import ApiService from './api-service';
import AuthModule from './modules/auth-module';

vi.mock('../service/modules/auth-module');

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
});
