import { useMemo } from 'react';
import { useAppSelector } from '../../../hooks/store';
import { selectCurrentUser } from '../stores/authSlice';
import { useLazyGetUserQuery } from '../api/getUserApi';

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);

  const [getUser, refetchUserResult] = useLazyGetUserQuery();
  const refetchUser = () =>
    user
      ? getUser({ userId: user.id })
      : { isUninitialized: false, isLoading: false, isFetching: false, isSuccess: false, isError: false };

  return useMemo(() => ({ user, refetchUser, refetchUserResult }), [user, refetchUser, refetchUserResult]);
};
