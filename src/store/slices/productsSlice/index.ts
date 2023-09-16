import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductProjection } from '@commercetools/platform-sdk';
import ApiService from '../../../service/api-service';
import { ProductsQuery } from '../../../types';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (query: ProductsQuery) => {
    const res = ApiService.getProducts(query);
    return res;
  },
);

type ProductsState = {
  products: ProductProjection[];
  total: number;
  loading: boolean;
  error: string;
};

const initialState: ProductsState = {
  products: [],
  total: 0,
  loading: true,
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
      if (
        action.payload
        && action.payload[0]
        && typeof action.payload[1] === 'number'
      ) {
        [state.products, state.total] = action.payload;
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
