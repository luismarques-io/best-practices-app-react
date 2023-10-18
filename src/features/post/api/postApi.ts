import { api } from '../../../api/api';
import { User } from '../../auth';
import {
  Post,
  CreatePostDTO,
  UpdatePostDTO,
  GetPostDTO,
  GetPostsDTO,
  PostsResponse,
  GetUserPostsDTO,
  DeletePostDTO,
  DeletePostResponse,
} from '../types/post';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const postEditorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<Post, CreatePostDTO>({
      query: (post) => ({ url: 'posts/add', method: 'POST', body: post }),
    }),
    updatePost: builder.mutation<Post, UpdatePostDTO>({
      query: (post) => ({ url: `posts/${post.id}`, method: 'PUT', body: post }),
    }),
    deletePost: builder.mutation<DeletePostResponse, DeletePostDTO>({
      query: ({ id }) => ({ url: `posts/${id}`, method: 'DELETE' }),
    }),
    getPost: builder.query<Post, GetPostDTO>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // Get post
        const postResult = await fetchWithBQ({ url: `posts/${_arg.postId}`, method: 'GET' });
        if (postResult.error) throw postResult.error;
        const post = postResult.data as Post;

        // Get user
        const userResult = await fetchWithBQ({ url: `users/${post.userId}`, method: 'GET' });

        return userResult.data
          ? { data: { ...post, user: userResult.data as User } as Post }
          : { error: userResult.error as FetchBaseQueryError };
      },
    }),
    getPosts: builder.query<PostsResponse, GetPostsDTO>({
      query: ({ limit = 10, skip = 0 }) => ({ url: `posts?limit=${limit}&skip=${skip}`, method: 'GET' }),
    }),
    getUserPosts: builder.query<PostsResponse, GetUserPostsDTO>({
      query: ({ userId, limit = 10, skip = 0 }) => ({
        url: `users/${userId}/posts?limit=${limit}&skip=${skip}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useGetUserPostsQuery,
  useDeletePostMutation,
} = postEditorApi;
