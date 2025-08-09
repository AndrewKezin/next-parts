import { AdminMonitor, AdminNavMenu } from '@/components/shared';
import React from 'react';

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center w-full mb-5">
      <h1 className="text-2xl lg:text-3xl font-bold pt-10 mb-5">Администрирование магазина</h1>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center w-full gap-2 p-3">
        <AdminNavMenu page={'dashboard'} />

        <AdminMonitor />
      </div>
    </div>
  );
}
