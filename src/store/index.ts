import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
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
