import { lazily } from 'react-lazily';
import { Navigate } from 'react-router-dom';
import { Settings } from '../pages/Settings/Settings';

const { Profile } = lazily(() => import('../pages/Profile/Profile'));

export const protectedRoutes = (isLoggedIn: boolean) => [
  { path: '/profile', element: isLoggedIn ? <Profile /> : <Navigate to='/login' replace /> },
  { path: '/settings', element: isLoggedIn ? <Settings /> : <Navigate to='/login' replace /> },
];
