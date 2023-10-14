import { lazily } from 'react-lazily';
import { Navigate } from 'react-router-dom';

const { Profile } = lazily(() => import('../pages/Profile/Profile'));
const { Settings } = lazily(() => import('../pages/Settings/Settings'));
const { Posts } = lazily(() => import('../pages/Posts/Posts'));

export const protectedRoutes = (isLoggedIn: boolean) => [
  { path: '/profile', element: isLoggedIn ? <Profile /> : <Navigate to='/login' replace /> },
  { path: '/settings', element: isLoggedIn ? <Settings /> : <Navigate to='/login' replace /> },
  { path: '/posts/*', element: isLoggedIn ? <Posts /> : <Navigate to='/login' replace /> },
];
