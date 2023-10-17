import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginCredentials, UserForRegistration } from '../types/auth';
import { useLoginMutation } from '../api/loginApi';
import { useRegisterMutation } from '../api/registerApi';
import { setUpdateStarted, setUpdateComplete, selectIsLoading } from '../../users';
import { InputField } from '../../../components/Form';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';

type RegisterFormProps = {
  onSuccess?: () => void;
  autoLoginOnSuccess?: boolean;
};

export const RegisterForm = ({ onSuccess, autoLoginOnSuccess = true }: RegisterFormProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const [wasValidated, setWasValidated] = useState(false);
  const [formState, setFormState] = useState<UserForRegistration>({
    username: 'kminchelle',
    email: 'kminchelle@qq.com',
    password: '0lelplR',
    firstName: 'Jeanne',
    lastName: 'Halvorson',
    image: 'https://robohash.org/autquiaut.png',
    terms: false,
  });
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = (form: HTMLFormElement) => {
    setWasValidated(true);
    return form.checkValidity();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid(event.currentTarget)) {
      return;
    }

    try {
      dispatch(setUpdateStarted());
      await register(formState).unwrap();
      if (autoLoginOnSuccess) {
        // TODO: Use a backend that supports login on registration by returning token, instead of logging in manually in the component
        await login({ username: formState.username, password: formState.password } as LoginCredentials).unwrap();
      }
      onSuccess?.();
      dispatch(setUpdateComplete());
    } catch (err) {
      dispatch(setUpdateComplete());
      alert(JSON.stringify(err));
    }
  };

  return (
    <>
      <h1 className='h3 mb-3 fw-normal'>Create an account</h1>
      <form className={`needs-validation ${wasValidated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
        <InputField
          disabled={isLoading}
          type='text'
          className='form-control'
          placeholder=''
          name='username'
          onChange={handleChange}
          required
          value={formState.username || ''}
          label='Username *'
          invalidFeedback='Valid username is required.'
        />

        <InputField
          disabled={isLoading}
          type='email'
          className='form-control'
          placeholder='name@example.com'
          name='email'
          onChange={handleChange}
          required
          value={formState.email || ''}
          label='Email *'
          invalidFeedback='Valid e-mail address is required.'
        />

        <InputField
          disabled={isLoading}
          type='url'
          className='form-control'
          placeholder=''
          name='image'
          onChange={handleChange}
          value={formState.image || ''}
          label='URL of profile picture'
          invalidFeedback='URL of profile picture has to be valid.'
        />

        <div className='row g-sm-2'>
          <div className='col-sm-6'>
            <InputField
              disabled={isLoading}
              type='text'
              className='form-control'
              placeholder='First name'
              name='firstName'
              onChange={handleChange}
              value={formState.firstName || ''}
              label='First name'
            />
          </div>

          <div className='col-sm-6'>
            <InputField
              disabled={isLoading}
              type='text'
              className='form-control'
              placeholder='Last name'
              name='lastName'
              onChange={handleChange}
              value={formState.lastName || ''}
              label='Last name'
            />
          </div>
        </div>

        <InputField
          disabled={isLoading}
          type='password'
          className='form-control'
          placeholder='Password'
          name='password'
          onChange={handleChange}
          required
          value={formState.password || ''}
          label='Password *'
          invalidFeedback='Password is required.'
        />

        <div className='form-check text-start my-3'>
          <input
            disabled={isLoading}
            id='checkbox-terms'
            className='form-check-input'
            type='checkbox'
            name='terms'
            onChange={handleChange}
            required
            defaultChecked={formState.terms || false}
          />
          <label className='form-check-label' htmlFor='checkbox-terms'>
            I have read and understood the <Link to='#'>Terms of Use</Link>
          </label>
        </div>

        <button disabled={isLoading} className='btn btn-primary w-100 py-2 mt-2' type='submit'>
          Submit
        </button>
      </form>

      <p className='mt-5 text-center'>
        <Link to='/login'>Have an account already?</Link>
      </p>
    </>
  );
};
