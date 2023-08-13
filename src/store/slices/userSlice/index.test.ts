import {
  CustomerSignInResult,
  CustomerSignin,
} from '@commercetools/platform-sdk';
import { vi } from 'vitest';
import { signIn } from '.';
import ApiService from '../../../service/api-service';

vi.mock('../../../service/api-service');

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
