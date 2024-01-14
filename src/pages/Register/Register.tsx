import { Head } from '@/components/Head/Head';
import { RegisterForm, useRedirectAfterLogin } from '@/features/auth';

export function Register() {
  const redirectAfterLogin = useRedirectAfterLogin();

  return (
    <>
      <Head title='Register' />
      <div className='container mt-5 mb-5'>
        <div className='col-md-6 offset-md-3 col-xs-12'>
          <RegisterForm onSuccess={redirectAfterLogin} autoLoginOnSuccess={true} />
        </div>
      </div>
    </>
  );
}
