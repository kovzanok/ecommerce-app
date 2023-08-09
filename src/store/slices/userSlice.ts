import { createSlice } from '@reduxjs/toolkit';
import { CustomerSignInResult } from '@commercetools/platform-sdk';

type UserState = CustomerSignInResult | null;

const initialState: UserState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
