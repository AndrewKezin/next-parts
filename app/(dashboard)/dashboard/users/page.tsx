import { prisma } from '@/prisma/prisma-client';
import Link from 'next/link';
import React from 'react';

export default async function DashboardProducts() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  }
  );

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold mt-10 mb-5">Панель управления профилями пользователей</h1>

      <table className="table w-full mb-5 border-collapse border border-black bg-slate-100">
        <thead className='bg-slate-200 border border-black'>
          <tr>
            <th className="border border-black px-2">ID</th>
            <th className="border border-black px-2">Email</th>
            <th className="border border-black px-2">ФИО</th>
            <th className="border border-black px-2">Role</th>
            <th className="border border-black px-2">Создан</th>
            <th className="border border-black px-2">Просмотр</th>
            <th className="border border-black px-2">Удаление</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-black px-2 text-center">{user.id}</td>
              <td className="border border-black px-2">{user.email}</td>
              <td className="border border-black px-2">{user.fullName}</td>
              <td className="border border-black px-2">{user.role}</td>
              <td className="border border-black px-2">{user.createdAt.toLocaleDateString()}</td>
              <td className="border border-black px-2 text-center">
                <Link href={`/dashboard/users/${user.id}`} className="w-full inline-block text-center">🔍</Link>
              </td>
              <td className="border border-black px-2 text-center">
                <Link href={`/dashboard/users/delete/${user.id}`} className="w-full inline-block text-center">❌</Link>
              </td>
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
      <Link href="/dashboard/orders" className='text-primary font-bold text-xl mb-3'>Перейти к управлению заказами</Link>
      <Link href="/dashboard/products" className="text-primary font-bold text-xl mb-3">
        Перейти к управлению товарами
      </Link>
    </div>
  );
}
