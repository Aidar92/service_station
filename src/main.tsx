import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer, Slide } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { App } from './App';
import './i18n';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'devextreme/dist/css/dx.common.css';
import '~/assets/css/dx.material.utrace-material.css';
import '~/assets/css/ReactToastify.css';
import '~/assets/css/reboot.css';
import '~/assets/css/common.scss';
import { AuthProvider } from '~context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false,
    },
  },
});

ReactDOM.render(
  <>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
    <ToastContainer
      closeOnClick={false}
      draggable={false}
      position="bottom-right"
      transition={Slide}
    />
  </>,
  document.getElementById('root')
);
