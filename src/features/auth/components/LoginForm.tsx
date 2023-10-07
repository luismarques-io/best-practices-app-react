import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';

import { rememberAuth } from '../state/authSlice';
import { useLoginMutation } from '../services/authService';
import type { LoginRequest } from '../services/authService';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [wasValidated, setWasValidated] = useState(false);
  const [formState, setFormState] = React.useState<LoginRequest>({
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWasValidated(true);

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      return;
    }

    try {
      await login(formState).unwrap();
      // Being that the result is handled in extraReducers in authSlice,
      // we know that we're authenticated after this, so the user
      // and token will be present in the store
      navigate('/');
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  return (
    <>
      <form className={`needs-validation ${wasValidated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
        <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>

        <div className='form-floating mb-2'>
          <input
            disabled={isLoading}
            type='username'
            className='form-control'
            placeholder='name@example.com'
            name='username'
            onChange={handleChange}
            required
            value={formState.username || ''}
          />
          <label>Email *</label>
          <div className='invalid-feedback'>E-mail address is required.</div>
        </div>
        <div className='form-floating mb-2'>
          <input
            disabled={isLoading}
            type='password'
            className='form-control'
            placeholder='Password'
            name='password'
            onChange={handleChange}
            required
            value={formState.password || ''}
          />
          <label>Password *</label>
          <div className='invalid-feedback'>Password is required.</div>
        </div>

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
