import { useEffect } from 'react';
import { useLoginTokenMutation } from '../services/authService';

import storage from '../../../utils/storage';

export const useInitAuthLoginToken = () => {
  const token = storage.getToken();
  if (!token) {
    return { loading: false };
  }

  const [loginToken, { isLoading, isUninitialized }] = useLoginTokenMutation();

  useEffect(() => {
    loginToken({ token });
  }, []);

  return { loading: isUninitialized ? true : isLoading };
};
