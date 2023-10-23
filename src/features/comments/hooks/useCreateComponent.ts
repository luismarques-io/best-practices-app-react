import { useForm } from '../../../lib/useForm';
import { Comment, CommentEditorState } from '../types';
import { useCreateCommentMutation } from '../api/commentsApi';
import { useCallback, useEffect } from 'react';
import { getErrorMessage } from '../../../api/utils';

type useCreateCommentProps = {
  postId: string;
  userId: string;
  onSuccess?: (payload: Comment) => void;
  onFail?: (error: unknown) => void;
};

export const useCreateComment = ({ postId, userId, onSuccess, onFail }: useCreateCommentProps) => {
  const useFormApi = useForm<CommentEditorState>();
  const { handleSubmit, setError, reset, formState } = useFormApi;
  const { isSubmitSuccessful } = formState;

  const [createComment] = useCreateCommentMutation();

  const onSubmitHandler = useCallback(
    handleSubmit(async ({ body }) => {
      try {
        const payload = await createComment({ postId, userId, body }).unwrap();
        onSuccess?.(payload);
      } catch (err) {
        setError('root.serverError', {
          message: getErrorMessage(err),
        });
        onFail?.(err);
      }
    }),
    [handleSubmit, setError, createComment, postId, userId, onSuccess, onFail]
  );

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return { onSubmitHandler, useFormApi };
};
