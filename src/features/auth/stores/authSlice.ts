import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginApi } from '../api/loginApi';
import { registerApi } from '../api/registerApi';
import { userApi } from '../api/userApi';
import { AuthState } from '../types/auth';
import type { RootState } from '../../../stores/store';
import storage from '../../../utils/storage';

const initialState: AuthState = {
  user: null,
  token: null,
  remember: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // loadUser: (state) => {
    //   const token = storage.getToken();
    //   if (token) {
    //     state.token = token;
    //   }
    // },
    logout: (state) => {
      state.user = null;
      state.token = null;
      storage.clearToken();
    },
    rememberAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.remember = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(loginApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      const { token, ...user } = payload;
      state.token = token;
      state.user = user;
      if (state.remember) {
        storage.setToken(token);
      }
    });
    builder.addMatcher(loginApi.endpoints.loginToken.matchFulfilled, (state, { payload }) => {
      const { token, ...user } = payload;
      state.token = token;
      state.user = user;
      if (state.remember) {
        storage.setToken(token);
      }
    });
    builder.addMatcher(loginApi.endpoints.loginToken.matchRejected, () => {
      storage.clearToken();
    });
    builder.addMatcher(registerApi.endpoints.register.matchFulfilled, () => {
      // TODO: Use a backend that supports login on registration by returning token, instead of logging in manually in the component
    });
    builder.addMatcher(userApi.endpoints.refetchUser.matchFulfilled, (state, { payload }) => {
      const { password: _, ...user } = payload;
      state.user = user;
    });
  },
});

export const { logout, rememberAuth } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
