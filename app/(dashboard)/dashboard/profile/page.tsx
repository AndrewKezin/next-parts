import { AdminNavMenu, ProfileForm } from '@/components/shared';
import { getUserProfile } from '@/lib';
import { getUserSession } from '@/lib/get-user-session';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function DashboardProfile() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/not-auth');
  }

  const user = await getUserProfile(session.id);

  if (!user) {
    return redirect('/not-auth');
  }

  if (user.role !== 'ADMIN' && user.role !== 'MANAGER') {
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
