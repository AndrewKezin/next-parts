import { cn } from '@/lib/utils';
import React from 'react';
import Link from 'next/link';
import { Order } from '@prisma/client';

interface Props {
  orders: Order[];
  type: 'admin' | 'user';
  className?: string;
}

export const UserOrdersView: React.FC<Props> = ({ orders, type, className }) => {
  return (
    <div className={cn('w-full', className)}>
      {!orders ||orders.length === 0 ? (
        <p className="text-xl mb-5 text-center">Нет заказов</p>
      ) : (
        <table className="table-auto w-full mb-10 border-collapse border border-black">
          <thead className="bg-slate-200 border border-black">
            <tr>
              <th className="border border-black px-2">№ заказа</th>
              <th className="border border-black px-2">Сумма, ₽</th>
              <th className="border border-black px-2">Адрес доставки</th>
              <th className="border border-black px-2">Статус</th>
              <th className="border border-black px-2">Комментарий</th>
              <th className="border border-black px-2">Создан</th>
              {type === 'admin' && <th className="border border-black px-2">Обновлен</th>}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border border-black px-2 text-center">
                  {type === 'admin' && (
                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      target="_blank"
                      className="w-full inline-block text-center text-blue-800 underline">
                      {order.id}
                    </Link>
                  )}
                  {type === 'user' && (
                    <Link
                    href={`/profile/orders/${order.id}`}
                    target="_blank"
                    className="w-full inline-block text-center text-blue-800 underline">
                    {order.id}
                  </Link>
                  )}
                </td>
                <td className="border border-black px-2">{order.totalAmount}</td>
                <td className="border border-black px-2">{order.address}</td>
                <td
                  className={cn(
                    'border border-black px-2',
                    { 'bg-red-400': order.status === 'CANCELED' },
                    { 'bg-green-300': order.status === 'SUCCESS' },
                    { 'bg-yellow-200': order.status === 'PENDING' },
                    { 'bg-blue-200': order.status === 'PROCESSING' },
                  )}>
                  {order.status === 'CANCELED' && 'Отменен'}
                  {order.status === 'SUCCESS' && 'Выполнен'}
                  {order.status === 'PENDING' && 'В обработке'}
                  {order.status === 'PROCESSING' && 'В доставке'}
                </td>
                <td className="border border-black px-2">{order.comment}</td>
                <td className="border border-black px-2">{order.createdAt.toLocaleString()}</td>
                {type === 'admin' && (
                  <td className="border border-black px-2">{order.updatedAt.toLocaleString()}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
