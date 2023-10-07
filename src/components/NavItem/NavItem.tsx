import { NavLink } from 'react-router-dom';

export function NavItem({
  type = 'link',
  text,
  href,
  onClick,
}: {
  type?: 'link' | 'button';
  text: string;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <li className='nav-item'>
      {type === 'link' && (
        <NavLink className='nav-link' to={href ? href : ''} onClick={onClick}>
          {text}
        </NavLink>
      )}
      {type === 'button' && (
        <button className='nav-link' onClick={onClick}>
          {text}
        </button>
      )}
    </li>
  );
}
