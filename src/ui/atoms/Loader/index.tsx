import React from 'react';
import { bemHelper } from '~libs';
import './styles.scss';

const cn = bemHelper('loader');

type Props = {
  centered?: boolean;
  mix?: string;
  size?: string;
  text?: string;
};

const defaultProps = {
  centered: false,
  mix: '',
  size: '30px',
};

export const Loader: React.FC<Props> = (props) => {
  const { centered, mix, size, text } = props;
  return (
    <div className={cn(undefined, { centered }, mix)}>
      <svg
        className={cn('spinner')}
        height={size}
        viewBox="25 25 50 50"
        width={size}
      >
        <circle
          className={cn('path')}
          cx="50"
          cy="50"
          fill="none"
          r="20"
          strokeMiterlimit="10"
          strokeWidth="3"
        />
      </svg>
      {text && <p>{text}</p>}
    </div>
  );
};

Loader.defaultProps = defaultProps;
