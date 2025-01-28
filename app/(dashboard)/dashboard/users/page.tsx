'use client';

import { useUsersProfile } from '@/hooks';
import { getLocalFormatDate } from '@/lib';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

export default function DashboardUsers() {
  const { users, loading} = useUsersProfile(false);

  if (loading) {
    return (
      <p className="text-xl text-center">Загрузка пользователей...</p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold mt-10 mb-5">Панель управления профилями пользователей</h1>

      <table className="table w-full mb-5 border-collapse border border-black bg-slate-100">
        <thead className="bg-slate-200 border border-black">
          <tr>
            <th className="border border-black px-2">ID</th>
            <th className="border border-black px-2">Статус</th>
            <th className="border border-black px-2">Email</th>
            <th className="border border-black px-2">ФИО</th>
            <th className="border border-black px-2">Role</th>
            <th className="border border-black px-2">Создан</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-black px-2 text-center">
                <Link
                  href={`/dashboard/users/${user.id}`}
                  className="w-full inline-block text-center text-blue-800 underline">
                  {user.id}
                </Link>
              </td>
              <td
                className={cn('border border-black px-2 text-center', {
                  'bg-green-300': user?.status === 'ACTIVE',
                  'bg-gray-500': user?.status === 'INACTIVE',
                  'bg-yellow-300': user?.status === 'INDEBTED',
                  'bg-red-300': user?.status === 'BANNED',
                  'bg-slate-600 ': user?.status === 'DELETED',
                })}>
                {user?.status === 'ACTIVE' && 'Активен'}
                {user?.status === 'INACTIVE' && 'Неактивен'}
                {user?.status === 'INDEBTED' && 'В задолженности'}
                {user?.status === 'BANNED' && 'Заблокирован'}
                {user?.status === 'DELETED' && 'Удален'}
              </td>
              <td className="border border-black px-2">
                <Link
                  href={`/dashboard/users/${user.id}`}
                  className="w-full inline-block text-center text-blue-800">
                  {user.email}
                </Link>
              </td>
              <td className="border border-black px-2">{user.fullName}</td>
              <td className="border border-black px-2">{user.role}</td>
              <td className="border border-black px-2">{getLocalFormatDate(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link href="/dashboard" className="text-primary font-bold text-2xl mb-3">
        Вернуться в панель администратора
      </Link>
      <Link href="/dashboard/profile" className="text-primary font-bold text-xl mb-3">
        Перейти в профиль администратора
      </Link>
      <Link href="/dashboard/orders" className="text-primary font-bold text-xl mb-3">
        Перейти к управлению заказами
      </Link>
      <Link href="/dashboard/products" className="text-primary font-bold text-xl mb-3">
        Перейти к управлению товарами
      </Link>
    </div>
  );
}
