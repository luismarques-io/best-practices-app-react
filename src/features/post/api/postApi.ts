import { api } from '../../../api/api';
import { User } from '../../auth';
import { Post, CreatePostDTO, UpdatePostDTO, GetPostDTO } from '../types/post';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const postEditorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<Post, CreatePostDTO>({
      query: (post) => ({ url: 'posts/add', method: 'POST', body: post }),
    }),
    updatePost: builder.mutation<Post, UpdatePostDTO>({
      query: (post) => ({ url: `posts/${post.id}`, method: 'PUT', body: post }),
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
  }),
});

export const { useCreatePostMutation, useUpdatePostMutation, useGetPostQuery } = postEditorApi;
