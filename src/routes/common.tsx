import { lazily } from 'react-lazily';

const { Home } = lazily(() => import('@/pages/Home/Home'));
const { Profile } = lazily(() => import('@/pages/Profile/Profile'));
const { NotFound } = lazily(() => import('@/pages/NotFound/NotFound'));
const { Posts } = lazily(() => import('@/pages/Posts/Posts'));

export const commonRoutes = () => [
  { path: '/', element: <Home /> },
  { path: '/profile/:userId', element: <Profile /> },
  { path: '/posts/*', element: <Posts /> },
  { path: '*', element: <NotFound /> },
];
