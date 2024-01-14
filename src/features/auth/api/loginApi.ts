import { api } from '@/api/api';
import { UserResponse, LoginCredentials, LoginTokenCredentials } from '../types/auth';

export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginCredentials>({
      query: (credentials) => ({ url: 'auth/login', method: 'POST', body: credentials }),
    }),
    loginToken: builder.mutation<UserResponse, LoginTokenCredentials>({
      query: ({ token }) => ({
        url: 'auth/login',
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        // TODO: Use a backend that supports refresh tokens, instead of hardcoding the credentials
        // (using loginToken to simulate refresh token in tests)
        body: { username: 'kminchelle', password: '0lelplR', loginToken: true },
      }),
    }),
  }),
});

export const { useLoginMutation, useLoginTokenMutation } = loginApi;
