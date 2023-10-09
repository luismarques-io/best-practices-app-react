import { api } from '../../../services/api';
import { UserResponse, GetUserDTO } from '../types/auth';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    refetchUser: builder.query<UserResponse, GetUserDTO>({
      query: ({ userId }: GetUserDTO) => ({ url: `users/${userId}`, method: 'GET' }),
    }),
  }),
});

export const { useLazyRefetchUserQuery } = userApi;
