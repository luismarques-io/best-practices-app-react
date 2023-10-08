import { useEffect } from 'react';
import { useLoginTokenMutation } from '../api/loginApi';

import storage from '../../../utils/storage';

export const useInitAuthLoginToken = () => {
  const token = storage.getToken();
  const [loginToken, { isLoading, isUninitialized }] = useLoginTokenMutation();

  useEffect(() => {
    if (token) {
      loginToken({ token });
    }
  }, []);

  if (!token) {
    return { loading: false };
  }
  return { loading: isUninitialized ? true : isLoading };
};
