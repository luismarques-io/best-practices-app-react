import { useMemo } from 'react';
import { useAppSelector } from '../../../hooks/store';
import { selectCurrentUser } from '../stores/authSlice';
import { useLazyGetUserQuery } from '../api/getUserApi';

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.id;

  const [getUser, refetchUserResult] = useLazyGetUserQuery();
  const refetchUser = () =>
    user
      ? getUser({ userId: user.id })
      : { isUninitialized: false, isLoading: false, isFetching: false, isSuccess: false, isError: false };

  return useMemo(
    () => ({ user, userId, refetchUser, refetchUserResult }),
    [user, userId, refetchUser, refetchUserResult]
  );
};
