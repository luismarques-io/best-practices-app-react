import { lazily } from 'react-lazily';

const { Profile } = lazily(() => import('../pages/Profile/Profile'));

export const protectedRoutes = [{ path: '/profile', element: <Profile /> }];
