import { Link } from 'react-router-dom';

export const RegisterForm = () => {
  return (
    <>
      <form className={`needs-validation`} noValidate>
        <h1 className='h3 mb-3 fw-normal'>Create an account</h1>

        <div className='form-floating mb-2'>
          <input
            // disabled={signingUp}
            type='email'
            className='form-control'
            placeholder='name@example.com'
            name='email'
            // value={user.email || ''}
            // onChange={handleChange}
            required
          />
          <label>Email *</label>
          <div className='invalid-feedback'>Valid e-mail address is required.</div>
        </div>

        <div className='row g-sm-2'>
          <div className='col-sm-6'>
            <div className='form-floating mb-2'>
              <input
                // disabled={signingUp}
                type='text'
                className='form-control'
                placeholder='First name'
                name='firstName'
                // value={user.firstName || ''}
                // onChange={handleChange}
              />
              <label>First name</label>
            </div>
          </div>

          <div className='col-sm-6'>
            <div className='form-floating mb-2'>
              <input
                // disabled={signingUp}
                type='text'
                className='form-control'
                placeholder='Last name'
                name='lastName'
                // value={user.lastName || ''}
                // onChange={handleChange}
              />
              <label>Last name</label>
            </div>
          </div>
        </div>

        <div className='row g-sm-2'>
          <div className='col-sm-6'>
            <div className='form-floating mb-2'>
              <input
                // disabled={signingUp}
                type='password'
                className='form-control'
                placeholder='Password'
                name='password'
                // value={user.password || ''}
                // onChange={handleChange}
                required
              />
              <label>Password *</label>
              <div className='invalid-feedback'>Password is required.</div>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='form-floating mb-2'>
              <input
                // disabled={signingUp}
                type='password'
                className='form-control'
                placeholder='Retype Password'
                name='passwordConfirmation'
                // value={user.passwordConfirmation || ''}
                // onChange={handleChange}
                required
              />
              <label>Retype Password *</label>
              <div className='invalid-feedback'>Retype Password is required.</div>
            </div>
          </div>
        </div>

        <div className='form-check text-start my-3'>
          <input
            // disabled={signingUp}
            id='checkbox-terms'
            className='form-check-input'
            type='checkbox'
            name='terms'
            // defaultChecked={user.terms}
            // onChange={handleChange}
            required
          />
          <label className='form-check-label' htmlFor='checkbox-terms'>
            I have read and understood the <Link to='#'>Terms of Use</Link>
          </label>
        </div>

        <button
          // disabled={signingUp}
          className='btn btn-primary w-100 py-2 mt-2'
          type='submit'
        >
          Submit
        </button>
      </form>

      <p className='mt-5 text-center'>
        <Link to='/login'>Have an account already?</Link>
      </p>
    </>
  );
};
