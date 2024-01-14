import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginApi } from '../api/loginApi';
import { registerApi } from '../api/registerApi';
import { userApi } from '../api/getUserApi';
import { AuthState, User } from '../types/auth';
import type { RootState } from '@/stores/store';
import storage from '@/utils/storage';

const initialState: AuthState = {
  user: null,
  token: null,
  remember: null,
};

const prepareUser = (user: User): User => {
  return {
    ...user,
    image: user.image || `https://image.dummyjson.com/300x300/008080/ffffff?text=${user.username}`,
  };
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.remember = null;
      storage.clearToken();
    },
    rememberAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.remember = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(loginApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        const { token, ...user } = payload;
        state.token = token;
        state.user = prepareUser(user);
        if (state.remember) {
          storage.setToken(token);
        }
      })
      .addMatcher(loginApi.endpoints.loginToken.matchFulfilled, (state, { payload }) => {
        const { token, ...user } = payload;
        state.token = token;
        state.user = prepareUser(user);
        if (state.remember) {
          storage.setToken(token);
        }
      })
      .addMatcher(loginApi.endpoints.loginToken.matchRejected, () => {
        storage.clearToken();
      })
      .addMatcher(registerApi.endpoints.register.matchFulfilled, () => {
        // TODO: Use a backend that supports login on registration by returning token, instead of logging in manually in the component
      })
      .addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, { payload }) => {
        const { password: _, ...user } = payload;
        state.user = prepareUser(user);
      });
  },
});

export const { logout, rememberAuth } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
