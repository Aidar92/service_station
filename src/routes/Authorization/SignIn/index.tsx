import React, { memo, useCallback, useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CredentialsForm } from './components';
import { AuthContext } from '~context';
import { bemHelper, initialLocationStorage } from '~libs';
import { Loader } from '~ui/atoms';
import './styles.scss';

const cn = bemHelper({ name: 'sign-in', prefix: 'page-' });

export const SignIn: React.FC = memo(() => {
  const { t, ready: i18nReady } = useTranslation('sign-in', {
    useSuspense: false,
  });

  const {
    authState: { authError, authInProgress, isAuthorized },
    clearAuthError,
    logIn,
  } = useContext(AuthContext);

  const handleCredentialsFormSubmit = useCallback(
    (credentials: { login: string; password: string }) => {
      logIn({ credentials });
    },
    [logIn]
  );

  useEffect(() => {
    if (authError && i18nReady) {
      toast.error(authError);
      clearAuthError();
    }
  }, [authError, t, i18nReady, clearAuthError]);

  if (isAuthorized) {
    const initialLocation = initialLocationStorage.get();
    return <Redirect to={initialLocation || '/app'} />;
  }

  return (
    <div className={cn()}>
      {!i18nReady && <Loader size="60px" />}
      {i18nReady && (
        <div className={cn('card')}>
          <div className={cn('card-right')}>
            <h3 className={cn('form-title')}>{t('Authorization')}</h3>
            <CredentialsForm
              authInProgress={authInProgress}
              onSubmit={handleCredentialsFormSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
});
