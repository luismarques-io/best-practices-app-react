import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { LoginCredentials, User } from '../types/auth';
import { InputField } from '@/components/Form';
import { useLoginUser } from '../hooks/useLoginUser';

const schema: yup.ObjectSchema<LoginCredentials> = yup.object({
  username: yup.string().required('Valid username is required'),
  password: yup.string().required('Password is required'),
  remember: yup.boolean(),
});

type LoginFormProps = { onSuccess?: (user: User) => void };

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  // Demo data
  const defaultValues = {
    username: 'kminchelle',
    password: '0lelplR',
  };

  const { onSubmit, register, errors, isSubmitting } = useLoginUser({
    schema,
    defaultValues,
    onSuccess,
  });

  return (
    <>
      <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>
      <form onSubmit={onSubmit}>
        <InputField
          {...register('username')}
          invalidFeedback={errors.username?.message}
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          disabled={isSubmitting}
          type='text'
          placeholder='Username *'
          label='Username *'
        />

        <InputField
          {...register('password')}
          invalidFeedback={errors.password?.message}
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          disabled={isSubmitting}
          type='password'
          placeholder='Password'
          label='Password *'
        />

        <div className='form-check text-start my-3'>
          <input
            {...register('remember')}
            className={`form-check-input ${errors.remember ? 'is-invalid' : ''}`}
            disabled={isSubmitting}
            id='checkbox-remember'
            type='checkbox'
            name='remember'
          />
          <label className='form-check-label' htmlFor='checkbox-remember'>
            Keep me logged-in
          </label>
        </div>

        <button className='btn btn-primary w-100 py-2 mt-2' type='submit' disabled={isSubmitting}>
          Submit
        </button>

        {errors.root?.serverError ? (
          <div className='alert alert-danger mt-2'>{errors.root.serverError.message}</div>
        ) : null}
      </form>

      <p className='mt-5 text-center'>
        <Link to='/register'>Don't have an account yet?</Link>
      </p>
    </>
  );
};
