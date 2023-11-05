import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { User, UserForRegistration } from '../types/auth';
import { InputField } from '../../../components/Form';
import { useRegisterUser } from '../hooks/useRegisterUser';

const schema: yup.ObjectSchema<UserForRegistration> = yup.object({
  username: yup.string().required('Valid username is required'),
  email: yup.string().email('E-mail address has to be valid').required('Valid e-mail address is required'),
  firstName: yup.string(),
  lastName: yup.string(),
  gender: yup.string().oneOf(['male', 'female', 'other']),
  image: yup.string().url('URL of profile picture has to be valid'),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  terms: yup.boolean().required().oneOf([true], 'You have to accept the terms'),
});

type RegisterFormProps = {
  onSuccess?: (user: User) => void;
  autoLoginOnSuccess?: boolean;
};

export const RegisterForm = ({ onSuccess, autoLoginOnSuccess = true }: RegisterFormProps) => {
  // Demo data
  const defaultValues = {
    username: 'kminchelle',
    email: 'kminchelle@qq.com',
    password: '0lelplR',
    passwordConfirmation: '0lelplR',
    firstName: 'Jeanne',
    lastName: 'Halvorson',
    image: 'https://robohash.org/autquiaut.png',
    terms: false,
  };

  const { onSubmit, register, errors, isSubmitting, isSuccess } = useRegisterUser({
    autoLoginOnSuccess,
    schema,
    defaultValues,
    onSuccess,
  });

  return (
    <>
      <h1 className='h3 mb-3 fw-normal'>Create an account</h1>
      <form onSubmit={onSubmit}>
        <InputField
          {...register('username')}
          invalidFeedback={errors.username?.message}
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          disabled={isSubmitting}
          type='text'
          label='Username *'
          placeholder='Username *'
        />
        <InputField
          {...register('email')}
          invalidFeedback={errors.email?.message}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          disabled={isSubmitting}
          type='email'
          placeholder='name@example.com'
          label='Email *'
        />
        <InputField
          {...register('image')}
          invalidFeedback={errors.image?.message}
          className={`form-control ${errors.image ? 'is-invalid' : ''}`}
          disabled={isSubmitting}
          type='url'
          placeholder='URL of profile picture'
          label='URL of profile picture'
        />
        <div className='row g-sm-2'>
          <div className='col-sm-6'>
            <InputField
              {...register('firstName')}
              invalidFeedback={errors.firstName?.message}
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              disabled={isSubmitting}
              type='text'
              placeholder='First name'
              label='First name'
            />
          </div>
          <div className='col-sm-6'>
            <InputField
              {...register('lastName')}
              invalidFeedback={errors.lastName?.message}
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              disabled={isSubmitting}
              type='text'
              placeholder='Last name'
              label='Last name'
            />
          </div>
        </div>
        <div className='row g-sm-2'>
          <div className='col-sm-6'>
            <InputField
              {...register('password')}
              invalidFeedback={errors.password?.message}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              disabled={isSubmitting}
              type='password'
              placeholder='Password *'
              label='Password *'
            />
          </div>
          <div className='col-sm-6'>
            <InputField
              {...register('passwordConfirmation')}
              invalidFeedback={errors.passwordConfirmation?.message}
              className={`form-control ${errors.passwordConfirmation ? 'is-invalid' : ''}`}
              disabled={isSubmitting}
              type='password'
              placeholder='Password confirmation *'
              label='Password confirmation *'
            />
          </div>
        </div>
        <div className='form-check text-start my-3'>
          <input
            {...register('terms')}
            className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
            disabled={isSubmitting}
            id='checkbox-terms'
            type='checkbox'
            name='terms'
          />
          <label className='form-check-label' htmlFor='checkbox-terms'>
            I have read and understood the <Link to='#'>Terms of Use</Link>
          </label>
        </div>

        <button className='btn btn-primary w-100 py-2 mt-2' type='submit' disabled={isSubmitting}>
          Submit
        </button>

        {isSuccess ? (
          <div className='alert alert-success mt-2'>Account created successfully! (not actually, just a demo)</div>
        ) : null}
        {errors.root?.serverError ? (
          <div className='alert alert-danger mt-2'>{errors.root.serverError.message}</div>
        ) : null}
      </form>

      <p className='mt-5 text-center'>
        <Link to='/login'>Have an account already?</Link>
      </p>
    </>
  );
};
