import { lazily } from 'react-lazily';
import { Navigate } from 'react-router-dom';
import { User } from '@/features/auth';

const { Login } = lazily(() => import('@/pages/Login/Login'));
const { Register } = lazily(() => import('@/pages/Register/Register'));

export const publicRoutes = ({ user }: { user: User | null }) => [
  { path: '/login', element: !user ? <Login /> : <Navigate to='/profile' replace /> },
  { path: '/register', element: !user ? <Register /> : <Navigate to='/profile' replace /> },
];
