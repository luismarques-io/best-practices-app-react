import { configureStore } from '@reduxjs/toolkit';
import { APP_TITLE } from '../config';
import { api } from '../api/api';
import authReducer from '../features/auth';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  devTools: {
    name: APP_TITLE,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
