import React from 'react';
import { bemHelper } from '~libs';
import './styles.scss';

const cn = bemHelper('loading-dots');

type Props = {
  centered?: boolean;
  gap?: string;
  mix?: string;
  size?: string;
};

const defaultProps = {
  centered: false,
  gap: '3px',
  mix: '',
  size: '10px',
};

export const LoadingDots: React.FC<Props> = (props) => {
  const { centered, gap, mix, size } = props;

  const dotStyle = {
    height: size,
    width: size,
    marginRight: gap,
  };

  return (
    <div className={cn(undefined, { centered }, mix)}>
      <div className={cn('dot', '1')} style={dotStyle} />
      <div className={cn('dot', '2')} style={dotStyle} />
      <div className={cn('dot', '3')} style={dotStyle} />
    </div>
  );
};

LoadingDots.defaultProps = defaultProps;
