import { useCallback } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostForEditor } from '../types';
import { useForm } from '../../../lib/useForm';
import { getErrorMessage } from '../../../api/utils';

type useUpdatePostEditorProps = {
  schema: yup.ObjectSchema<PostForEditor>;
  defaultValues?: PostForEditor;
  onSubmit: (payload: PostForEditor) => void;
};

export const useUpdatePostEditor = ({ schema, defaultValues, onSubmit }: useUpdatePostEditorProps) => {
  const useFormApi = useForm<PostForEditor>({ resolver: yupResolver(schema), defaultValues });

  const handleSubmit = useCallback(
    useFormApi.handleSubmit(async (payload) => {
      try {
        await onSubmit(payload);
      } catch (err) {
        useFormApi.setError('root.serverError', { message: getErrorMessage(err) });
      }
    }),
    [useFormApi.handleSubmit, useFormApi.setError, getErrorMessage, onSubmit]
  );

  return {
    useFormApi,
    handleSubmit,
    register: useFormApi.register,
    errors: useFormApi.formState.errors,
    isSubmitting: useFormApi.formState.isSubmitting,
  };
};
