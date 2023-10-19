import { useLocation, useNavigate } from 'react-router-dom';

import { LoginForm } from '../../features/auth';
import { Head } from '../../components/Head/Head';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSuccessLogin = () => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');
    navigate(redirect ? redirect : '/');
  };

  return (
    <>
      <Head title='Login' />
      <div className='container mt-5 mb-5'>
        <div className='col-md-6 offset-md-3 col-xs-12'>
          <LoginForm onSuccess={handleSuccessLogin} />
        </div>
      </div>
    </>
  );
}
