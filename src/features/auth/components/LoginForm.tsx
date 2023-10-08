import React from 'react';

import { useAppDispatch } from '../../../hooks/store';

import { rememberAuth } from '../stores/authSlice';
import { useLoginMutation } from '../api/loginApi';
import { LoginCredentials } from '../types/auth';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { InputField } from '../../../components/Form';

type LoginFormProps = {
  onSuccess?: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const dispatch = useAppDispatch();

  const [wasValidated, setWasValidated] = useState(false);
  const [formState, setFormState] = useState<LoginCredentials>({
    username: 'kminchelle',
    password: '0lelplR',
  });

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleRememberChange = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(rememberAuth(checked));
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
      await login(formState).unwrap();
      onSuccess?.();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  return (
    <>
      <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>
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
            id='checkbox-remember'
            className='form-check-input'
            type='checkbox'
            name='remember'
            // defaultChecked={formState.remember}
            onChange={handleRememberChange}
          />
          <label className='form-check-label' htmlFor='checkbox-remember'>
            Keep me logged-in
          </label>
        </div>

        <button disabled={isLoading} className='btn btn-primary w-100 py-2' type='submit'>
          Submit
        </button>
      </form>

      <p className='mt-5 text-center'>
        <Link to='/register'>Don't have an account yet?</Link>
      </p>
    </>
  );
};
