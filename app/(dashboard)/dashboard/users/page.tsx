'use client';

import {
  AdminDatePicker,
  AdminNavMenu,
  AdminPagination,
  AdminSearchInput,
  AdminSearchSelect,
  AdminUsersView,
  AutoUpdate,
} from '@/components/shared';
import { Button } from '@/components/ui';
import { useUsersProfile } from '@/hooks';
import { UserRole, UserStatus } from '@prisma/client';
import { X } from 'lucide-react';
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
  const [startIndex, setStartIndex] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [autoUpdatePeriod, setAutoUpdatePeriod] = React.useState('minutes');

  const { users, loading } = useUsersProfile({
    isInterval,
    intervalTime,
    userId,
    currentUserStatus,
    searchQuery,
    currentUserRole,
    date,
    startIndex,
    itemsPerPage,
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
    return <h3 className="text-2xl text-center mt-10 mb-10">Загрузка пользователей...</h3>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold mt-10 mb-5">Панель управления профилями пользователей</h1>

      <div className="w-full flex flex-col gap-3 border border-gray-500 rounded px-2 py-2 mb-5">
        <div className="flex w-full justify-around gap-1 border border-gray-500 rounded px-2 py-3">
          <AdminSearchInput
            searchQuery={userId}
            title="ID пользователя"
            className="w-[200px] px-6"
            isClearInput={isInputClear}
            disableClearInput={setIsInputClear}
            setSearchQuery={setUserId}
          />
          <AdminSearchSelect
            list={UserStatus}
            value={currentUserStatus}
            setQuery={handleSelectUserStatus}
            title="Статус пользователя"
            className="w-[200px] px-6"
          />
          <AdminSearchInput
            searchQuery={searchQuery}
            title="Поиск по: ФИО, email"
            className="w-[200px] px-6"
            isClearInput={isInputClear}
            disableClearInput={setIsInputClear}
            setSearchQuery={setSearchQuery}
          />
          <AdminSearchSelect
            list={UserRole}
            value={currentUserRole}
            setQuery={handleSelectUserRole}
            title="Роль пользователя"
            className="w-[200px] px-6"
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
            className="w-[250px] border-black text-black bg-slate-100"
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

      <AdminUsersView fetchUsers={users} handleClearSearch={handleClearSearch} className="w-full" />

      <AdminPagination
        totalCount={users?.totalCount || 0}
        setStartIndex={setStartIndex}
        setItemsPerPage={setItemsPerPage}
        className="flex items-center justify-center w-full gap-7 p-3 mb-5"
      />

      <AdminNavMenu page="users" />
    </div>
  );
}
