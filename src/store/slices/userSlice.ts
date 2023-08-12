import { createSlice } from '@reduxjs/toolkit';
import { CustomerSignInResult } from '@commercetools/platform-sdk';

type UserState = {
  user: CustomerSignInResult | null;
  loading: boolean;
  error: string;
};

const initialState: UserState = {
  user: null,
  loading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
