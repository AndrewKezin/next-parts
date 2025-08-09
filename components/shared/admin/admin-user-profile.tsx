'use client';

import { changeUserRole, changeUserStatus, setUserVerified } from '@/app/actions';
import { cn } from '@/lib/utils';
import { UserDTO } from '@/services/dto/cart.dto';
import { UserRole, UserStatus } from '@prisma/client';
import React from 'react';
import { ConfirmPassword } from '../confirm-password';
import { SimpleSelect } from '../../ui';

interface Props {
  user: UserDTO;
  className?: string;
}

export const AdminUserProfile: React.FC<Props> = ({ user, className }) => {
  const [onClickRole, setOnClickRole] = React.useState(false);
  const [onClickStatus, setOnClickStatus] = React.useState(false);
  const [onClickVerified, setOnClickVerified] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [selectedRole, setSelectedRole] = React.useState(user.role);
  const [selectedStatus, setSelectedStatus] = React.useState(user.status);

  const handleUserRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value as UserRole);
  };

  const handleRoleConfirm = async () => {
    changeUserRole(user.id, password as string, selectedRole as UserRole);
    setOnClickRole(false);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleUserStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value as UserStatus);
  };

  const handleStatusConfirm = async () => {
    changeUserStatus(user.id, password as string, selectedStatus as UserStatus);
    setOnClickStatus(false);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleVerifiedConfirm = async () => {
    setUserVerified(user.id, password as string);
    setOnClickVerified(false);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <div className="w-full mb-5 overflow-auto">
      <table className="w-full mb-3 border-collapse border border-black table-auto">
        <colgroup>
          <col className="w-1/4" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td className="px-4 py-2 border border-black font-bold">ID</td>
            <td className="px-4 py-2 border border-black">{user?.id}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-black font-bold">Email</td>
            <td className="px-4 py-2 border border-black">{user?.email}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-black font-bold">ФИО</td>
            <td className="px-4 py-2 border border-black">{user?.fullName}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-black font-bold">Role</td>
            <td className="px-4 py-2 border border-black">
              <div className="flex gap-2 items-center">
                {user?.role}
                <div
                  className={cn('px-4 inline-block underline text-blue-600 cursor-pointer', {
                    hidden: onClickRole,
                  })}
                  onClick={() => setOnClickRole(!onClickRole)}>
                  Изменить
                </div>
                <SimpleSelect
                  list={UserRole}
                  handleChange={handleUserRoleChange}
                  defaultValue={user?.role.toString()}
                  className={cn('px-4 inline-block cursor-pointer', {
                    hidden: !onClickRole,
                  })}
                />
                <ConfirmPassword
                  inputText="Введите ваш пароль"
                  password={password}
                  setPassword={setPassword}
                  handleConfirm={handleRoleConfirm}
                  onClickCancel={() => setOnClickRole(false)}
                  className={cn('flex gap-2', { hidden: !onClickRole })}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-black font-bold">Статус</td>
            <td className="px-4 py-2 border border-black">
              <div className="flex gap-2 items-center">
                <div
                  className={cn('px-2 py-2 font-bold inline-block', {
                    'text-green-500': user?.status === 'ACTIVE',
                    'text-gray-700': user?.status === 'INACTIVE',
                    'text-yellow-500': user?.status === 'INDEBTED',
                    'text-red-500': user?.status === 'BANNED',
                    'text-black ': user?.status === 'DELETED',
                  })}>
                  {user?.status === 'ACTIVE' && 'Активен'}
                  {user?.status === 'INACTIVE' && 'Неактивен'}
                  {user?.status === 'INDEBTED' && 'В задолженности'}
                  {user?.status === 'BANNED' && 'Заблокирован'}
                  {user?.status === 'DELETED' && 'Удален'}
                </div>

                <div
                  className={cn('px-4 inline-block underline text-blue-600 cursor-pointer', {
                    hidden: onClickStatus,
                  })}
                  onClick={() => {
                    setOnClickStatus(true);
                    setPassword('');
                  }}>
                  Изменить
                </div>

                <SimpleSelect
                  list={UserStatus}
                  handleChange={handleUserStatusChange}
                  defaultValue={user?.status.toString()}
                  className={cn('px-4 inline-block cursor-pointer', {
                    hidden: !onClickStatus,
                  })}
                />
                <ConfirmPassword
                  inputText="Введите ваш пароль"
                  password={password}
                  setPassword={setPassword}
                  handleConfirm={handleStatusConfirm}
                  onClickCancel={() => {
                    setOnClickStatus(false);
                    setPassword('');
                  }}
                  className={cn('flex gap-2', { hidden: !onClickStatus })}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-black font-bold">Создан</td>
            <td className="px-4 py-2 border border-black">
              {user?.createdAt?.toLocaleString('ru-RU')}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-black font-bold">Обновлен</td>
            <td className="px-4 py-2 border border-black">
              {user?.updatedAt?.toLocaleString('ru-RU')}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-black font-bold">Подтвержден</td>
            <td className="px-4 py-2 border border-black">
              <div className="flex gap-2 items-center">
                {user?.verified ? `Да: ${user?.verified?.toLocaleString('ru-RU')}` : `Нет`}
                {!user?.verified && (
                  <div
                    className="px-4 inline-block underline text-blue-600 cursor-pointer"
                    onClick={() => setOnClickVerified(true)}>
                    Подтвердить?
                  </div>
                )}
                <ConfirmPassword
                  inputText="Введите ваш пароль"
                  password={password}
                  setPassword={setPassword}
                  handleConfirm={handleVerifiedConfirm}
                  onClickCancel={() => setOnClickVerified(false)}
                  className={cn('flex gap-2', { hidden: !onClickVerified })}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-black font-bold">Провайдер</td>
            <td className="px-4 py-2 border border-black">{user?.provider}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-black font-bold">Адреса доставки</td>
            <td className="px-4 py-2 border border-black">
              {user?.addresses.map((address) => (
                <div key={address.id}>
                  <p>{address.address}</p>
                </div>
              ))}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-black font-bold">Телефон</td>
            <td className="px-4 py-2 border border-black">{user?.phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
