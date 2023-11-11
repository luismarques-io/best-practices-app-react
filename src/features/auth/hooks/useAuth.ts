import { useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/store';
import { selectCurrentUser, logout as _logout } from '../stores/authSlice';

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.id;

  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    dispatch(_logout());
  }, [dispatch]);

  return useMemo(() => ({ user, userId, logout }), [user, userId, logout]);
};
