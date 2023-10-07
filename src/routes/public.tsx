import { lazily } from 'react-lazily';

const { Login } = lazily(() => import('../pages/Login/Login'));
const { Register } = lazily(() => import('../pages/Register/Register'));

export const publicRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
];
