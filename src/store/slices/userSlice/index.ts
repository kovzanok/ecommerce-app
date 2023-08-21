import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  CustomerDraft,
  CustomerSignInResult,
  CustomerSignin,
} from '@commercetools/platform-sdk';
import ApiService from '../../../service/api-service';

export const signIn = createAsyncThunk(
  'user/signIn',
  async (
    signInData: CustomerSignin,
  ): Promise<CustomerSignInResult | undefined> => {
    try {
      const user = await ApiService.signIn(signInData);
      return user;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  },
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async (
    signUpData: CustomerDraft,
  ): Promise<CustomerSignInResult | undefined> => {
    try {
      const user = await ApiService.signUp(signUpData);
      return user;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  },
);

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
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = '';
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(signIn.pending, (state) => {
      state.error = '';
      state.loading = true;
      state.user = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = '';
        state.loading = false;
        state.user = action.payload;
      }
    });
    builder.addCase(signIn.rejected, (state, action) => {
      if (action.error.message) {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      }
    });
    builder.addCase(signUp.pending, (state) => {
      state.error = '';
      state.loading = true;
      state.user = null;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = '';
        state.loading = false;
        state.user = action.payload;
      }
    });
    builder.addCase(signUp.rejected, (state, action) => {
      if (action.error.message) {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      }
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
