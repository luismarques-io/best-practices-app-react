import { LoginForm } from '../../features/auth';

export function Login() {
  return (
    <div className='container mt-5 mb-5'>
      <div className='col-md-6 offset-md-3 col-xs-12'>
        <LoginForm />
      </div>
    </div>
  );
}
