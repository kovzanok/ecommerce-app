import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Cart, MyCartUpdateAction } from '@commercetools/platform-sdk';
import ApiService from '../../../service/api-service';
import CartModule from '../../../service/modules/cart-module';

export const updateCart = createAsyncThunk(
  'cart/update',
  async (actions: MyCartUpdateAction[]) => {
    try {
      const cart = await ApiService.updateCart(actions);
      if (cart) return cart;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  },
);

export const getCart = createAsyncThunk('cart/get', async () => {
  try {
    const cart = await CartModule.checkCart();
    return cart;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
});

type CartState = {
  cart: Cart | null;
  loading: boolean;
  error: string;
};

const initialState: CartState = {
  cart: null,
  loading: false,
  error: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(updateCart.pending, (state) => {
      state.error = '';
      state.loading = true;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = '';
        state.loading = false;
        state.cart = action.payload;
      }
    });
    builder.addCase(updateCart.rejected, (state) => {
      state.error = '';
      state.loading = false;
    });
    builder.addCase(getCart.pending, (state) => {
      state.error = '';
      state.loading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = '';
        state.loading = false;
        state.cart = action.payload;
      }
    });
    builder.addCase(getCart.rejected, (state) => {
      state.error = '';
      state.loading = false;
    });
  },
});

export default cartSlice.reducer;
