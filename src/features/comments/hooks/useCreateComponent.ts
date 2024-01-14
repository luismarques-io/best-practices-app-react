import { useCallback, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from '@/lib/useForm';
import { useCreateCommentMutation } from '../api/commentsApi';
import { getErrorMessage } from '@/api/utils';
import { CommentEditorState } from '../types';

type useCreateCommentProps = {
  postId: string;
  userId: string;
  schema: yup.ObjectSchema<CommentEditorState>;
};

export const useCreateComment = ({ postId, userId, schema }: useCreateCommentProps) => {
  const useFormApi = useForm<CommentEditorState>({ resolver: yupResolver(schema) });
  const { handleSubmit, formState } = useFormApi;

  const [createComment, mutationState] = useCreateCommentMutation();

  const onSubmit = useCallback(
    handleSubmit(async ({ body }) => {
      try {
        await createComment({ postId, userId, body }).unwrap();
      } catch (err) {
        useFormApi.setError('root.serverError', { message: getErrorMessage(err) });
      }
    }),
    [handleSubmit, useFormApi.setError, getErrorMessage, createComment, postId, userId]
  );

  const handleSuccessfulSubmit = () => {
    if (formState.isSubmitSuccessful) {
      useFormApi.reset();
    }
  };

  const handleTypingAfterSuccess = () => {
    if (formState.isDirty && !mutationState.isUninitialized) {
      mutationState.reset();
    }
  };

  useEffect(handleSuccessfulSubmit, [formState.isSubmitSuccessful]);
  useEffect(handleTypingAfterSuccess, [formState.isDirty]);

  return {
    useFormApi,
    mutationState,
    onSubmit,
    register: useFormApi.register,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    isSuccess: mutationState.isSuccess,
  };
};
