import { api } from '../../../api/api';
import { UserResponse, GetUserByIdDTO } from '../types/user';
import { UserSettings, UserSettingsResponse } from '../types/settings';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<UserResponse, GetUserByIdDTO>({
      query: ({ userId }: GetUserByIdDTO) => ({ url: `users/${userId}`, method: 'GET' }),
      providesTags: (_result, _error, arg) => [{ type: 'User', id: arg.userId }],
    }),
    getAuthUserById: builder.query<UserResponse, GetUserByIdDTO>({
      query: ({ userId }: GetUserByIdDTO) => ({ url: `auth/users/${userId}`, method: 'GET' }),
      providesTags: (_result, _error, arg) => [{ type: 'User', id: arg.userId }],
    }),
    updateProfile: builder.mutation<UserSettingsResponse, UserSettings>({
      query: (user) => ({ url: `auth/users/${user.id}`, method: 'PUT', body: user }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'User', id: arg.id }],
    }),
  }),
});

export const { useGetUserByIdQuery, useLazyGetAuthUserByIdQuery, useUpdateProfileMutation } = userApi;
