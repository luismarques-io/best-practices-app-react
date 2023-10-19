import { NavLink, useNavigate } from 'react-router-dom';
import { NavItem } from '../NavItem/NavItem';

import { useAuth, logout, User } from '../../features/auth';
import { useAppDispatch } from '../../hooks/store';
import { APP_TITLE } from '../../config';

export function Header() {
  const { user } = useAuth();

  return (
    <nav className='navbar navbar-expand navbar-scroll bg-body-tertiary'>
      <div className='container'>
        <NavLink to='/' className='navbar-brand'>
          {APP_TITLE}
        </NavLink>

        <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>{user ? <UserLinks user={user} /> : <GuestLinks />}</ul>
      </div>
    </nav>
  );
}

function GuestLinks() {
  return (
    <>
      <NavItem text='Login' href='/login' />
      <NavItem text='Register' href='/register' />
    </>
  );
}

function UserLinks({ user: { firstName, email } }: { user: User }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const name = firstName || email;

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <NavItem text={`Hi, ${name}!`} href='/profile' />
      <NavItem text='Create a new post' href='/posts/add' />
      <NavItem text='Settings' href='/settings' />
      <NavItem type='button' text='Logout' onClick={handleLogoutClick} />
    </>
  );
}
