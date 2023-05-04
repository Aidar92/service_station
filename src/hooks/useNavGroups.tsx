import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Common } from '~types';

export const useNavGroups = (): {
  isNavGroupsLoaded: boolean;
  navLinks: Common.NavGroupLink[];
} => {
  const { t, ready: i18nLoaded } = useTranslation('nav-groups', {
    useSuspense: false,
  });

  const navLinks = useMemo(() => {
    if (!i18nLoaded) {
      return [];
    }
    return [
      {
        label: t('Records'),
        to: '/app/records',
        visible: true,
      },
      {
        label: t('Stations'),
        to: '/app/stations',
        visible: true,
      },
      {
        label: t('Reports'),
        to: '/app/reports',
        visible: true,
      },
      {
        label: t('Statistics'),
        to: '/app/statistics',
        visible: true,
      },
      { label: t('Settings'), to: '/app/settings', visible: true },
    ];
  }, [t, i18nLoaded]);

  return useMemo(
    () => ({
      isNavGroupsLoaded: i18nLoaded,
      navLinks,
    }),
    [i18nLoaded, navLinks]
  );
};
