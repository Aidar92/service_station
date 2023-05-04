import React, { memo } from 'react';
import { NavLink } from './atoms';
import { Loader } from '~ui/atoms';
import { Common } from '~types';
import './styles.scss';
import { bemHelper } from '~libs';

type Props = {
  isNavGroupsLoaded: boolean;
  navLinks: Common.NavGroupLink[];
  mix: string;
  toggleMenu(): void;
};

const cn = bemHelper('side-menu');

export const SideMenu: React.FC<Props> = memo((props) => {
  const { isNavGroupsLoaded, navLinks, mix } = props;

  return (
    <aside className={cn('', '', mix)}>
      {!isNavGroupsLoaded && <Loader centered />}
      {isNavGroupsLoaded && (
        <div className={cn('navigation')}>
          {navLinks
            .filter(({ visible }) => visible)
            .map(({ label, disabled, to }) => {
              return (
                <NavLink key={label} isFocusable={!disabled} to={to}>
                  {label}
                </NavLink>
              );
            })}
        </div>
      )}
    </aside>
  );
});
