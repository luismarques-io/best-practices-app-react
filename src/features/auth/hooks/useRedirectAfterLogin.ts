import { useNavigate, useSearchParams } from 'react-router-dom';

export const useRedirectAfterLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const redirectAfterLogin = () => {
    navigate(redirect);
  };

  return redirectAfterLogin;
};
