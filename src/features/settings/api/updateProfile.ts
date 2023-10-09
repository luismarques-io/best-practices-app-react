import { api } from '../../../services/api';
import { UserSettings, UserSettingsResponse } from '../types/settings';

export const updateProfileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<UserSettingsResponse, UserSettings>({
      query: (user) => ({ url: `users/${user.id}`, method: 'PUT', body: user }),
    }),
  }),
});

export const { useUpdateProfileMutation } = updateProfileApi;
