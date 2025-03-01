'use client';

import {
  AdminDatePicker,
  AdminOrdersView,
  AdminSearchInput,
  AdminSearchSelect,
  AutoUpdate,
} from '@/components/shared';
import { useOrders } from '@/hooks';
import { OrderStatus } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { Button } from '@/components/ui';
import { X } from 'lucide-react';

export default function DashboardOrders() {
  const [autoUpdate, setAutoUpdate] = React.useState(false);
  const [intervalTime, setIntervalTime] = React.useState(1);
  const [autoUpdatePeriod, setAutoUpdatePeriod] = React.useState('minutes');
  const [interval, setInterval] = React.useState(60000);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [orderId, setOrderId] = React.useState('');
  const [currentOrderStatus, setCurrentOrderStatus] = React.useState('');
  // const [date, setDate] = React.useState<DateRange | undefined>({
  //   from: addDays(new Date(Date.now()), -7),
  //   to: new Date(Date.now()),
  // });
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [isInputClear, setIsInputClear] = React.useState(false);

  // получение списка заказов с учетом фильтров
  const { orders, loading } = useOrders(
    {
      orderId,
      isInterval: autoUpdate,
      intervalTime,
      searchQuery,
      orderStatus: currentOrderStatus,
      date,
    }
  );

  const handleClearSearch = () => {
    setOrderId('');
    setSearchQuery('');
    setIsInputClear(true);
    setCurrentOrderStatus('');
    setDate(undefined);
  };

  // выбор статуса заказа из селекта
  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setCurrentOrderStatus(event.target.value as OrderStatus);

  useEffect(() => {
    if (autoUpdatePeriod === 'minutes') {
      setInterval(intervalTime * 60000);
    } else {
      setInterval(intervalTime * 1000);
    }

    if (searchQuery.length > 0) setAutoUpdate(false);
  }, [autoUpdatePeriod, intervalTime, searchQuery]);

  if (loading) {
    return <p className="text-xl text-center">Загрузка заказов...</p>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-4xl font-bold mt-10 mb-7">Администрирование заказов</h1>

      <AutoUpdate
        autoUpdate={autoUpdate}
        setAutoUpdate={setAutoUpdate}
        intervalTime={intervalTime}
        setIntervalTime={setIntervalTime}
        autoUpdatePeriod={autoUpdatePeriod}
        setAutoUpdatePeriod={setAutoUpdatePeriod}
      />
      <div className="flex flex-col border border-gray-500 rounded px-2 py-2 mb-5">
        <div className="flex w-full justify-around gap-2 border border-gray-500 rounded px-2 py-2 mb-5">
          <AdminSearchInput
            searchQuery={orderId}
            title="Поиск по номеру заказа"
            className="w-[300px] px-6"
            isClearInput={isInputClear}
            setIsClearInput={setIsInputClear}
            setSearchQuery={setOrderId}
          />
          <AdminSearchInput
            searchQuery={searchQuery}
            title="Поиск по: клиенту, адресу, телефону"
            className="w-[300px] px-6"
            isClearInput={isInputClear}
            setIsClearInput={setIsInputClear}
            setSearchQuery={setSearchQuery}
            />
          <AdminSearchSelect
            list={OrderStatus}
            value={currentOrderStatus}
            setQuery={handleSelectStatus}
            title="Выбор статуса заказа"
            className="w-[300px] px-6"
          />
          <AdminDatePicker
            title="Выбор даты (от-) или диапазона дат (от-до)"
            date={date}
            setDate={setDate}
            className="w-[300px]"
          />
        </div>

        <Button
          variant={'outline'}
          className="w-[250px] mb-5 border-black text-black bg-slate-100"
          onClick={handleClearSearch}>
          <X className="mr-2" />
          Сбросить параметры поиска
        </Button>
      </div>

      <AdminOrdersView fetchOrders={orders} handleClearSearch={handleClearSearch} />

      <Link href="/dashboard" className="text-primary font-bold text-2xl mb-3">
        Вернуться в панель администратора
      </Link>
      <Link href="/dashboard/profile" className="text-primary font-bold text-xl mb-3">
        Перейти в профиль администратора
      </Link>
      <Link href="/dashboard/products" className="text-primary font-bold text-xl mb-3">
        Перейти к управлению товарами
      </Link>
      <Link href="/dashboard/users" className="text-primary font-bold text-xl mb-3">
        Перейти к управлению профилями пользователей
      </Link>
    </div>
  );
}
