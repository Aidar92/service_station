import React from 'react';
import { bemHelper } from '~libs';
import './styles.scss';

const cn = bemHelper('labeled-group');

type Props = {
  label: string;
  labelBgColor?: string;
  mix?: string;
};

const defaultProps = {
  labelBgColor: '#FFF',
  mix: '',
};

export const LabeledGroup: React.FC<Props> = (props) => {
  const { children, label, labelBgColor, mix } = props;

  return (
    <div className={cn(undefined, undefined, mix)}>
      <p className={cn('label')} style={{ backgroundColor: labelBgColor }}>
        {label}
      </p>
      {children}
    </div>
  );
};

LabeledGroup.defaultProps = defaultProps;
