import type { Metadata } from 'next';
import { Header } from '@/components/shared';
import { Suspense } from 'react';

// Здесь уже можно размещать метаданные (инфо о заголовке и т.д.)
export const metadata: Metadata = {
  title: 'Next Parts | learning project',
  // description: 'This is a learning project',
};

// Это layout для главной страницы
export default function HomeLayout({
  // modal - потому что слот называется именно @modal
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-[calc(100vh-100px)]">
      {/* внутри Header есть хук useSearchParams, поэтому нужен Suspense (для ожидания отработки этого хука) */}
      <Suspense>
        <Header />
      </Suspense>
      {modal}
      {children}
    </main>
  );
}
