import React from 'react';
import { bemHelper } from '~libs';
import './styles.scss';

const cn = bemHelper('burger-btn');

type Props = {
  active: boolean;
  mix: string;
  onClick: () => void;
  title: string;
};

export const BurgerBtn: React.FC<Props> = (props) => {
  const { active, mix, onClick, title } = props;
  return (
    <div
      className={cn(undefined, { active }, mix)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      title={title}
    >
      <div className={cn('line', { position: 'top' })} />
      <div className={cn('line', { position: 'middle' })} />
      <div className={cn('line', { position: 'bottom' })} />
    </div>
  );
};
