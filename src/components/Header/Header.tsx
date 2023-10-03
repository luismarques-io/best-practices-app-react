import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <nav className='navbar navbar-expand navbar-scroll bg-body-tertiary'>
      <div className='container'>
        <NavLink to='/' className='navbar-brand'>
          General Purpose App
        </NavLink>

        <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
          <NavItem text='Login' href='/login' />
          <NavItem text='Register' href='/register' />
        </ul>
      </div>
    </nav>
  );
}

function NavItem({ text, href }: { text: string; href: string }) {
  return (
    <li className='nav-item'>
      <NavLink className='nav-link' to={href}>
        {text}
      </NavLink>
    </li>
  );
}
