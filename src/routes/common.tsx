import { lazily } from 'react-lazily';

const { Home } = lazily(() => import('../pages/Home/Home'));
const { NotFound } = lazily(() => import('../pages/NotFound/NotFound'));

export const commonRoutes = [
  { path: '/', element: <Home /> },
  { path: '*', element: <NotFound /> },
];
