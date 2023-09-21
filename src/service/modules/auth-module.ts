import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  Cart,
  Customer,
  CustomerDraft,
  CustomerSignInResult,
  CustomerSignin,
  CustomerUpdateAction,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ActiveToken, CreateApiData, NonActiveToken } from '../../types';
import MyTokenCache from '../../utils/token-cache';

export default class AuthModule {
  static oauthUri = import.meta.env.VITE_CTP_AUTH_URL;

  static baseUri = import.meta.env.VITE_CTP_API_URL;

  static clientId = import.meta.env.VITE_CTP_CLIENT_ID;

  static clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;

  static projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

  static scope = import.meta.env.VITE_CTP_SCOPES;

  static accessToken = localStorage.getItem('qwe_access-token') || '';

  static passwordOptions = ({
    email,
    password,
  }: CreateApiData): PasswordAuthMiddlewareOptions => ({
    host: AuthModule.oauthUri,
    projectKey: AuthModule.projectKey,
    credentials: {
      clientId: AuthModule.clientId,
      clientSecret: AuthModule.clientSecret,
      user: {
        username: email,
        password,
      },
    },
    scopes: [`manage_project:${AuthModule.projectKey}`],
    fetch,
    tokenCache: new MyTokenCache(),
  });

  static httpOption: HttpMiddlewareOptions = {
    host: AuthModule.baseUri,
    includeResponseHeaders: true,
    maskSensitiveHeaderData: true,
    includeOriginalRequest: false,
    includeRequestInErrorResponse: false,
    enableRetry: true,
    retryConfig: {
      maxRetries: 3,
      retryDelay: 200,
      backoff: false,
      retryCodes: [503],
    },
    fetch,
  };

  static anonymousOptions: AnonymousAuthMiddlewareOptions = {
    host: AuthModule.oauthUri,
    projectKey: AuthModule.projectKey,
    credentials: {
      clientId: AuthModule.clientId,
      clientSecret: AuthModule.clientSecret,
    },
    scopes: [`manage_project:${AuthModule.projectKey}`],
    fetch,
  };

  static apiRoot: ByProjectKeyRequestBuilder;

  static createApiRoot({ email, password }: CreateApiData): void {
    const client = new ClientBuilder()
      .withPasswordFlow(AuthModule.passwordOptions({ email, password }))
      .withHttpMiddleware(AuthModule.httpOption)
      .build();
    AuthModule.apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: AuthModule.projectKey,
    });
  }

  static creatAnonymousApiRoot(): void {
    const client = new ClientBuilder()
      .withAnonymousSessionFlow(AuthModule.anonymousOptions)
      .withHttpMiddleware(AuthModule.httpOption)
      .build();
    AuthModule.apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: AuthModule.projectKey,
    });
  }

  static createApiRootWithToken() {
    if (AuthModule.accessToken) {
      const client = new ClientBuilder()
        .withExistingTokenFlow(`Bearer ${AuthModule.accessToken}`, {
          force: true,
        })
        .withHttpMiddleware(AuthModule.httpOption)
        .build();
      AuthModule.apiRoot = createApiBuilderFromCtpClient(client).withProjectKey(
        {
          projectKey: AuthModule.projectKey,
        },
      );
    }
  }

  static async createCustomer(
    body: CustomerDraft,
  ): Promise<CustomerSignInResult | undefined> {
    try {
      const res = await AuthModule.apiRoot
        .customers()
        .post({
          body,
        })
        .execute();
      return res.body;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }

  static async login({
    email,
    password,
  }: CustomerSignin): Promise<CustomerSignInResult | undefined> {
    try {
      const res = await AuthModule.apiRoot
        .login()
        .post({
          body: {
            email,
            password,
          },
        })
        .execute();
      return res.body;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }

  static resetApiRoot() {
    AuthModule.creatAnonymousApiRoot();
  }

  static async introspectToken(): Promise<ActiveToken | NonActiveToken> {
    const body = new URLSearchParams(`token=${AuthModule.accessToken}`);
    const res = await fetch(`${AuthModule.oauthUri}/oauth/introspect`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(
          `${AuthModule.clientId}:${AuthModule.clientSecret}`,
        )}`,
      },
      body,
    });
    const json: ActiveToken | NonActiveToken = await res.json();
    return json;
  }

  static async getClientById(id: string): Promise<Customer> {
    const { body } = await AuthModule.apiRoot
      .customers()
      .withId({ ID: id })
      .get()
      .execute();
    return body;
  }

  static async getCartById(id: string): Promise<Cart> {
    const { body } = await AuthModule.apiRoot
      .carts()
      .withCustomerId({ customerId: id })
      .get()
      .execute();
    return body;
  }

  static async updateCustomer(
    ID: string,
    actions: CustomerUpdateAction[],
    version: number,
  ): Promise<Customer> {
    const res = await AuthModule.apiRoot
      .customers()
      .withId({ ID })
      .post({
        body: {
          actions,
          version,
        },
      })
      .execute();

    return res.body;
  }

  static async changePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
    version: number,
  ): Promise<Customer> {
    const res = await AuthModule.apiRoot
      .customers()
      .password()
      .post({
        body: {
          id,
          currentPassword,
          newPassword,
          version,
        },
      })
      .execute();

    return res.body;
  }
}
