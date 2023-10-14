export type User = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export type UserForRegistration = {
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  gender?: string;
  image: string | null;
  password: string;
  terms: boolean;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginTokenCredentials = {
  token: string;
};

export type UserResponse = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  password?: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  remember: boolean | null;
  isLoading: boolean;
};

export type GetUserByIdDTO = {
  userId: string;
};
