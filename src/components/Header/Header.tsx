import { NavLink } from 'react-router-dom';
import { NavItem } from '../NavItem/NavItem';

import { useAuth, logout } from '../../features/auth';
import { useAppDispatch } from '../../app/hooks';

export function Header() {
  const dispatch = useAppDispatch();
  const auth = useAuth();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <nav className='navbar navbar-expand navbar-scroll bg-body-tertiary'>
      <div className='container'>
        <NavLink to='/' className='navbar-brand'>
          General Purpose App
        </NavLink>

        <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
          {auth.user ? (
            <NavItem type='button' text='Logout' onClick={handleLogoutClick} />
          ) : (
            <>
              <NavItem text='Login' href='/login' />
              <NavItem text='Register' href='/register' />
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
