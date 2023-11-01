import { useEffect } from 'react';
import { useLoginTokenMutation } from '../api/loginApi';

import storage from '../../../utils/storage';

export const useInitAuth = () => {
  const token = storage.getToken();
  const [loginToken, { isUninitialized, isLoading, isSuccess, isError }] = useLoginTokenMutation();

  useEffect(() => {
    if (token) {
      loginToken({ token });
    }
  }, []);

  if (!token) {
    return { isLoading, isSuccess, isError };
  }
  return { isLoading: isUninitialized ? true : isLoading, isSuccess, isError };
};
