import { useCallback } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from '../../../lib/useForm';
import { getErrorMessage } from '../../../api/utils';
import { LoginCredentials } from '../types/auth';
import { useLoginMutation } from '../api/loginApi';
import { rememberAuth } from '../stores/authSlice';
import { useAppDispatch } from '../../../hooks/store';

type useLoginUserProps = {
  schema: yup.ObjectSchema<LoginCredentials>;
  defaultValues: LoginCredentials;
  onSuccess?: () => void;
};

export const useLoginUser = ({ schema, defaultValues, onSuccess }: useLoginUserProps) => {
  const dispatch = useAppDispatch();
  const useFormApi = useForm<LoginCredentials>({ resolver: yupResolver(schema), defaultValues });
  const { handleSubmit, formState } = useFormApi;
  const [userLogin, mutationState] = useLoginMutation();

  const onSubmit = useCallback(
    handleSubmit(async ({ remember, ...formState }) => {
      try {
        dispatch(rememberAuth(remember || false));
        await userLogin(formState).unwrap();
        onSuccess?.();
      } catch (err) {
        useFormApi.setError('root.serverError', { message: getErrorMessage(err) });
      }
    }),
    [handleSubmit, useFormApi.setError, getErrorMessage, userLogin, onSuccess]
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
