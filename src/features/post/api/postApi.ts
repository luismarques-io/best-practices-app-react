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
    getPosts: builder.query<PostsResponse, GetPostsDTO>({
      query: ({ limit = 10, skip = 0 }) => ({ url: `posts?limit=${limit}&skip=${skip}`, method: 'GET' }),
      providesTags: (result, _error, _arg) =>
        result ? [...result.posts.map(({ id }) => ({ type: 'Post' as const, id })), 'Post'] : ['Post'],
    }),
    getUserPosts: builder.query<PostsResponse, GetUserPostsDTO>({
      query: ({ userId, limit = 10, skip = 0 }) => ({
        url: `users/${userId}/posts?limit=${limit}&skip=${skip}`,
        method: 'GET',
      }),
      providesTags: (result, _error, _arg) =>
        result ? [...result.posts.map(({ id }) => ({ type: 'Post' as const, id })), 'Post'] : ['Post'],
    }),
    getPost: builder.query<Post, GetPostDTO>({
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        // Get post
        const postResult = await fetchWithBQ({ url: `posts/${arg.postId}`, method: 'GET' });
        if (postResult.error) throw postResult.error;
        const post = postResult.data as Post;

        // Get user
        const userResult = await fetchWithBQ({ url: `users/${post.userId}`, method: 'GET' });

        return userResult.data
          ? { data: { ...post, user: userResult.data as User } as Post }
          : { error: userResult.error as FetchBaseQueryError };
      },
      providesTags: (_result, _error, arg) => [{ type: 'Post', id: arg.postId }],
    }),
    createPost: builder.mutation<Post, CreatePostDTO>({
      query: (post) => ({ url: 'posts/add', method: 'POST', body: post }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation<Post, UpdatePostDTO>({
      query: (post) => ({ url: `posts/${post.id}`, method: 'PUT', body: post }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Post', id: arg.id }],
    }),
    deletePost: builder.mutation<DeletePostResponse, DeletePostDTO>({
      query: ({ id }) => ({ url: `posts/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Post', id: arg.id }],
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
