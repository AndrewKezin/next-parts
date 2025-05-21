'use client';

import React from 'react';

import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { productStore } from '@/store/redux';

// В этом компоненте рендерятся все провайдеры на приложение
export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Provider store={productStore}>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </Provider>
    </>
  );
};
