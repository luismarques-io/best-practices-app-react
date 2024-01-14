import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from '@/lib/useForm';
import { Comment, CommentEditorState } from '../types';
import { useUpdateCommentMutation } from '../api/commentsApi';
import { useCallback } from 'react';
import { getErrorMessage } from '@/api/utils';

type useUpdateCommentProps = {
  commentId: string;
  schema: yup.ObjectSchema<CommentEditorState>;
  defaultValues: CommentEditorState;
  onSuccess?: (payload: Comment) => void;
};

export const useUpdateComment = ({ commentId, schema, defaultValues, onSuccess }: useUpdateCommentProps) => {
  const useFormApi = useForm<CommentEditorState>({ resolver: yupResolver(schema), defaultValues });
  const { handleSubmit, formState } = useFormApi;

  const [updateComment, mutationState] = useUpdateCommentMutation();

  const onSubmit = useCallback(
    handleSubmit(async ({ body }) => {
      try {
        const payload = await updateComment({ id: commentId, body }).unwrap();
        onSuccess?.(payload);
      } catch (err) {
        useFormApi.setError('root.serverError', { message: getErrorMessage(err) });
      }
    }),
    [handleSubmit, useFormApi.setError, getErrorMessage, updateComment, commentId, onSuccess]
  );

  return {
    useFormApi,
    mutationState,
    onSubmit,
    register: useFormApi.register,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
  };
};
