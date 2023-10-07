import { useMemo } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrentUser } from '../state/authSlice';

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);

  return useMemo(() => ({ user }), [user]);
};
