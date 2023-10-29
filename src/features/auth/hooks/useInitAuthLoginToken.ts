import { useEffect } from 'react';
import { useLoginTokenMutation } from '../api/loginApi';

import storage from '../../../utils/storage';

export const useInitAuthLoginToken = () => {
  const token = storage.getToken();
  const [loginToken, { isUninitialized, isLoading }] = useLoginTokenMutation();

  useEffect(() => {
    if (token) {
      loginToken({ token });
    }
  }, []);

  if (!token) {
    return { isLoading: false };
  }
  return { isLoading: isUninitialized ? true : isLoading };
};
