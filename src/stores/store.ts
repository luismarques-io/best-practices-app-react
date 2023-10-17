import { configureStore } from '@reduxjs/toolkit';
import { APP_TITLE } from '../config';
import { api } from '../api/api';
import authReducer from '../features/auth';
import settingsReducer from '../features/users';
import postEditorReducer from '../features/post';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    settings: settingsReducer,
    postEditor: postEditorReducer,
  },
  devTools: {
    name: APP_TITLE,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
