import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { extendedApi as api, User } from '../services/authService';
import type { RootState } from '../../../app/store';

type AuthState = {
  user: User | null;
  token: string | null;
  remember: boolean | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  remember: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUser: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    rememberAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.remember = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
      const { token, ...user } = payload;
      state.token = token;
      state.user = user;
      if (state.remember) {
        localStorage.setItem('token', token);
      }
    });
    builder.addMatcher(api.endpoints.loginToken.matchFulfilled, (state, { payload }) => {
      const { token, ...user } = payload;
      state.token = token;
      state.user = user;
      if (state.remember) {
        localStorage.setItem('token', token);
      }
    });
    builder.addMatcher(api.endpoints.loginToken.matchRejected, () => {
      localStorage.removeItem('token');
    });
  },
});

export const { logout, rememberAuth } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
