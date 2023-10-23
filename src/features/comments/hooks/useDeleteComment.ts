import { useCallback } from 'react';
import { useDeleteCommentMutation } from '../api/commentsApi';
import { DeleteCommentResponse } from '../types';

type useDeleteCommentProps = {
  id: string;
  onSuccess?: (payload: DeleteCommentResponse) => void;
  onFail?: (error: unknown) => void;
};

export const useDeleteComment = ({ id, onSuccess, onFail }: useDeleteCommentProps) => {
  const [deleteComment, mutationState] = useDeleteCommentMutation();

  const deleteCommentHandler = useCallback(async () => {
    try {
      const payload = await deleteComment({ id }).unwrap();
      onSuccess?.(payload);
    } catch (err) {
      onFail?.(err);
    }
  }, [deleteComment, id, onSuccess, onFail]);

  return { deleteCommentHandler, mutationState };
};
