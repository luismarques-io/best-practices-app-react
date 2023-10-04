import { useState } from 'react';
import { Link } from 'react-router-dom';

const defaultFormFields = {
  email: '',
  password: '',
  passwordConfirmation: '',
  firstName: '',
  lastName: '',
  terms: false,
};

export function Register() {
  const [wasValidated, setWasValidated] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, passwordConfirmation, firstName, lastName, terms } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWasValidated(true);

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      return;
    }

    try {
      // eslint-disable-next-line no-console
      console.log('submit', formFields);
      resetFormFields();
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
    <div className='container my-5'>
      <div className='col-md-6 offset-md-3 col-xs-12'>
        <form className={`needs-validation ${wasValidated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
          <h1 className='h3 mb-3 fw-normal'>Create an account</h1>

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
            <div className='invalid-feedback'>Valid e-mail address is required.</div>
          </div>

          <div className='row g-sm-2'>
            <div className='col-sm-6'>
              <div className='form-floating mb-2'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='First name'
                  name='firstName'
                  value={firstName}
                  onChange={handleChange}
                />
                <label>First name</label>
              </div>
            </div>

            <div className='col-sm-6'>
              <div className='form-floating mb-2'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Last name'
                  name='lastName'
                  value={lastName}
                  onChange={handleChange}
                />
                <label>Last name</label>
              </div>
            </div>
          </div>

          <div className='row g-sm-2'>
            <div className='col-sm-6'>
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
            </div>
            <div className='col-sm-6'>
              <div className='form-floating mb-2'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Retype Password'
                  name='passwordConfirmation'
                  value={passwordConfirmation}
                  onChange={handleChange}
                  required
                />
                <label>Retype Password *</label>
                <div className='invalid-feedback'>Retype Password is required.</div>
              </div>
            </div>
          </div>

          <div className='form-check text-start my-3'>
            <input
              id='checkbox-terms'
              className='form-check-input'
              type='checkbox'
              name='terms'
              defaultChecked={terms}
              onChange={handleChange}
              required
            />
            <label className='form-check-label' htmlFor='checkbox-terms'>
              I have read and understood the <Link to='#'>Terms of Use</Link>
            </label>
          </div>

          <button className='btn btn-primary w-100 py-2 mt-2' type='submit'>
            Submit
          </button>
        </form>

        <p className='mt-5 text-center'>
          <Link to='/login'>Have an account already?</Link>
        </p>
      </div>
    </div>
  );
}
