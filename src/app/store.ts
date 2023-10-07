import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import authReducer from '../features/auth';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  devTools: {
    name: 'General Purpose App',
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
