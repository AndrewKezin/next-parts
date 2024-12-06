import { CircleUser, Link, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui';

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
      {!session ? (
        <Button onClick={onClickSignIn} variant="outline" className="flex items-center gap-1">
          <User size={16} />
          Войти
        </Button>
      ) : (
        // <Link href="/profile">
        <Button variant="secondary" className="flex items-center gap-2">
          <CircleUser size={18} />
          Профиль
        </Button>
        // </Link>
      )}
    </div>
  );
};
