import { Link } from 'react-router-dom';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className='container'>
        <span className='pe-2'>{year}</span>
        <Link to='/' className='link-secondary'>
          General Purpose App
        </Link>
      </div>
    </footer>
  );
}
