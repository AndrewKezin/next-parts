'use client';

import { getLocalFormatDate } from '@/lib';
import { Monitor, WarnEvent } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { MonitorItemButton } from './mon-item-button';
import { useDeleteItemMutation } from '@/store/redux/monitorApi';

interface Props {
  item: Monitor;
  className?: string;
}

export const AdminMonitorItem: React.FC<Props> = ({ item, className }) => {
  const linkProps = {
    target: '_blank',
    className: 'ml-2',
  };

  const [ deleteItem ] = useDeleteItemMutation();

  const handleChecked = (id: number) => {
    console.log('id', id);
    deleteItem(id);
  };

  const handleTimer = (id: number) => {
    console.log('id-timer', id);
  };

  return (
    <div className="flex justify-between items-center gap-5 px-2 w-[600px] h-[50px] rounded-[5px] bg-gray-300 font-semibold">
      {item.warnEvent === WarnEvent.ORDER && (
        <>
          <Link href={`/dashboard/orders/${item.orderId}`} {...linkProps}>
            {item.message} #{item.orderId} {getLocalFormatDate(item.createdAt)}
          </Link>

          <div className="flex gap-2">
            <MonitorItemButton handleChecked={() => handleChecked(item.id)} type="check" />
            <MonitorItemButton handleChecked={() => handleTimer(item.id)} type="timer" />
          </div>
        </>
      )}

      {item.warnEvent === WarnEvent.PRODUCT && (
        <>
          <Link href={`/product/${item.productId}`} {...linkProps}>
            {item.message} {item.productId} {getLocalFormatDate(item.createdAt)}
          </Link>

          <MonitorItemButton handleChecked={() => handleChecked(item.id)} type="check" />
        </>
      )}

      {item.warnEvent === WarnEvent.USER && (
        <>
          <Link href={`/dashboard/users/${item.userId}`} {...linkProps}>
            {item.message} {getLocalFormatDate(item.createdAt)}
          </Link>

          <MonitorItemButton handleChecked={() => handleChecked(item.id)} type="check" />
        </>
      )}

      {item.warnEvent === WarnEvent.OTHER && (
        <>
          <Link href={`/dashboard/products`} {...linkProps}>
            {item.message} {item.productItemId}
          </Link>

          <MonitorItemButton handleChecked={() => handleChecked(item.id)} type="check" />
        </>
      )}
    </div>
  );
};
