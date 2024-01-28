import { useAuth } from '@/features/auth';
import { useGetUserByIdQuery } from '../api/userApi';

type useProfileDetailsProps = {
  userId: string;
};

export const useProfileDetails = ({ userId }: useProfileDetailsProps) => {
  const { user: currentUser } = useAuth();
  const isCurrentUser = currentUser?.id.toString() === userId;
  const {
    data: user,
    error,
    isUninitialized,
    isLoading,
    isFetching,
  } = useGetUserByIdQuery({ userId }, { skip: !userId });

  return {
    user,
    error,
    isLoading: isUninitialized || isLoading || isFetching,
    isCurrentUser,
  };
};
