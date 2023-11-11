import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { APP_TITLE } from '../config';
import { api } from '../api/api';
// Importing reducers with the full path because reexporting from src/features/{featureName} causes issues using preloadedState in tests
import authReducer from '../features/auth/stores/authSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: {
      name: APP_TITLE,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
