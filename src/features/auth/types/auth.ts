export type User = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  image: string;
};

export type UserForRegistration = {
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
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
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  image: string;
  token: string;
};
