export function Header() {
  return (
    <nav className='navbar bg-body-tertiary'>
      <div className='container'>
        <a className='navbar-brand' href='/'>
          General Purpose App
        </a>
        <ul className='nav justify-content-end'>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              Sign in
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              Sign up
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
