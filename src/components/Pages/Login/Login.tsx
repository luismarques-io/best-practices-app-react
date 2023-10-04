import { useState } from 'react';
import { Link } from 'react-router-dom';

const defaultFormFields = {
  email: '',
  password: '',
  remember: false,
};

export function Login() {
  const [wasValidated, setWasValidated] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, remember } = formFields;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWasValidated(true);

    try {
      // eslint-disable-next-line no-console
      console.log('submit', formFields);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('user sign in failed', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setFormFields({ ...formFields, [name]: type === 'checkbox' ? event.target.checked : value });
  };

  return (
    <div className='container mt-5 mb-5'>
      <div className='col-md-6 offset-md-3 col-xs-12'>
        <form className={`needs-validation ${wasValidated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
          <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>

          <div className='form-floating mb-2'>
            <input
              type='email'
              className='form-control'
              placeholder='name@example.com'
              name='email'
              value={email}
              onChange={handleChange}
              required
            />
            <label>Email *</label>
            <div className='invalid-feedback'>E-mail address is required.</div>
          </div>
          <div className='form-floating mb-2'>
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              name='password'
              value={password}
              onChange={handleChange}
              required
            />
            <label>Password *</label>
            <div className='invalid-feedback'>Password is required.</div>
          </div>

          <div className='form-check text-start my-3'>
            <input
              id='checkbox-remember'
              className='form-check-input'
              type='checkbox'
              name='remember'
              defaultChecked={remember}
              onChange={handleChange}
            />
            <label className='form-check-label' htmlFor='checkbox-remember'>
              Keep me logged-in
            </label>
          </div>

          <button className='btn btn-primary w-100 py-2' type='submit'>
            Submit
          </button>
        </form>

        <p className='mt-5 text-center'>
          <Link to='/register'>Don't have an account yet?</Link>
        </p>
      </div>
    </div>
  );
}
