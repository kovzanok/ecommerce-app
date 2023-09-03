import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productsReducer from './slices/productsSlice';
import productReducer from './slices/productSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
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
