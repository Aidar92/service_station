import React, { Component, ErrorInfo as IErrorInfo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ErrorInfo } from './molecules';

interface IErrorBoundaryProps extends RouteComponentProps {}

interface IErrorBoundaryState {
  hasError: boolean;
  error: string;
  componentStack: string;
}

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  state = {
    error: '',
    componentStack: '',
    hasError: false,
  };

  componentDidUpdate(prevProps: IErrorBoundaryProps) {
    const {
      location: { pathname },
    } = this.props;
    const { hasError } = this.state;

    if (hasError && prevProps.location.pathname !== pathname) {
      this.clearError();
    }
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, info: IErrorInfo) {
    this.setState({
      componentStack: info.componentStack,
      error: error.toString(),
    });
  }

  clearError = () => this.setState({ hasError: false });

  render() {
    const { children } = this.props;
    const { hasError, error, componentStack } = this.state;

    if (hasError) {
      return <ErrorInfo componentStack={componentStack} error={error} />;
    }
    return children;
  }
}

export const ErrorBoundaryWithRouter = withRouter(ErrorBoundary);
ErrorBoundaryWithRouter.displayName = 'ErrorBoundary';
