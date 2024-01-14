import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/config';
import { RootState } from '@/stores/store';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-Type', 'application/json');
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Post', 'Comment'],
  endpoints: () => ({}),
});
