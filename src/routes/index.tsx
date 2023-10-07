import { useRoutes } from 'react-router-dom';
import { useAuth } from '../features/auth';

import { commonRoutes } from './common';
import { publicRoutes } from './public';
import { protectedRoutes } from './protected';

export const AppRoutes = () => {
  const auth = useAuth();

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return element;
};
