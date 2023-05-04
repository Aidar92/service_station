import React, { useCallback, useState } from 'react';
import { Header, SideMenu } from './organisms';
import { useNavGroups } from '~hooks';
import { bemHelper } from '~libs';
import './styles.scss';

const cn = bemHelper('internal-layout');

export const InternalLayout: React.FC = (props) => {
  const { children } = props;

  const [menuActive, setMenuActive] = useState(true);

  const { isNavGroupsLoaded, navLinks } = useNavGroups();

  const toggleMenu = useCallback(() => {
    setMenuActive((prevActive) => !prevActive);
  }, []);

  return (
    <main className={cn(undefined, { 'menu-hidden': !menuActive })}>
      <Header
        menuActive={menuActive}
        mix={cn('header')}
        toggleMenu={toggleMenu}
      />
      <div className={cn('side-menu-mask', { visible: menuActive })}>
        <SideMenu
          isNavGroupsLoaded={isNavGroupsLoaded}
          mix={cn('side-menu')}
          navLinks={navLinks}
          toggleMenu={toggleMenu}
        />
      </div>
      <div className={cn('content')}>{children}</div>
    </main>
  );
};
