import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  Customer,
  CustomerDraft,
  CustomerSignInResult,
  CustomerSignin,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk';
import ApiService from '../../../service/api-service';
import AuthModule from '../../../service/modules/auth-module';
import { RootState } from '../..';
import { PasswordChangeFormValues } from '../../../types';

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

export const approveUserChanges = createAsyncThunk(
  'user/approveUserChanges',
  async (
    actions: CustomerUpdateAction[],
    ThunkAPI,
  ): Promise<Customer | undefined> => {
    try {
      const state: RootState = ThunkAPI.getState() as RootState;

      if (state.user.user?.customer) {
        const { version, id } = state.user.user.customer;
        const res = await AuthModule.updateCustomer(id, actions, version);
        return res;
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  },
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (
    { currentPassword, newPassword }: PasswordChangeFormValues,
    ThunkAPI,
  ): Promise<Customer | undefined> => {
    try {
      const state: RootState = ThunkAPI.getState() as RootState;

      if (state.user.user?.customer) {
        const { version, id } = state.user.user.customer;
        const res = await AuthModule.changePassword(
          id,
          currentPassword,
          newPassword,
          version,
        );
        return res;
      }
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
  error:
  | string
  | ''
  | 'There is already an existing customer with the provided email.'
  | 'The given current password does not match.'
  | 'Customer account with the given credentials not found.';
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
    builder.addCase(approveUserChanges.pending, (state) => {
      state.error = '';
      state.loading = true;
    });
    builder.addCase(approveUserChanges.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = '';
        state.loading = false;
        if (state.user?.customer) {
          state.user.customer = action.payload;
        }
      }
    });
    builder.addCase(approveUserChanges.rejected, (state, action) => {
      if (action.error.message) {
        state.loading = false;
        state.error = action.error.message;
      }
    });
    builder.addCase(changePassword.pending, (state) => {
      state.error = '';
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = '';
        state.loading = false;
        if (state.user?.customer) {
          state.user.customer = action.payload;
        }
      }
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      if (action.error.message) {
        state.loading = false;
        state.error = action.error.message;
      }
    });
  },
});

export const { logout, resetError } = userSlice.actions;

export default userSlice.reducer;
