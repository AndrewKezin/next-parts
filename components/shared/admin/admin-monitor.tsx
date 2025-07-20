'use client';

import { useNewMonitor } from '@/hooks';
import React from 'react';
import { AdminMonitorItem } from './admin-monitor-item';
import { useDeleteItemMutation, useGetMonitorQuery } from '@/store/redux/monitorApi';
import { Monitor } from '@prisma/client';

export const AdminMonitor: React.FC = () => {
  // const { monitor, loading } = useNewMonitor();
  const { data, isLoading: loading } = useGetMonitorQuery({}, { refetchOnMountOrArgChange: true });

  const monitor = data?.newMonitor;
    // await prisma.$executeRaw`TRUNCATE TABLE "Monitor" RESTART IDENTITY CASCADE`;

  console.log('monitor', monitor);

  if (loading) {
    return <h3 className='text-xl font-bold'>Загрузка монитора...</h3>;
  }

  if (!monitor) {
    return <h3 className='text-xl font-bold'>Монитор пуст</h3>;
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-5">
        <h2 className="text-xl font-bold mb-3">Монитор</h2>

        <div className="flex flex-col items-center justify-center gap-3">
          {monitor?.map((item: Monitor) => (
            <AdminMonitorItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
