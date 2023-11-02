import { useAuth } from './useAuth';

export const useIsCurrentUser = (userId: string | undefined) => {
  const { user } = useAuth();
  return Boolean(userId && user && user.id === userId);
};
