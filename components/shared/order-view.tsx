import { cn } from '@/lib/utils';
import { Order } from '@prisma/client';
import React from 'react';

interface Props {
  order: Order;
  className?: string;
}

export const OrderView: React.FC<Props> = ({ order, className }) => {
  return (
    <table className="w-full mb-8 border-collapse border border-slate-700 table-auto">
      <colgroup>
        <col className="w-1/4" />
        <col className="w-3/4" />
      </colgroup>
      <tbody>
        <tr>
          <td className="px-4 py-2 border border-black font-bold">Заказ №</td>
          <td className="px-4 py-2 border border-black">{order?.id}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border border-black font-bold">Статус</td>
          <td
            className={cn(
              'px-4 py-2 border border-black font-bold',
              { 'text-red-800': order.status === 'CANCELED' },
              { 'text-green-800': order.status === 'SUCCESS' },
              { 'text-yellow-800': order.status === 'PENDING' },
              { 'text-blue-800': order.status === 'PROCESSING' },
            )}>
            {order.status === 'CANCELED' && 'Отменен'}
            {order.status === 'SUCCESS' && 'Выполнен'}
            {order.status === 'PENDING' && 'В обработке'}
            {order.status === 'PROCESSING' && 'В доставке'}
          </td>
        </tr>
        <tr>
          <td className="px-4 py-2 border border-black font-bold">Сумма заказа</td>
          <td className="px-4 py-2 border border-black">{order?.totalAmount} ₽</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border border-black font-bold">Адрес доставки</td>
          <td className="px-4 py-2 border border-black">{order?.address}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border border-black font-bold">Комментарии</td>
          <td className="px-4 py-2 border border-black">{order?.comment}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border border-black font-bold">Создан</td>
          <td className="px-4 py-2 border border-black">{order?.createdAt.toLocaleString()}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border border-black font-bold">Обновлен</td>
          <td className="px-4 py-2 border border-black">{order?.updatedAt.toLocaleString()}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border border-black font-bold">Телефон</td>
          <td className="px-4 py-2 border border-black">{order?.phone}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border border-black font-bold">Почта</td>
          <td className="px-4 py-2 border border-black">{order?.email}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border border-black font-bold">ФИО</td>
          <td className="px-4 py-2 border border-black">{order?.fullName}</td>
        </tr>
      </tbody>
    </table>
  );
};
