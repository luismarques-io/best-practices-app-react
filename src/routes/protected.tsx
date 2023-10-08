import { lazily } from 'react-lazily';
import { Navigate } from 'react-router-dom';

const { Profile } = lazily(() => import('../pages/Profile/Profile'));

export const protectedRoutes = (isLoggedIn: boolean) => [
  { path: '/profile', element: isLoggedIn ? <Profile /> : <Navigate to='/login' replace /> },
];
