'use client';

import React from 'react';
import { AdminMonitorItem } from './admin-monitor-item';
import { useDeleteAllItemsMutation, useGetMonitorQuery } from '@/store/redux/monitorApi';
import { Monitor } from '@prisma/client';
import { Trash } from 'lucide-react';

export const AdminMonitor: React.FC = () => {
  const { data, isLoading: loading } = useGetMonitorQuery(
    {},
    { pollingInterval: 300000, refetchOnMountOrArgChange: true },
  );
  const [deleteAllItems, { isLoading: loadingDelete }] = useDeleteAllItemsMutation();

  const monitor: Monitor[] = data?.newMonitor;

  if (loading || loadingDelete) {
    return (
      <h3 className="text-xl flex-1 text-center font-bold text-gray-500">Загрузка монитора...</h3>
    );
  }

  if (!monitor.length) {
    return (
      <h3 className="text-xl flex-1 text-center font-bold text-green-700">Новых событий нет</h3>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full gap-2 p-3">
      <h2 className="text-xl font-bold mb-3">Монитор</h2>

      <div className="flex flex-col items-center justify-center gap-3 mb-10">
        {monitor?.map((item: Monitor) => (
          <AdminMonitorItem key={item.id} item={item} />
        ))}
      </div>

      <div className="w-full flex items-center justify-around">
        <button
          onClick={() => deleteAllItems({})}
          className="w-[150px] h-[50px] flex items-center justify-center rounded-xl bg-gray-200 font-bold mb-5 hover:bg-gray-300">
          <Trash className="w-5 h-5 mr-2" />
          Удалить всё
        </button>
      </div>
    </div>
  );
};
