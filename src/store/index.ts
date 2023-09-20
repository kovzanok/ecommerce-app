import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productsReducer from './slices/productsSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
    product: productReducer,
  },
});

export function setupStore(
  preloadedState?: PreloadedState<RootState>,
): AppStore {
  return configureStore({
    reducer: {
      user: userReducer,
      cart: cartReducer,
      products: productsReducer,
      product: productReducer,
    },
    preloadedState,
  });
}

export default store;
export type AppStore = ReturnType<typeof configureStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
