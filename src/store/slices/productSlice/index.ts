import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductProjection } from '@commercetools/platform-sdk';
import ProductsModule from '../../../service/modules/products-module';

export const fetchProductById = createAsyncThunk(
  'product/fetch',
  async (id: string) => {
    try {
      const res = ProductsModule.getProductById(id);
      return await res;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  },
);

type ProductState = {
  product: ProductProjection | null;
  loading: boolean;
  error: string;
};

const initialState: ProductState = {
  product: null,
  loading: true,
  error: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearError(state) {
      state.error = '';
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProductById.pending, (state) => {
      state.error = '';
      state.loading = true;
      state.product = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = '';
        state.loading = false;
        state.product = action.payload;
      }
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      if (action.error.message) {
        state.loading = false;
        state.product = null;
        state.error = action.error.message;
      }
    });
  },
});

export const { clearError } = productSlice.actions;

export default productSlice.reducer;
