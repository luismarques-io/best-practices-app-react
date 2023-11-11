import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from '../../../lib/useForm';
import { UserSettingsEditor } from '../types/settings';
import { useCallback, useEffect } from 'react';
import { getErrorMessage } from '../../../api/utils';
import { useLazyGetAuthUserByIdQuery, useUpdateProfileMutation } from '../api/userApi';

type useUpdateSettingsProps = {
  userId: string;
  schema: yup.ObjectSchema<UserSettingsEditor>;
};

export const useUpdateSettings = ({ userId, schema }: useUpdateSettingsProps) => {
  const [GetUserById, queryResult] = useLazyGetAuthUserByIdQuery();
  const getDefaultValues = async () => {
    try {
      const { password: _password, ...user } = await GetUserById({ userId }).unwrap();
      return user;
    } catch (err) {
      useFormApi.setError('root.serverError', { message: getErrorMessage(err) });
      return { email: '' };
    }
  };

  const useFormApi = useForm<UserSettingsEditor>({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValues,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const { handleSubmit, formState } = useFormApi;

  const [updateProfile, mutationState] = useUpdateProfileMutation();

  const onSubmit = useCallback(
    handleSubmit(async (formState) => {
      try {
        await updateProfile({ id: userId, ...formState }).unwrap();
      } catch (err) {
        useFormApi.setError('root.serverError', { message: getErrorMessage(err) });
      }
    }),
    [handleSubmit, useFormApi.setError, getErrorMessage, updateProfile, userId]
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

  const isQueryLoading =
    (queryResult.isLoading || queryResult.isFetching || queryResult.isUninitialized) && !mutationState.isSuccess;

  return {
    useFormApi,
    mutationState,
    queryResult,
    onSubmit,
    register: useFormApi.register,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    isSuccess: mutationState.isSuccess,
    isQueryLoading,
    queryError: queryResult.error ? getErrorMessage(queryResult.error) : '',
  };
};
