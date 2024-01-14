import { LoginForm, useRedirectAfterLogin } from '@/features/auth';
import { Head } from '@/components/Head/Head';

export function Login() {
  const redirectAfterLogin = useRedirectAfterLogin();

  return (
    <>
      <Head title='Login' />
      <div className='container mt-5 mb-5'>
        <div className='col-md-6 offset-md-3 col-xs-12'>
          <LoginForm onSuccess={redirectAfterLogin} />
        </div>
      </div>
    </>
  );
}
