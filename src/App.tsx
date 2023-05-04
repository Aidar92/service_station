import React, { Suspense, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router';
import { AuthContext } from '~context';
import { authRoutes, internalRoutes } from '~/routes';
import { FadeInRoute, Loader } from '~ui/atoms';
import { ExternalLayout, InternalLayout } from '~ui/templates';
import { ErrorBoundary } from '~/features';

export const App: React.FC = () => {
  const {
    authState: { authInProgress, isAuthorized },
  } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/app" />
        <Route
          path="/auth"
          render={() => (
            <ExternalLayout>
              {authRoutes.map(({ Component, exact, path }) => (
                <Route
                  key={path}
                  component={Component}
                  exact={exact}
                  path={path}
                />
              ))}
            </ExternalLayout>
          )}
        />
        <Route
          path="/app"
          render={() => {
            if (!authInProgress && !isAuthorized) {
              return <Redirect to="/auth" />;
            }
            if (authInProgress) {
              return <Loader centered size="42px" />;
            }
            return (
              <InternalLayout>
                <ErrorBoundary>
                  <Suspense fallback={<Loader centered />}>
                    {internalRoutes.map(({ Component, exact, path }) => (
                      <FadeInRoute
                        key={path}
                        Component={Component}
                        exact={exact}
                        path={path}
                      />
                    ))}
                  </Suspense>
                </ErrorBoundary>
              </InternalLayout>
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};
