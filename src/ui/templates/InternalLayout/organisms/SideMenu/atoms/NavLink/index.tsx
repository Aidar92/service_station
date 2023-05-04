import React, { memo } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { bemHelper } from '~libs';
import './styles.scss';

const cn = bemHelper({ name: 'nav-link', prefix: 'side-menu-' });

type Props = {
  disabled?: boolean;
  isFocusable: boolean;
  mix?: string;
  onClick?: () => void;
  to: string;
};

const defaultProps = {
  disabled: false,
};

export const NavLink: React.FC<Props> = memo((props) => {
  const { children, disabled, isFocusable, mix, onClick, to } = props;

  return (
    <RouterNavLink
      activeClassName="side-menu-nav-link--active"
      className={cn(undefined, { disabled }, mix)}
      onClick={onClick}
      tabIndex={isFocusable ? 0 : -1}
      to={to}
    >
      {children}
    </RouterNavLink>
  );
});

NavLink.defaultProps = defaultProps;
