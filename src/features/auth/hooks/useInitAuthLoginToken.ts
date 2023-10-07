import { useEffect } from 'react';
import { useLoginTokenMutation } from '../services/authService';

export const useInitAuthLoginToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { loading: false };
  }

  const [loginToken, { isLoading, isUninitialized }] = useLoginTokenMutation();

  useEffect(() => {
    loginToken({ token });
  }, []);

  return { loading: isUninitialized ? true : isLoading };
};
