'use client';

import React from 'react';

import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

// В этом компоненте рендерятся все провайдеры на приложение
export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
    </>
  );
};
