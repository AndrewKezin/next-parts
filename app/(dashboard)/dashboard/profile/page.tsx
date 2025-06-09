import { AdminNavMenu, ProfileForm } from '@/components/shared';
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

      <AdminNavMenu page={'profile'} />
    </div>
  );
}
