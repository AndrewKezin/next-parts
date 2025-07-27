'use client';

import { Monitor, WarnEvent } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { MonitorItemButton } from './mon-item-button';
import { useDeleteItemMutation } from '@/store/redux/monitorApi';
import { cn } from '@/lib/utils';
import { EventIntervals } from '@/@types/monitor';

interface Props {
  item: Monitor;
  className?: string;
}

export const AdminMonitorItem: React.FC<Props> = ({ item, className }) => {
  const linkProps = {
    target: '_blank',
    className: 'ml-2',
  };

  const [deleteItem, { isLoading: loading }] = useDeleteItemMutation();

  const setChecked = (id: number) => {
    deleteItem(id);
  };

  const createdTime = new Date(item.createdAt).getTime();

  return (
    <div
      className={cn(
        'flex justify-between items-center gap-5 px-2 w-[600px] h-[50px] rounded-[5px] bg-gray-200 font-semibold',
        { 'bg-green-200 animate-pulse': createdTime + EventIntervals.New > Date.now() },
        { 'bg-red-200 animate-pulse': createdTime + EventIntervals.Old < Date.now() },
        { 'bg-gray-300 bg-transparent': loading },
      )}>
      {/* Добавлен заказ */}
      {item.warnEvent === WarnEvent.ORDER && (
        <>
          <Link href={`/dashboard/orders/${item.orderId}`} {...linkProps}>
            {item.message} #{item.orderId} {new Date(item.createdAt).toLocaleString()}
          </Link>

          <div className="flex gap-2">
            <MonitorItemButton
              setChecked={() => setChecked(item.id)}
              type="check"
              title="Обработано"
              disabled={loading}
            />
          </div>
        </>
      )}

      {/* Добавлен / редактирован товар */}
      {item.warnEvent === WarnEvent.PRODUCT && (
        <>
          <Link href={`/product/${item.productId}`} {...linkProps}>
            {item.message} {item.productId} {new Date(item.createdAt).toLocaleString()}
          </Link>

          <MonitorItemButton
            setChecked={() => setChecked(item.id)}
            type="check"
            title="Прочитано"
          />
        </>
      )}

      {/* Добавлен клиент */}
      {item.warnEvent === WarnEvent.USER && (
        <>
          <Link href={`/dashboard/users/${item.userId}`} {...linkProps}>
            {item.message} {new Date(item.createdAt).toLocaleString()}
          </Link>

          <MonitorItemButton
            setChecked={() => setChecked(item.id)}
            type="check"
            title="Прочитано"
          />
        </>
      )}

      {/* Остатки товаров */}
      {item.warnEvent === WarnEvent.OTHER && (
        <>
          <Link
            href={`/dashboard/products?prodItemId=${String(item.productItemId)}`}
            {...linkProps}>
            Товар {item.productItemId}: {item.message}
          </Link>

          <MonitorItemButton
            setChecked={() => setChecked(item.id)}
            type="check"
            title="Прочитано"
          />
        </>
      )}
    </div>
  );
};
