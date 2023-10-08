import { lazily } from 'react-lazily';
import { Navigate } from 'react-router-dom';

const { Login } = lazily(() => import('../pages/Login/Login'));
const { Register } = lazily(() => import('../pages/Register/Register'));

export const publicRoutes = (isLoggedIn: boolean) => [
  { path: '/login', element: !isLoggedIn ? <Login /> : <Navigate to='/profile' replace /> },
  { path: '/register', element: !isLoggedIn ? <Register /> : <Navigate to='/profile' replace /> },
];
