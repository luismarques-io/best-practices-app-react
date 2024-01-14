import * as yup from 'yup';
import { useAuth } from '@/features/auth';
import { InputField } from '@/components/Form';
import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { UserSettingsEditor } from '../types/settings';
import { useUpdateSettings } from '../hooks/useUpdateSettings';

const schema: yup.ObjectSchema<UserSettingsEditor> = yup.object({
  email: yup.string().email('E-mail address has to be valid').required('Valid e-mail address is required'),
  firstName: yup.string(),
  lastName: yup.string(),
  image: yup.string().url('URL of profile picture has to be valid'),
  password: yup.string(),
});

export const SettingsForm = () => {
  const { userId = '' } = useAuth();
  const { onSubmit, register, errors, isSubmitting, isSuccess, isQueryLoading, queryError } = useUpdateSettings({
    userId,
    schema,
  });

  if (queryError) {
    return <div className='alert alert-danger mt-3'>{queryError}</div>;
  }

  if (isQueryLoading) {
    return <PageSpinner />;
  }

  return (
    <form onSubmit={onSubmit}>
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
        {...register('password')}
        invalidFeedback={errors.password?.message}
        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
        disabled={isSubmitting}
        type='password'
        placeholder='Password'
        label='Password'
      />

      <button disabled={isSubmitting} className='btn btn-primary py-2 mt-2' type='submit'>
        Update Settings
      </button>

      {errors.root?.serverError ? (
        <div className='alert alert-danger mt-3'>{errors.root.serverError.message}</div>
      ) : null}
      {isSuccess ? <div className='alert alert-success mt-3'>Saved! (not actually, just a demo)</div> : null}
    </form>
  );
};
