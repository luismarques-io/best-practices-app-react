import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';
import { useInitAuth } from '..';

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isLoading } = useInitAuth();

  if (isLoading) {
    return <PageSpinner />;
  }

  return <>{children}</>;
};
