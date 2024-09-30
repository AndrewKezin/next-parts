import type { Metadata } from 'next';
import { Header } from '@/components/shared';

// Здесь уже можно размещать метаданные (инфо о заголовке и т.д.)
export const metadata: Metadata = {
  title: 'Next learning project',
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
    <main className="min-h-screen">
      <Header />
      {modal}
      {children}
    </main>
  );
}
