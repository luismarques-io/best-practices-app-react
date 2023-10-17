import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SettingsState, UserSettings } from '../types/settings';
import type { RootState } from '../../../stores/store';

const initialState: SettingsState = {
  user: { id: '', email: '', firstName: '', lastName: '', image: '', password: '' },
  isLoading: false,
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setUserSettings: (state, { payload }: PayloadAction<UserSettings>) => {
      state.user = payload;
    },
    updateField: (state, { payload: { name, value } }: PayloadAction<{ name: keyof UserSettings; value: string }>) => {
      state.user[name] = value;
    },
    setUpdateStarted: (state) => {
      state.isLoading = true;
    },
    setUpdateComplete: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setUserSettings, updateField, setUpdateStarted, setUpdateComplete } = slice.actions;

export default slice.reducer;

export const selectUserSettings = (state: RootState) => state.settings.user;

export const selectIsLoading = (state: RootState) => state.settings.isLoading;
