import Link from 'next/link';
import React from 'react';

export default function DashboardOrders() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold mt-10 mb-80">Администрирование заказов</h1>

      <Link href="/dashboard" className="text-primary font-bold text-2xl mb-3">
        Вернуться в панель администратора
      </Link>
      <Link href="/dashboard/profile" className="text-primary font-bold text-xl mb-3">
        Перейти в профиль администратора
      </Link>
      <Link href="/dashboard/products" className="text-primary font-bold text-xl mb-3">
        Перейти к управлению товарами
      </Link>
      <Link href="/dashboard/users" className="text-primary font-bold text-xl mb-3">
        Перейти к управлению профилями пользователей
      </Link>
    </div>
  );
}
