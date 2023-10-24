import { useCallback } from 'react';
import { useDeleteCommentMutation } from '../api/commentsApi';
import { DeleteCommentResponse } from '../types';
import { getErrorMessage } from '../../../api/utils';

type useDeleteCommentProps = {
  commentId: string;
  onSuccess?: (payload: DeleteCommentResponse) => void;
  onFail?: (error: string) => void;
};

export const useDeleteComment = ({ commentId, onSuccess, onFail }: useDeleteCommentProps) => {
  const [deleteComment, mutationState] = useDeleteCommentMutation();

  const handleDeleteComment = useCallback(async () => {
    try {
      const payload = await deleteComment({ id: commentId }).unwrap();
      onSuccess?.(payload);
    } catch (err) {
      onFail?.(getErrorMessage(err));
    }
  }, [deleteComment, getErrorMessage, commentId, onSuccess, onFail]);

  const isLoading = mutationState.isLoading;
  const error = mutationState.error ? getErrorMessage(mutationState.error) : undefined;

  return { handleDeleteComment, mutationState, isLoading, error };
};
