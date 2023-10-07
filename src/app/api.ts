import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import settings from '../config/settings';
import { RootState } from './store';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: settings.baseApiUrl,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
