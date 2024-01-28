import { useCallback } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from '@/lib/useForm';
import { getErrorMessage } from '@/api/utils';
import { useRegisterMutation } from '../api/registerApi';
import { LoginCredentials, User, UserForRegistration } from '../types/auth';
import { useLoginMutation } from '../api/loginApi';

type useRegisterUserProps = {
  autoLoginOnSuccess: boolean;
  schema: yup.ObjectSchema<UserForRegistration>;
  defaultValues?: UserForRegistration;
  onSuccess?: (user: User) => void;
};

export const useRegisterUser = ({ autoLoginOnSuccess, schema, defaultValues, onSuccess }: useRegisterUserProps) => {
  const useFormApi = useForm<UserForRegistration>({ resolver: yupResolver(schema), defaultValues });
  const { handleSubmit, formState } = useFormApi;
  const [userRegister, mutationState] = useRegisterMutation();
  const [userLogin] = useLoginMutation();

  const onSubmit = useCallback(
    handleSubmit(async (formState) => {
      try {
        const user = await userRegister(formState).unwrap();
        if (autoLoginOnSuccess) {
          const loggedInUser = await userLogin({
            username: formState.username,
            password: formState.password,
          } as LoginCredentials).unwrap();
          onSuccess?.(loggedInUser);
        } else {
          onSuccess?.(user);
        }
      } catch (err) {
        useFormApi.setError('root.serverError', { message: getErrorMessage(err) });
      }
    }),
    [handleSubmit, useFormApi.setError, getErrorMessage, userRegister, userLogin, onSuccess, autoLoginOnSuccess]
  );

  return {
    useFormApi,
    mutationState,
    onSubmit,
    register: useFormApi.register,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    isSuccess: mutationState.isSuccess,
  };
};
