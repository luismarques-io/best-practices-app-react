import { api } from '../../../api/api';
import { UserResponse, GetUserByIdDTO } from '../types/auth';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserResponse, GetUserByIdDTO>({
      // TODO: Use a backend that uses the token to get the user, instead of passing the userId, e.g.: /users/me
      query: ({ userId }: GetUserByIdDTO) => ({ url: `users/${userId}`, method: 'GET' }),
    }),
  }),
});

export const { useLazyGetUserQuery, useGetUserQuery } = userApi;
