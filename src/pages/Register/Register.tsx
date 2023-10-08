import { useNavigate } from 'react-router-dom';
import { Head } from '../../components/Head/Head';
import { RegisterForm } from '../../features/auth';

export function Register() {
  const navigate = useNavigate();

  return (
    <>
      <Head title='Register' />
      <div className='container mt-5 mb-5'>
        <div className='col-md-6 offset-md-3 col-xs-12'>
          <RegisterForm onSuccess={() => navigate('/')} autoLoginOnSuccess={true} />
        </div>
      </div>
    </>
  );
}
