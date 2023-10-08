import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../../features/auth';
import { Head } from '../../components/Head/Head';

export function Login() {
  const navigate = useNavigate();

  return (
    <>
      <Head title='Login' />
      <div className='container mt-5 mb-5'>
        <div className='col-md-6 offset-md-3 col-xs-12'>
          <LoginForm onSuccess={() => navigate('/')} />
        </div>
      </div>
    </>
  );
}
