import React from 'react';
import { bemHelper } from '~libs';
import './styles.scss';

const cn = bemHelper('external-layout');

export const ExternalLayout: React.FC = (props) => {
  const { children } = props;

  return (
    <main className={cn()}>
      <div className={cn('content')}>{children}</div>
    </main>
  );
};
