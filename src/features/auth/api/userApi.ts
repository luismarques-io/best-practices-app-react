import { api } from '../../../api/api';
import { UserResponse, GetUserByIdDTO } from '../types/auth';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<UserResponse, GetUserByIdDTO>({
      query: ({ userId }: GetUserByIdDTO) => ({ url: `users/${userId}`, method: 'GET' }),
    }),
  }),
});

export const { useLazyGetUserByIdQuery, useGetUserByIdQuery } = userApi;
