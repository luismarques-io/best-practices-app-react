import { api } from '@/api/api';
import { UserResponse, GetUserByIdDTO } from '../types/auth';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserResponse, GetUserByIdDTO>({
      // TODO: Use a backend that uses the token to get the user, instead of passing the userId, e.g.: /users/me
      query: ({ userId }: GetUserByIdDTO) => ({ url: `users/${userId}`, method: 'GET' }),
      providesTags: (_result, _error, arg) => [{ type: 'User', id: arg.userId }],
    }),
  }),
});

export const { useGetUserQuery } = userApi;
