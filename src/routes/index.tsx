import { useRoutes } from 'react-router-dom';
import { useAuth } from '../features/auth';

import { commonRoutes } from './common';
import { publicRoutes } from './public';
import { protectedRoutes } from './protected';

export const AppRoutes = () => {
  const { user } = useAuth();

  const routes = [...protectedRoutes({ user }), ...publicRoutes({ user }), ...commonRoutes()];

  const element = useRoutes(routes);

  return element;
};
