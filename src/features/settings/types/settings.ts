export type UserSettings = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  image?: string | null;
  password?: string;
};

export type SettingsState = {
  user: UserSettings;
};

export type UserSettingsResponse = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
};
