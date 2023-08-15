import { RootState } from '..';
import userSelector from './index';

describe('userSelector', () => {
  it('should return user state from store', () => {
    const user = {
      error: '',
      loading: true,
      user: null,
    };
    const store: RootState = {
      user,
    };

    const result = userSelector(store);
    expect(result).toBe(user);
  });
});
