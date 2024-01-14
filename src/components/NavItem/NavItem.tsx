import { NavLink } from 'react-router-dom';

export type NavItemProps = React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement> & {
  children?: React.ReactNode;
  type?: 'link' | 'button';
  text?: string;
  to?: string;
};

export const NavItem = (props: NavItemProps) => {
  const { children, type = 'link', text, to, ...restProps } = props;

  const Element = type === 'link' ? NavLink : 'button';

  return (
    <li className='nav-item'>
      <Element className='nav-link' to={to ?? ''} {...restProps}>
        {children ?? text}
      </Element>
    </li>
  );
};
