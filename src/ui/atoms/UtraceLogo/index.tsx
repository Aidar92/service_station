import React from 'react';
import { bemHelper } from '~libs';
import './styles.scss';

const cn = bemHelper('utrace-logo');

type Props = {
  animated?: boolean;
  mix?: string;
};

const defaultProps = {
  animated: false,
};

export const UtraceLogo: React.FC<Props> = (props) => {
  const { animated, mix } = props;
  return (
    <div className={cn(undefined, { animated }, mix)}>
      <svg
        className={cn('image')}
        viewBox="0 0 53.975001 53.974999"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(-63.415 -73.016)">
          <g transform="matrix(.35278 0 0 -.35278 11.577 229.92)">
            <g transform="translate(199.48 435.91)">
              <path
                className={cn('u1')}
                d="M 0,0 -24,-8.456 -47.989,0 -24,8.456 Z"
                fill="#373c64"
              />
            </g>
            <g transform="translate(199.39 435.98)">
              <path
                className={cn('u2')}
                d="m0 0v-84.582l-24.006 8.458-23.996 8.458v67.666l23.996-8.458z"
                fill="#f55a4b"
              />
            </g>
            <g transform="translate(223.4 342.94)">
              <path
                className={cn('u3')}
                d="m0 0-24.006-8.458-24.006-8.458-23.996-8.459v50.75l23.996-8.458 24.006-8.459z"
                fill="#00a0ca"
              />
            </g>
            <g transform="translate(223.4 342.94)">
              <path
                className={cn('u4')}
                d="m0 0v-50.759l-24.006 8.458-24.006 8.469-23.996 8.458 23.996 8.458 24.006 8.458z"
                fill="#373c64"
              />
            </g>
            <g transform="translate(247.4 351.4)">
              <path
                className={cn('u5')}
                d="m0 0v-50.76l-24.006-8.458v50.76z"
                fill="#f55a4b"
              />
            </g>
            <g transform="translate(271.4 427.52)">
              <path
                className={cn('u6')}
                d="m0 0v-118.42l-23.996-8.468v135.34z"
                fill="#00a0ca"
              />
            </g>
            <g transform="translate(295.4 435.98)">
              <path
                className={cn('u7')}
                d="m0 0v-118.42l-24.005-8.458v118.42z"
                fill="#373c64"
              />
            </g>
            <g transform="translate(295.39 436.01)">
              <path
                className={cn('u8')}
                d="M 0,0 -24,-8.456 -47.989,0 -24,8.456 Z"
                fill="#f55a4b"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

UtraceLogo.defaultProps = defaultProps;
