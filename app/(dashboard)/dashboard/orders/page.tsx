'use client';

import {
  AdminDatePicker,
  AdminNavMenu,
  AdminOrdersView,
  AdminPagination,
  AdminSearchInput,
  AdminSearchSelect,
  AutoUpdate,
} from '@/components/shared';
import { useOrders } from '@/hooks';
import { OrderStatus } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { Button } from '@/components/ui';
import { X } from 'lucide-react';

export default function DashboardOrders() {
  const [isInterval, setIsInterval] = useState(false);
  const [intervalTime, setIntervalTime] = useState(1);
  const [autoUpdatePeriod, setAutoUpdatePeriod] = useState('minutes');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderId, setOrderId] = useState('');
  const [currentOrderStatus, setCurrentOrderStatus] = useState('');
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [isInputClear, setIsInputClear] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    if (searchQuery.length > 0) setIsInterval(false);
  }, [searchQuery]);

  // получение списка заказов с учетом фильтров
  const { orders, loading } = useOrders({
    orderId,
    isInterval,
    intervalTime,
    searchQuery,
    orderStatus: currentOrderStatus,
    // прибавить 1 день к дате "до", чтобы выбранный день входил в диапазон поиска
    date: date && date.to && { from: date.from, to: addDays(date.to, 1) },
    startIndex,
    itemsPerPage,
  });

  const { totalCount } = orders;

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

  if (loading) {
    return <h3 className="text-xl font-bold mt-20 mb-5 text-center">Загрузка заказов...</h3>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-4xl font-bold mt-10 mb-7">Администрирование заказов</h1>

      {/* Фильтрация */}
      <div className="flex flex-col px-2 py-2 mb-5">
        <div className="flex w-full justify-around gap-2 px-2 py-3 mb-5">
          <AdminSearchInput
            searchQuery={orderId}
            title="Поиск по номеру заказа"
            className="w-[300px] px-6"
            isClearInput={isInputClear}
            disableClearInput={setIsInputClear}
            setSearchQuery={setOrderId}
          />
          <AdminSearchInput
            searchQuery={searchQuery}
            title="Поиск по: клиенту, адресу, телефону"
            className="w-[300px] px-6"
            isClearInput={isInputClear}
            disableClearInput={setIsInputClear}
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

        <div className="flex w-full justify-around items-center gap-1 px-2 py-2">
          <Button
            variant={'outline'}
            className="w-[250px] mb-5 border-black text-black bg-slate-100"
            onClick={handleClearSearch}>
            <X className="mr-2" />
            Сбросить параметры поиска
          </Button>

          <AutoUpdate
            autoUpdate={isInterval}
            setAutoUpdate={setIsInterval}
            intervalTime={intervalTime}
            setIntervalTime={setIntervalTime}
            autoUpdatePeriod={autoUpdatePeriod}
            setAutoUpdatePeriod={setAutoUpdatePeriod}
          />
        </div>
      </div>

      {/* Список заказов */}
      <AdminOrdersView fetchOrders={orders} handleClearSearch={handleClearSearch} />

      {/* Пагинация */}
      {orders && totalCount && totalCount > 1 && (
        <AdminPagination
          totalCount={totalCount}
          setStartIndex={setStartIndex}
          setItemsPerPage={setItemsPerPage}
          className="flex items-center justify-center w-full gap-7 p-3 mb-5"
        />
      )}
    </div>
  );
}
