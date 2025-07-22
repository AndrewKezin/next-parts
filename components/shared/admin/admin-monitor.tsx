'use client';

import React from 'react';
import { AdminMonitorItem } from './admin-monitor-item';
import { useGetMonitorQuery } from '@/store/redux/monitorApi';
import { Monitor } from '@prisma/client';

export const AdminMonitor: React.FC = () => {
  // const { monitor, loading } = useNewMonitor();
  const { data, isLoading: loading } = useGetMonitorQuery({}, { refetchOnMountOrArgChange: true });

  const monitor = data?.newMonitor;
  // await prisma.$executeRaw`TRUNCATE TABLE "Monitor" RESTART IDENTITY CASCADE`;


  if (loading) {
    return (
      <h3 className="text-xl flex-1 text-center font-bold text-gray-500">Загрузка монитора...</h3>
    );
  }

  if (!monitor) {
    return <h3 className="text-xl flex-1 text-center font-bold text-green-700">Монитор пуст</h3>;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full gap-2 p-3">
      <h2 className="text-xl font-bold mb-3">Монитор</h2>

      <div className="flex flex-col items-center justify-center gap-3">
        {monitor?.map((item: Monitor) => (
          <AdminMonitorItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
