import { useMemo } from 'react';
import { useAppSelector } from '../../../hooks/store';
import { selectCurrentUser } from '../stores/authSlice';

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.id;

  return useMemo(() => ({ user, userId }), [user, userId]);
};
