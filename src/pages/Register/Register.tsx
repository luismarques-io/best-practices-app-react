import { useLocation, useNavigate } from 'react-router-dom';
import { Head } from '../../components/Head/Head';
import { RegisterForm } from '../../features/auth';

export function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSuccessRegistration = () => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');
    navigate(redirect ? redirect : '/');
  };

  return (
    <>
      <Head title='Register' />
      <div className='container mt-5 mb-5'>
        <div className='col-md-6 offset-md-3 col-xs-12'>
          <RegisterForm onSuccess={handleSuccessRegistration} autoLoginOnSuccess={true} />
        </div>
      </div>
    </>
  );
}
