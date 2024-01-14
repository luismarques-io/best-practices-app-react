import { useCallback } from 'react';
import { useDeletePostMutation } from '../api/postApi';
import { DeletePostResponse } from '../types';
import { getErrorMessage } from '@/api/utils';

type useDeletePostProps = {
  postId: string;
  onSuccess?: (payload: DeletePostResponse) => void;
  onFail?: (error: string) => void;
};

export const useDeletePost = ({ postId, onSuccess, onFail }: useDeletePostProps) => {
  const [deletePost, mutationState] = useDeletePostMutation();

  const handleDeletePost = useCallback(async () => {
    try {
      const payload = await deletePost({ id: postId }).unwrap();
      onSuccess?.(payload);
    } catch (err) {
      onFail?.(getErrorMessage(err));
    }
  }, [deletePost, getErrorMessage, postId, onSuccess, onFail]);

  const isLoading = mutationState.isLoading;
  const error = mutationState.error ? getErrorMessage(mutationState.error) : undefined;

  return { handleDeletePost, mutationState, isLoading, error };
};
