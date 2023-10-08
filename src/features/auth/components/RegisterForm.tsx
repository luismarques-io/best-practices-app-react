import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginCredentials, UserForRegistration } from '../types/auth';
import { useLoginMutation } from '../api/loginApi';
import { useRegisterMutation } from '../api/registerApi';

type RegisterFormProps = {
  onSuccess?: () => void;
  autoLoginOnSuccess?: boolean;
};

export const RegisterForm = ({ onSuccess, autoLoginOnSuccess = true }: RegisterFormProps) => {
  const [wasValidated, setWasValidated] = useState(false);
  const [formState, setFormState] = useState<UserForRegistration>({
    username: 'kminchelle',
    email: 'kminchelle@qq.com',
    password: '0lelplR',
    first_name: '',
    last_name: '',
    image: 'https://robohash.org/autquiaut.png',
    terms: false,
  });

  const [register, { isLoading: isLoadingRegister }] = useRegisterMutation();
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  const isLoading = useMemo(() => isLoadingRegister || isLoadingLogin, [isLoadingRegister, isLoadingLogin]);

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = (form: HTMLFormElement) => {
    setWasValidated(true);

    // TODO: Validate confirm_password

    return form.checkValidity();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid(event.currentTarget)) {
      return;
    }

    try {
      await register(formState).unwrap();
      if (autoLoginOnSuccess) {
        await login({ username: formState.username, password: formState.password } as LoginCredentials).unwrap();
      }
      onSuccess?.();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  return (
    <>
      <h1 className='h3 mb-3 fw-normal'>Create an account</h1>
      <form className={`needs-validation ${wasValidated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
        <div className='form-floating mb-2'>
          <input
            disabled={isLoading}
            type='text'
            className='form-control'
            placeholder='name@example.com'
            name='username'
            onChange={handleChange}
            required
            value={formState.username || ''}
          />
          <label>Username *</label>
          <div className='invalid-feedback'>Valid username is required.</div>
        </div>

        <div className='form-floating mb-2'>
          <input
            disabled={isLoading}
            type='email'
            className='form-control'
            placeholder='name@example.com'
            name='email'
            onChange={handleChange}
            required
            value={formState.email || ''}
          />
          <label>Email *</label>
          <div className='invalid-feedback'>Valid e-mail address is required.</div>
        </div>

        <div className='form-floating mb-2'>
          <input
            disabled={isLoading}
            type='url'
            className='form-control'
            placeholder=''
            name='image'
            onChange={handleChange}
            value={formState.image || ''}
          />
          <label>Photo (URL)</label>
          <div className='invalid-feedback'>Photo URL has to be valid.</div>
        </div>

        <div className='row g-sm-2'>
          <div className='col-sm-6'>
            <div className='form-floating mb-2'>
              <input
                disabled={isLoading}
                type='text'
                className='form-control'
                placeholder='First name'
                name='first_name'
                onChange={handleChange}
                value={formState.first_name || ''}
              />
              <label>First name</label>
            </div>
          </div>

          <div className='col-sm-6'>
            <div className='form-floating mb-2'>
              <input
                disabled={isLoading}
                type='text'
                className='form-control'
                placeholder='Last name'
                name='last_name'
                onChange={handleChange}
                value={formState.last_name || ''}
              />
              <label>Last name</label>
            </div>
          </div>
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
