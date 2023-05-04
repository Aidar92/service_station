import React from 'react';
import { bemHelper } from '~libs';
import './styles.scss';

type Props = {
  value: string;
};

const cn = bemHelper('multiline-cell');

export const MultilineCell: React.FC<Props> = (props) => (
  <div className={cn()}>{props.value}</div>
);
