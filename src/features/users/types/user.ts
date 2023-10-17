export type GetUserByIdDTO = {
  userId: string;
};

export type UserResponse = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};
