import { api } from '../../../services/api';
import { UserResponse, LoginCredentials, LoginTokenCredentials } from '../types/auth';

export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginCredentials>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: credentials,
      }),
    }),
    loginToken: builder.mutation<UserResponse, LoginTokenCredentials>({
      query: ({ token }) => ({
        url: 'auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        // TODO: Use a backend that supports refresh tokens, instead of hardcoding the credentials
        body: { username: 'kminchelle', password: '0lelplR' },
      }),
    }),
  }),
});

export const { useLoginMutation, useLoginTokenMutation } = loginApi;
