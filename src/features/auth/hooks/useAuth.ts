import { useMemo } from 'react';
import { useAppSelector } from '../../../hooks/store';
import { selectCurrentUser } from '../stores/authSlice';
import { useLazyRefetchUserQuery } from '../api/userApi';

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);

  const [_refetchUser, refetchUserResult] = useLazyRefetchUserQuery();
  const refetchUser = () =>
    user
      ? _refetchUser({ userId: user.id })
      : { isUninitialized: false, isLoading: false, isFetching: false, isSuccess: false, isError: false };

  return useMemo(() => ({ user, refetchUser, refetchUserResult }), [user, refetchUser, refetchUserResult]);
};
