import { User } from '../../auth';

export type Post = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  userId: string;
  reactions: number;
  user?: User;
};

export type PostForEditor = {
  title: string;
  body: string;
  tags: string[];
};

export type CreatePostDTO = {
  title: string;
  body: string;
  tags: string[];
  userId: string;
};

export type UpdatePostDTO = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  // userId: string;
};

export type GetPostDTO = {
  postId: string;
};
