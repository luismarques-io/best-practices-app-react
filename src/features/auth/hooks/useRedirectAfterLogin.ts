import { useNavigate, useSearchParams } from 'react-router-dom';

type useRedirectAfterLoginProps = {
  defaultUrl?: string;
};

export const useRedirectAfterLogin = ({ defaultUrl = '/' }: useRedirectAfterLoginProps = {}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') ?? defaultUrl;

  const redirectAfterLogin = () => {
    navigate(redirect);
  };

  return redirectAfterLogin;
};
