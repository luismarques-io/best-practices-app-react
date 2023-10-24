import { useAuth } from './useAuth';

export const useIsCurrentUser = (userId: string) => {
  const { user: currentUser } = useAuth();
  return currentUser?.id === userId;
};
