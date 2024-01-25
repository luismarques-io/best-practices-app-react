import { useCallback } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Post, PostForEditor } from '../types';
import { useForm } from '@/lib/useForm';
import { getErrorMessage } from '@/api/utils';
import { useCreatePostMutation, useUpdatePostMutation } from '../api/postApi';

type useUpdatePostEditorProps = {
  postId?: string;
  userId: string;
  schema: yup.ObjectSchema<PostForEditor>;
  defaultValues?: PostForEditor;
  onSuccess?: (payload: Post) => void;
};

export const useUpdatePostEditor = ({ postId, userId, schema, defaultValues, onSuccess }: useUpdatePostEditorProps) => {
  const useFormApi = useForm<PostForEditor>({ resolver: yupResolver(schema), defaultValues });
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const handleSubmit = useCallback(
    useFormApi.handleSubmit(async (payload) => {
      try {
        if (!postId) {
          const result = await createPost({ ...payload, userId }).unwrap();
          onSuccess?.(result);
        } else {
          const result = await updatePost({ ...payload, id: postId }).unwrap();
          onSuccess?.(result);
        }
      } catch (err) {
        useFormApi.setError('root.serverError', { message: getErrorMessage(err) });
      }
    }),
    [useFormApi.handleSubmit, useFormApi.setError, getErrorMessage, onSuccess]
  );

  return {
    useFormApi,
    handleSubmit,
    register: useFormApi.register,
    errors: useFormApi.formState.errors,
    isSubmitting: useFormApi.formState.isSubmitting,
  };
};
