import React from 'react';
import { bemHelper } from '~libs';
import './styles.scss';

const cn = bemHelper('code-viewer');

type Props = {
  mix?: string;
};

const defaultProps = {
  mix: '',
};

export const CodeViewer: React.FC<Props> = (props) => {
  const { children, mix } = props;

  return <pre className={cn('', '', mix)}>{children}</pre>;
};

CodeViewer.defaultProps = defaultProps;
