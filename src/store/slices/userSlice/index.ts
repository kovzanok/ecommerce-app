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

export const vertifyAuth = createAsyncThunk(
  'user/verify',
  async (): Promise<CustomerSignInResult | null> => {
    try {
      const res = await ApiService.verifyToken();
      if (res) {
        return res;
      }
      return null;
    } catch (err) {
      throw new Error();
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
  loading: true,
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
    resetError: (state) => {
      state.error = '';
    },
  },
  extraReducers(builder) {
    builder.addCase(vertifyAuth.pending, (state) => {
      state.error = '';
      state.loading = true;
      state.user = null;
    });
    builder.addCase(vertifyAuth.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = '';
        state.loading = false;
        state.user = action.payload;
      }
    });
    builder.addCase(vertifyAuth.rejected, (state) => {
      state.loading = false;
      state.user = null;
    });
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

export const { logout, resetError } = userSlice.actions;

export default userSlice.reducer;
