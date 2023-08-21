import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  CustomerDraft,
  CustomerSignInResult,
  CustomerSignin,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { CreateApiData } from '../../types';

export default class AuthModule {
  static oauthUri = import.meta.env.VITE_CTP_AUTH_URL;

  static baseUri = import.meta.env.VITE_CTP_API_URL;

  static clientId = import.meta.env.VITE_CTP_CLIENT_ID;

  static clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;

  static projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

  static scope = import.meta.env.VITE_CTP_SCOPES;

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

  static apiRoot = AuthModule.creatAnonymousApiRoot();

  static createApiRoot({ email, password }: CreateApiData): void {
    const client = new ClientBuilder()
      .withPasswordFlow(AuthModule.passwordOptions({ email, password }))
      .withHttpMiddleware(AuthModule.httpOption)
      .build();
    AuthModule.apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: AuthModule.projectKey,
    });
  }

  static creatAnonymousApiRoot(): ByProjectKeyRequestBuilder {
    const client = new ClientBuilder()
      .withAnonymousSessionFlow(AuthModule.anonymousOptions)
      .withHttpMiddleware(AuthModule.httpOption)
      .build();
    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: AuthModule.projectKey,
    });
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
    AuthModule.apiRoot = AuthModule.creatAnonymousApiRoot();
  }
}
