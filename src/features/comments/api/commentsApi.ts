import { api } from '../../../api/api';
import {
  Comment,
  CommentsResponse,
  CreateCommentDTO,
  DeleteCommentDTO,
  DeleteCommentResponse,
  GetCommentsDTO,
  UpdateCommentDTO,
} from '../types';

export const commentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<CommentsResponse, GetCommentsDTO>({
      query: ({ postId, limit = 10, skip = 0 }) => ({
        url: `comments/post/${postId}?limit=${limit}&skip=${skip}`,
        method: 'GET',
      }),
      providesTags: (result, _error, _arg) =>
        result ? [...result.comments.map(({ id }) => ({ type: 'Comments' as const, id })), 'Comments'] : ['Comments'],
    }),
    createComment: builder.mutation<Comment, CreateCommentDTO>({
      query: (comment) => ({ url: 'comments/add', method: 'POST', body: comment }),
      invalidatesTags: ['Comments'],
    }),
    updateComment: builder.mutation<Comment, UpdateCommentDTO>({
      query: ({ id, ...comment }) => ({ url: `comments/${id}`, method: 'PUT', body: comment }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Comments', id: arg.id }],
    }),
    deleteComment: builder.mutation<DeleteCommentResponse, DeleteCommentDTO>({
      query: ({ id }) => ({ url: `comments/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Comments', id: arg.id }],
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } =
  commentsApi;
