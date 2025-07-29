'use client';

import { User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui';
import { AdminDropdownMenu } from './admin';
import { UserDropdownMenu } from './user-dropdown-menu';

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
        {session && session?.user.role === 'ADMIN' && <AdminDropdownMenu />}
        {session && session?.user.role === 'USER' && <UserDropdownMenu />}
      </div>
    </div>
  );
};
