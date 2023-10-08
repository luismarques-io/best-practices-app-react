import { Link } from 'react-router-dom';
import { APP_TITLE } from '../../config';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className='container'>
        <span className='pe-2'>{year}</span>
        <Link to='/' className='link-secondary'>
          {APP_TITLE}
        </Link>
      </div>
    </footer>
  );
}
