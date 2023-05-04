import React from 'react';
import { Route, RouteProps } from 'react-router';
import { bemHelper } from '~libs';
import './styles.scss';

const cn = bemHelper('fade-in-route');

interface IFadeInRouteProps
  extends Omit<RouteProps, 'component' | 'render' | 'children'> {
  Component: React.ComponentType;
}

export const FadeInRoute: React.FC<IFadeInRouteProps> = (props) => {
  const { Component, ...otherProps } = props;
  return (
    <Route
      render={() => (
        <div className={cn()}>
          <Component />
        </div>
      )}
      {...otherProps}
    />
  );
};
