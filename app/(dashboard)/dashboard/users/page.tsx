'use client';

import {
  AdminDatePicker,
  AdminSearchInput,
  AdminSearchSelect,
  AdminUsersView,
} from '@/components/shared';
import { Button } from '@/components/ui';
import { useUsersProfile } from '@/hooks';
import { UserRole, UserStatus } from '@prisma/client';
import { X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { DateRange } from 'react-day-picker';

export default function DashboardUsers() {
  const [isInputClear, setIsInputClear] = React.useState(false);
  const [isInterval, setIsInterval] = React.useState(false);
  const [intervalTime, setIntervalTime] = React.useState(60000);
  const [userId, setUserId] = React.useState<string>('');
  const [currentUserStatus, setCurrentUserStatus] = React.useState<string>('');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [currentUserRole, setCurrentUserRole] = React.useState<string>('');
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const { users, loading } = useUsersProfile({
    isInterval,
    intervalTime,
    userId,
    currentUserStatus,
    searchQuery,
    currentUserRole,
    date,
  });

  const handleClearSearch = () => {
    setUserId('');
    setSearchQuery('');
    setIsInputClear(true);
    setCurrentUserStatus('');
    setCurrentUserRole('');
    setDate(undefined);
  };

  const handleSelectUserStatus = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setCurrentUserStatus(event.target.value as UserStatus);

  const handleSelectUserRole = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setCurrentUserRole(event.target.value as UserRole);

  if (loading) {
    return <p className="text-xl text-center">Загрузка пользователей...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold mt-10 mb-5">Панель управления профилями пользователей</h1>

      <div className=" w-full flex flex-col border border-gray-500 rounded px-2 py-2 mb-5">
        <div className="flex w-full justify-around gap-1 border border-gray-500 rounded px-2 py-2 mb-5">
          <AdminSearchInput
            searchQuery={userId}
            title="ID пользователя"
            className="w-[200px] px-6"
            isClearInput={isInputClear}
            setIsClearInput={setIsInputClear}
            setSearchQuery={setUserId}
          />
          <AdminSearchSelect
            list={UserStatus}
            value={currentUserStatus}
            setQuery={handleSelectUserStatus}
            title="Выбор статуса заказа"
            className="w-[200px] px-6"
          />
          <AdminSearchInput
            searchQuery={searchQuery}
            title="Поиск по: ФИО, email"
            className="w-[200px] px-6"
            isClearInput={isInputClear}
            setIsClearInput={setIsInputClear}
            setSearchQuery={setSearchQuery}
          />
          <AdminSearchSelect
            list={UserRole}
            value={currentUserRole}
            setQuery={handleSelectUserRole}
            title="Выбор статуса заказа"
            className="w-[200px] px-6"
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

      <AdminUsersView fetchUsers={users} handleClearSearch={handleClearSearch} className='w-full' />

      <Link href="/dashboard" className="text-primary font-bold text-2xl mb-3">
        Вернуться в панель администратора
      </Link>
      <Link href="/dashboard/profile" className="text-primary font-bold text-xl mb-3">
        Перейти в профиль администратора
      </Link>
      <Link href="/dashboard/orders" className="text-primary font-bold text-xl mb-3">
        Перейти к управлению заказами
      </Link>
      <Link href="/dashboard/products" className="text-primary font-bold text-xl mb-3">
        Перейти к управлению товарами
      </Link>
    </div>
  );
}
