import React from 'react';
import { Link } from 'react-router-dom';
import { bemHelper } from '~libs';
import './styles.scss';

const cn = bemHelper('section-navigation');

type Props = {
  links: {
    disabled?: boolean;
    label: string;
    to: string;
  }[];
};

const APPEAR_DELAY = 50; // ms

export const SectionNavigation: React.FC<Props> = (props) => {
  const { links } = props;

  return (
    <nav className={cn()}>
      {links.map(({ disabled = false, label, to }, idx) => (
        <Link
          key={to}
          className={cn('link', { disabled })}
          style={{ animationDelay: `${idx * APPEAR_DELAY}ms` }}
          tabIndex={disabled ? 0 : 1}
          to={to}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};
