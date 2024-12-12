'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AuthModal, CartButton, Container, ProfileButton, SearchInput } from '@/components/shared';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  // получаем данные о пользователе (NextAuth) !!!Данные о пользователе получаем в компоненте ProfileButton
  // const { data: session } = useSession();

  // получаем параметры URL (чтобы отловить возврат со страницы оплаты (?paid))
  const searchParams = useSearchParams();
  // для редиректа на главную (иными словами, чтобы просто убрать ?paid или ?verified из URL)
  const router = useRouter();

  // этот useEffect будет отлавливать возврат со страницы оплаты или регистрации
  useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage =
        'Спасибо за покупку в NEXT PARTS! Информация о покупке отправлена на Ваш email';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Спасибо за регистрацию в NEXT PARTS! Вы успешно подтвердили Ваш email';
    }
    // таймер нужен, чтобы тостер успел сработать
    if (toastMessage) {
      setTimeout(() => {
        // удаляем ?paid или ?verified из URL без возможности возврата назад
        router.replace('/');
  
        toast.success(toastMessage, { duration: 5000 });
      }, 1000);
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
          {/* Модальное окно авторизации */}
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {/* Кнопка корзины */}
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
