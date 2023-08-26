import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export default class MyTokenCache implements TokenCache {
  myCache: TokenStore = { expirationTime: 0, token: '', refreshToken: '' };

  get() {
    return this.myCache;
  }

  set(cache: TokenStore) {
    localStorage.setItem('qwe_access-token', cache.token);
    this.myCache = cache;
  }
}
