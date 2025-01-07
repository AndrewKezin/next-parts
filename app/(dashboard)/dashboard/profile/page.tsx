import { ProfileForm } from '@/components/shared';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function DashboardProfile() {
 const session = await getUserSession();

 const user = await prisma.user.findFirst({
        where: {
            id: Number(session?.id)
        }
    });

    if (!user) {
        return redirect('/not-auth');
    }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold mt-10 mb-5">Профиль администратора</h1>

      <ProfileForm data={user} />

      <Link href="/dashboard" className="text-primary font-bold text-2xl mb-3">
        Вернуться в панель администратора
      </Link>
      <Link href="/dashboard/orders" className='text-primary font-bold text-xl mb-3'>Перейти к управлению заказами</Link>
      <Link href="/dashboard/products" className="text-primary font-bold text-xl mb-3">
        Перейти к управлению товарами
      </Link>
      <Link href="/dashboard/users" className="text-primary font-bold text-xl mb-3">
        Перейти к управлению профилями пользователей
      </Link>
    </div>
  );
}
