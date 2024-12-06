'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CartButton, Container, ProfileButton, SearchInput } from '@/components/shared';
import Image from 'next/image';
import { Button } from '../ui';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession, signIn } from 'next-auth/react';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  // получаем данные о пользователе (NextAuth)
  const { data: session } = useSession();
  // получаем параметры URL (чтобы отловить возврат со страницы оплаты (?paid))
  const searchParams = useSearchParams();
  // для редиректа на главную (иными словами, чтобы просто убрать ?paid из URL)
  const router = useRouter();

  // этот useEffect будет отлавливать возврат со страницы оплаты по роуту /?paid
  useEffect(() => {
    if (searchParams.has('paid')) {
      // таймер нужен, чтобы тостер успел сработать
      setTimeout(() => {
        toast.success(
          'Спасибо за покупку в нашем магазине! Информация о покупке отправлена на Ваш email.',
          { duration: 5000 },
        );
      }, 1500);

      // удаляем ?paid из URL
      router.push('/');
    }
  }, []);
  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Parts</h1>
              <p className="text-sm text-black-400 leading-3">все для ремонта</p>
            </div>
          </div>
        </Link>

        {/* Строка поиска */}
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        {/* Кнопка авторизации / профиля */}
        <div className="flex items-center gap-3">
          <ProfileButton />

          {/* Кнопка корзины */}
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
