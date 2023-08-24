import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productReducer from './slices/productsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
});

export function setupStore(
  preloadedState?: PreloadedState<RootState>,
): AppStore {
  return configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState,
  });
}

export default store;
export type AppStore = ReturnType<typeof configureStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
