import { api } from '../../../api/api';
import { Comment, CommentsResponse, CreateCommentDTO, GetCommentsDTO } from '../types';

export const commentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<CommentsResponse, GetCommentsDTO>({
      query: ({ postId, limit = 10, skip = 0 }) => ({
        url: `comments/post/${postId}?limit=${limit}&skip=${skip}`,
        method: 'GET',
      }),
      providesTags: ['Comments'],
    }),
    createComment: builder.mutation<Comment, CreateCommentDTO>({
      query: (comment) => ({ url: 'comments/add', method: 'POST', body: comment }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation } = commentsApi;
