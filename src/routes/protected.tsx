import { lazily } from 'react-lazily';
import { Navigate } from 'react-router-dom';
import { User } from '../features/auth';

const { Settings } = lazily(() => import('../pages/Settings/Settings'));

export const protectedRoutes = ({ user }: { user: User | null }) => [
  {
    path: '/profile',
    element: user ? (
      <Navigate to={`/profile/${user.id}`} replace />
    ) : (
      <Navigate to='/login?redirect=/profile' replace />
    ),
  },
  { path: '/settings', element: user ? <Settings /> : <Navigate to='/login?redirect=/settings' replace /> },
];
