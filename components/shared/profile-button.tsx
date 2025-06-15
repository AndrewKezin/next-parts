'use client';

import { CircleUser, LogOut, User, UserCog } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui';
import Link from 'next/link';
import logOut from '@/lib/log-out';

interface Props {
  // эта функция будет открывать модальное окно авторизации
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
  // получаем данные о пользователе из хука useSession (NextAuth)
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session && (
        <Button onClick={onClickSignIn} variant="outline" className="flex items-center gap-1">
          <User size={16} />
          Войти
        </Button>
      )}

      <div className="flex gap-2">
        {session && (
          <Button variant="outline" className="flex items-center gap-2" onClick={() => logOut()} title='Выход'>
            <LogOut size={18} />
            Выход
          </Button>
        )}

        {session && session?.user.role === 'ADMIN' && (
          <Link href="/profile">
            <Button variant="outline" className="flex items-center gap-2">
              <UserCog size={18} />
              Администрирование
            </Button>
          </Link>
        )}
        {session && session?.user.role === 'USER' && (
          <Link href="/profile">
            <Button variant="outline" className="flex items-center gap-2">
              <CircleUser size={18} />
              Профиль
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
