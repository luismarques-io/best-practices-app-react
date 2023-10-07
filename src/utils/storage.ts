import { STORAGE_PREFIX } from '../config';

const storage = {
  getToken: () => {
    return atob(JSON.parse(window.localStorage.getItem(`${STORAGE_PREFIX}token`) as string));
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${STORAGE_PREFIX}token`, JSON.stringify(btoa(token)));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${STORAGE_PREFIX}token`);
  },
};

export default storage;
