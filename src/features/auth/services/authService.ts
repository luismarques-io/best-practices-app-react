import { api } from '../../../app/api';

export interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  image: string;
}

export interface UserResponse {
  // user: User;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  image: string;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginTokenRequest {
  token: string;
}

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: credentials,
      }),
    }),
    loginToken: builder.mutation<UserResponse, LoginTokenRequest>({
      query: ({ token }) => ({
        url: 'auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        // TODO: Use a backend that supports refresh tokens, instead of hardcoding the credentials
        body: { username: 'kminchelle', password: '0lelplR' },
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  }),
});

export const { useLoginMutation, useLoginTokenMutation, useProtectedMutation } = extendedApi;
