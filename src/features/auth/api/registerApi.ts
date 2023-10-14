import { api } from '../../../api/api';
import { UserResponse, UserForRegistration } from '../types/auth';

export const registerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<UserResponse, UserForRegistration>({
      query: (user) => ({
        url: 'users/add',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: user,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
