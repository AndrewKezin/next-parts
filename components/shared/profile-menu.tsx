'use client';

import React from 'react';
import { Button } from '../ui';
import { LogOut, PackageSearch, UserRoundX } from 'lucide-react';
import { ConfirmPassword } from './confirm-password';
import { cn } from '@/lib/utils';
import logOut from '@/lib/log-out';
import { Api } from '@/services/api-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
}

export const ProfileMenu: React.FC<Props> = ({ className }) => {
  const [isVisibleDeleteBlock, setIsVisibleDeleteBlock] = React.useState(false);
  const [password, setPassword] = React.useState('');

  const router = useRouter();

  const onClickViewOrders = () => {
    router.push('/profile/orders');
  };

  // Выход их аккаунта
  const onClickSignOut = () => {
    logOut();
  };

  // Кнопка удаления аккаунта
  const onClickAccountDelete = () => {
    setIsVisibleDeleteBlock(true);
  };

  // Запрос на удаление аккаунта
  const handleConfirmDelete = async () => {
    try {
      const { data } = await Api.users.deleteUser(password);

      if (data.error) {
        toast.error(data.error, {
          icon: '❌',
          duration: 7000,
        });

        onClickCancel();
        return;
      }

      toast.error('Ваш аккаунт удален', {
        icon: '✅',
        duration: 5000,
      });

      // Выход из аккаунта
      setTimeout(() => {
        logOut();
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  // Кнопка отмены удаления
  const onClickCancel = () => {
    setIsVisibleDeleteBlock(false);
    setPassword('');
  };

  return (
    <div className="flex flex-col gap-5 w-96 mt-3 mb-5">
      <Button
        onClick={onClickViewOrders}
        variant="outline"
        className="text-base mb-2"
        type="submit">
        Просмотр заказов
        <PackageSearch size={23} className="ml-2" />
      </Button>

      <Button onClick={onClickSignOut} variant="outline" className="text-base mb-7" type="submit">
        Выйти из аккаунта
        <LogOut size={23} className="ml-2" />
      </Button>

      <div
        className="flex gap-1 text-grey-500 cursor-pointer underline w-fit"
        onClick={onClickAccountDelete}>
        Удалить аккаунт
        <UserRoundX size={23} className="ml-2" />
      </div>

      <div className={cn(isVisibleDeleteBlock ? 'flex flex-col gap-2' : 'hidden')}>
        <p>Чтобы подтвердить удаление учетной записи, введите ваш пароль</p>

        <ConfirmPassword
          inputText="Введите пароль"
          password={password}
          setPassword={setPassword}
          handleConfirm={handleConfirmDelete}
          onClickCancel={onClickCancel}
          className="flex gap-2"
        />
      </div>
    </div>
  );
};
