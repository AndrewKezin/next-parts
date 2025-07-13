'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { reduxStore } from '@/store/redux/store';

// В этом компоненте рендерятся все провайдеры на приложение
export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Provider store={reduxStore}>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </Provider>
    </>
  );
};
