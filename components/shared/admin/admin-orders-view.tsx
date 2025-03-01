import { cn } from '@/lib/utils';
import React from 'react';
import Link from 'next/link';
import { getLocalFormatDate } from '@/lib';
import { QUERY, QueryNotExist } from './query-not-exist';
import { FetchOrders } from '@/hooks/use-orders';

interface Props {
  fetchOrders: FetchOrders;
  handleClearSearch: () => void;
  className?: string;
}

export const AdminOrdersView: React.FC<Props> = ({ fetchOrders, handleClearSearch, className }) => {
  const { orders, totalCount } = fetchOrders;

  if (orders.every((order) => order === null)) {
    return <QueryNotExist query={QUERY.ORDER} handleClearSearch={handleClearSearch} />;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center w-full">
        <h2 className="text-4xl font-bold mt-10 mb-7">Заказы не найдены</h2>

        <Link href="/dashboard" className="text-primary font-bold text-2xl mb-3">
          Вернуться в панель администратора
        </Link>
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      {!orders || orders.length === 0 ? (
        <p className="text-xl mb-5 text-center">Нет заказов</p>
      ) : (
        <>
          <p className="text-left mb-3">
            Всего заказов в базе данных: <b>{totalCount}</b> | Заказов, удовлетворяющих запросам:{' '}
            <b>{orders.length}</b>
          </p>
          <table className="table-auto w-full mb-10 border-collapse border border-black">
            <thead className="bg-slate-200 border border-black">
              <tr>
                <th className="border border-black px-2">№ заказа</th>
                <th className="border border-black px-2">Клиент</th>
                <th className="border border-black px-2">Сумма, ₽</th>
                <th className="border border-black px-2">Адрес доставки</th>
                <th className="border border-black px-2">Статус</th>
                <th className="border border-black px-2">Комментарий</th>
                <th className="border border-black px-2">Телефон</th>
                <th className="border border-black px-2">Создан</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="border border-black px-2 text-center">
                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      target="_blank"
                      className="w-full inline-block text-center text-blue-800 underline">
                      {order.id}
                    </Link>
                  </td>
                  <td className="border border-black px-2">{order.fullName}</td>
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
                  <td className="border border-black px-2">{order.phone}</td>
                  <td className="border border-black px-2">
                    {getLocalFormatDate(order.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
