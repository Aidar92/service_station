import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { bemHelper } from '~libs';
import './styles.scss';

const cn = bemHelper({ name: 'footer', prefix: 'side-menu-' });

interface IFooter {
  mix: string;
}

export const Footer: React.FC<IFooter> = memo((props) => {
  const { mix } = props;

  const { t } = useTranslation('nav-groups', {
    useSuspense: false,
  });

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className={cn('', '', mix)}>
      UTrace {currentYear}&nbsp;
      <Link className={cn('link')} to="/app/environment-state">
        {t('Environment state')}
      </Link>
    </div>
  );
});
