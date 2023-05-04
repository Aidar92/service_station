import React from 'react';
import { bemHelper } from '~libs';
import './styles.scss';

const cn = bemHelper('card');

type Props = {
  mix?: string;
};

export const Card: React.FC<Props> = (props) => {
  const { children, mix } = props;

  return <div className={cn('', '', mix)}>{children}</div>;
};
