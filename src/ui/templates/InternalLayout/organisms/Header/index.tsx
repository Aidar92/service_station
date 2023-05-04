import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '~context';
import { BurgerBtn } from '~ui/atoms';
import { bemHelper } from '~libs';
import './styles.scss';

const cn = bemHelper('header');

type Props = {
  menuActive: boolean;
  mix: string;
  toggleMenu(): void;
};

export const Header: React.FC<Props> = (props) => {
  const { menuActive, mix, toggleMenu } = props;

  const { authState } = useContext(AuthContext);

  return (
    <header className={cn(undefined, undefined, mix)}>
      <div className={cn('left')}>
        <Link className={cn('logo-link')} title="На главную" to="/app">
          Logo
        </Link>
        <BurgerBtn
          active={menuActive}
          mix={cn('burger-btn')}
          onClick={toggleMenu}
          title={menuActive ? 'Скрыть меню' : 'Показать меню'}
        />
      </div>

      <div className={cn('right')}>
        <Link
          className={cn('control', { profile: true })}
          title="Профиль"
          to="/app/user-profile"
        >
          <span>{authState.userData?.name}</span>
        </Link>
      </div>
    </header>
  );
};
