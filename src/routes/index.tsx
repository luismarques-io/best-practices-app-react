import { useRoutes } from 'react-router-dom';
import { useAuth } from '../features/auth';

import { commonRoutes } from './common';
import { publicRoutes } from './public';
import { protectedRoutes } from './protected';

export const AppRoutes = () => {
  const auth = useAuth();
  const isLoggedIn = !!auth.user;

  const routes = [...protectedRoutes(isLoggedIn), ...publicRoutes(isLoggedIn), ...commonRoutes()];

  const element = useRoutes(routes);

  return element;
};
