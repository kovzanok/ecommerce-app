import {
  Customer,
  CustomerDraft,
  CustomerSignInResult,
  CustomerSignin,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { vi } from 'vitest';
import { Action } from '@reduxjs/toolkit';
import userReducer, {
  approveUserChanges,
  changePassword,
  logout,
  signIn,
  signUp,
} from '.';
import ApiService from '../../../service/api-service';
import AuthModule from '../../../service/modules/auth-module';
import { PasswordChangeFormValues } from '../../../types';

vi.mock('../../../service/api-service');
vi.mock('../../../service/modules/auth-module');

describe('signInThunk', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return customer info, if credentials are valid', async () => {
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

    ApiService.signIn = vi
      .mocked(ApiService.signIn)
      .mockResolvedValueOnce(customer);

    const mockCredentials: CustomerSignin = {
      email: 'mock@email.com',
      password: 'mock',
    };

    const dispatch = vi.fn();
    const thunk = signIn(mockCredentials);
    await thunk(dispatch, () => {}, {});
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(signIn.pending.type);
    expect(end[0].type).toBe(signIn.fulfilled.type);
    expect(end[0].payload).toBe(customer);
  });

  it('should throw an error, if credentials are invalid', async () => {
    const errorMessage = 'Customer account with the given credentials not found.';

    const mockCredentials: CustomerSignin = {
      email: 'mock@email.com',
      password: 'mock',
    };

    ApiService.signIn = vi
      .mocked(ApiService.signIn)
      .mockRejectedValue(new Error(errorMessage));

    const dispatch = vi.fn();
    const thunk = signIn(mockCredentials);
    await thunk(dispatch, () => {}, {});
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(signIn.pending.type);
    expect(end[0].type).toBe(signIn.rejected.type);
    expect(end[0].error.message).toBe(errorMessage);
  });
});

describe('signUpThunk', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return customer info, if email is not registered', async () => {
    const customerDraft: CustomerDraft = {
      email: 'johndoe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'secret123',
    };

    const customerResult: CustomerSignInResult = {
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

    ApiService.signUp = vi
      .mocked(ApiService.signUp)
      .mockResolvedValueOnce(customerResult);

    const dispatch = vi.fn();
    const thunk = signUp(customerDraft);
    await thunk(dispatch, () => {}, {});
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(signUp.pending.type);
    expect(end[0].type).toBe(signUp.fulfilled.type);
    expect(end[0].payload).toBe(customerResult);
  });

  it('should throw an error, if email is already used', async () => {
    const customerDraft: CustomerDraft = {
      email: 'test@test.test',
      firstName: 'John',
      lastName: 'Doe',
      password: 'secret123',
    };

    const errorMessage = 'There is already an existing customer with the provided email';

    ApiService.signUp = vi
      .mocked(ApiService.signUp)
      .mockRejectedValue(new Error(errorMessage));

    const dispatch = vi.fn();
    const thunk = signUp(customerDraft);
    await thunk(dispatch, () => {}, {});
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(signUp.pending.type);
    expect(end[0].type).toBe(signUp.rejected.type);
    expect(end[0].error.message).toBe(errorMessage);
  });
});

describe('userSlice', () => {
  const initialState = {
    user: null,
    loading: true,
    error: '',
  };

  it('should return initial state', () => {
    const result = userReducer(undefined, { type: '' });
    expect(result).toStrictEqual(initialState);
  });

  it('should logout user', () => {
    const logoutState = {
      user: null,
      loading: false,
      error: '',
    };
    const userState = {
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
    const action: Action = { type: logout.type };
    const result = userReducer(userState, action);
    expect(result).toStrictEqual(logoutState);
  });
});

describe('approveUserChangesThunk', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return changed customer info, if credentials are valid', async () => {
    const customer: Customer = {
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
    };

    const expectedCustomer: Customer = {
      addresses: [],
      email: 'johndoe1@example.com',
      firstName: 'John',
      id: 'some_123_id',
      isEmailVerified: false,
      lastName: 'Doe',
      password: '****aGg=',
      version: 1,
      createdAt: '2015-07-06T13:22:33.339Z',
      lastModifiedAt: '2015-07-06T13:22:33.339Z',
      authenticationMode: 'Password',
    };

    AuthModule.updateCustomer = vi
      .mocked(AuthModule.updateCustomer)
      .mockResolvedValueOnce(customer);
    const mockActions: CustomerUpdateAction[] = [
      {
        action: 'changeEmail',
        email: 'changed_email@mail.ru',
      },
    ];

    const dispatch = vi.fn();
    const thunk = approveUserChanges(mockActions);
    await thunk(dispatch, () => {}, {});
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(approveUserChanges.pending.type);
    expect(end[0].type).toBe(approveUserChanges.fulfilled.type);
    expect(end[0].payload).toStrictEqual(expectedCustomer);
  });

  it('should throw an error, if email is already used', async () => {
    const customer: Customer = {
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
    };
    const errorMessage = 'There is already an existing customer with the provided email.';

    const mockActions: CustomerUpdateAction[] = [
      {
        action: 'changeEmail',
        email: 'changed_email@mail.ru',
      },
    ];

    AuthModule.updateCustomer = vi
      .mocked(AuthModule.updateCustomer)
      .mockResolvedValueOnce(customer)
      .mockRejectedValue(new Error(errorMessage));

    const dispatch = vi.fn();
    const thunk = approveUserChanges(mockActions);
    await thunk(dispatch, () => {}, {});
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(approveUserChanges.pending.type);
    expect(end[0].type).toBe(approveUserChanges.rejected.type);
    expect(end[0].error.message).toBe(errorMessage);
  });
});

describe('changePasswordThunk', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return changed customer info, if credentials are valid', async () => {
    const customer: Customer = {
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
    };

    const expectedCustomer: Customer = {
      addresses: [],
      email: 'johndoe@example.com',
      firstName: 'John',
      id: 'some_123_id',
      isEmailVerified: false,
      lastName: 'Doe',
      password: '****aGg=1',
      version: 1,
      createdAt: '2015-07-06T13:22:33.339Z',
      lastModifiedAt: '2015-07-06T13:22:33.339Z',
      authenticationMode: 'Password',
    };

    AuthModule.changePassword = vi
      .mocked(AuthModule.changePassword)
      .mockResolvedValueOnce(customer);

    const mockCredentials: PasswordChangeFormValues = {
      currentPassword: '****aGg=',
      newPassword: '****aGg=1',
    };

    const dispatch = vi.fn();
    const thunk = changePassword(mockCredentials);
    await thunk(dispatch, () => {}, {});
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(changePassword.pending.type);
    expect(end[0].type).toBe(changePassword.fulfilled.type);
    expect(end[0].payload).toStrictEqual(expectedCustomer);
  });

  it('should throw an error, if current password does not match', async () => {
    const customer: Customer = {
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
    };
    const errorMessage = 'The given current password does not match.';

    const mockCredentials: PasswordChangeFormValues = {
      currentPassword: '****aGg=wrong',
      newPassword: '****aGg=1',
    };

    AuthModule.changePassword = vi
      .mocked(AuthModule.changePassword)
      .mockResolvedValueOnce(customer)
      .mockRejectedValue(new Error(errorMessage));

    const dispatch = vi.fn();
    const thunk = changePassword(mockCredentials);
    await thunk(dispatch, () => {}, {});
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(changePassword.pending.type);
    expect(end[0].type).toBe(changePassword.rejected.type);
    expect(end[0].error.message).toBe(errorMessage);
  });
});
