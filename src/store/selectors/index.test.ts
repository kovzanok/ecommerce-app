import { RootState } from '..';
import userSelector from './index';

describe('userSelector', () => {
  it('should return user state from store', () => {
    const user = {
      error: '',
      loading: true,
      user: null,
    };
    const products = {
      products: [],
      loading: false,
      error: '',
    };
    const store: RootState = {
      user,
      products,
    };

    const result = userSelector(store);
    expect(result).toBe(user);
  });
});
