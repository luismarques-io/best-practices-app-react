// import { useEffect, useState, useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../auth';
import { InputField } from '../../../components/Form';
import { setUserSettings, updateField, setUpdateStarted, setUpdateComplete } from '../stores/settingsSlice';
import { SettingsState } from '../types/settings';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { selectUserSettings, selectIsLoading } from '../stores/settingsSlice';
import { useUpdateProfileMutation } from '../api/updateProfile';

export const SettingsForm = () => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(selectUserSettings);
  const isLoading = useAppSelector(selectIsLoading);
  const { user, refetchUser } = useAuth();
  const [wasValidated, setWasValidated] = useState(false);
  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (user) {
      dispatch(setUserSettings(user));
    }
  }, [user]);

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateField({ name: name as keyof SettingsState['user'], value }));
  };

  const isFormValid = (form: HTMLFormElement) => {
    setWasValidated(true);
    return form.checkValidity();
  };

  const clearValidation = () => {
    setWasValidated(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid(event.currentTarget)) {
      return;
    }

    try {
      dispatch(setUpdateStarted());
      await updateProfile(formState).unwrap();
      await refetchUser();
      clearValidation();
      dispatch(setUpdateComplete());
      alert('Settings updated!');
    } catch (err) {
      dispatch(setUpdateComplete());
      alert(JSON.stringify(err));
    }
  };

  return (
    <form className={`needs-validation ${wasValidated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
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
        label='Email *'
        invalidFeedback='Valid e-mail address is required.'
        disabled={isLoading}
        type='email'
        className='form-control'
        placeholder='name@example.com'
        name='email'
        onChange={handleChange}
        required
        value={formState.email || ''}
      />

      <InputField
        disabled={isLoading}
        type='password'
        className='form-control'
        placeholder='Password'
        name='password'
        onChange={handleChange}
        value={formState.password || ''}
        label='Password'
      />

      <button disabled={isLoading} className='btn btn-primary py-2 mt-2' type='submit'>
        Update Settings
      </button>
    </form>
  );
};
