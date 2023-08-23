import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductProjection } from '@commercetools/platform-sdk';
import ApiService from '../../../service/api-service';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = ApiService.getProducts();
  return res;
});

type ProductsState = {
  products: ProductProjection[] | null;
  loading: boolean;
  error: string;
};

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      if (action.payload) {
        state.products = action.payload;
        state.error = '';
        state.loading = false;
      }
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      if (action.error.message) {
        state.loading = false;
        state.error = action.error.message;
      }
    });
  },
});

export default productsSlice.reducer;
