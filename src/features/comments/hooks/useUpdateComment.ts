import { useForm, useValidationClass } from '../../../lib/useForm';
import { Comment, CommentEditorState } from '../types';
import { useUpdateCommentMutation } from '../api/commentsApi';
import { useCallback } from 'react';

type useUpdateCommentProps = {
  commentId: string;
  defaultValues?: CommentEditorState;
  onSuccess?: (payload: Comment) => void;
  onFail?: (error: unknown) => void;
};

export const useUpdateComment = ({ commentId, defaultValues, onSuccess, onFail }: useUpdateCommentProps) => {
  const useFormApi = useForm<CommentEditorState>({ defaultValues });
  const { handleSubmit, formState } = useFormApi;
  const getValidationClass = useValidationClass(formState);

  const [updateComment, mutationState] = useUpdateCommentMutation();

  const onSubmitHandler = useCallback(
    handleSubmit(async (data) => {
      try {
        const payload = await updateComment({ id: commentId, body: data.body }).unwrap();
        onSuccess?.(payload);
      } catch (err) {
        onFail?.(err);
      }
    }),
    [handleSubmit, updateComment, commentId, onSuccess, onFail]
  );

  return { onSubmitHandler, getValidationClass, useFormApi, mutationState };
};
