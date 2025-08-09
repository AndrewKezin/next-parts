'use client';

import {
  AdminDatePicker,
  AdminSearchInput,
  AdminSearchSelect,
  AutoUpdate,
} from '@/components/shared';
import { Button } from '@/components/ui';
import { useUsersProfile } from '@/hooks';
import { FetchUsers } from '@/hooks/use-users-profile';
import { cn } from '@/lib/utils';
import { UserRole, UserStatus } from '@prisma/client';
import { addDays } from 'date-fns';
import { X } from 'lucide-react';
import React, { useEffect } from 'react';
import { DateRange } from 'react-day-picker';

interface Props {
  startIndex: number;
  itemsPerPage: number;
  getUsers: (users: FetchUsers) => void;
  setIsLoading: (loading: boolean) => void;
  doneClearSearch: boolean;
  setClearSearch: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export const AdminUsersFilters: React.FC<Props> = ({
  startIndex,
  itemsPerPage,
  getUsers,
  setIsLoading,
  doneClearSearch = false,
  setClearSearch,
  className,
}) => {
  const [isInputClear, setIsInputClear] = React.useState(false);
  const [isInterval, setIsInterval] = React.useState(false);
  const [intervalTime, setIntervalTime] = React.useState(60000);
  const [autoUpdatePeriod, setAutoUpdatePeriod] = React.useState('minutes');
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
    // прибавить 1 день к дате "до", чтобы выбранный день входил в диапазон поиска
    date: date && date.to && { from: date.from, to: addDays(date.to, 1) },
    startIndex,
    itemsPerPage,
  });

  useEffect(() => {
    getUsers(users);
    setIsLoading(loading);
  }, [users, loading, getUsers, setIsLoading]);

  useEffect(() => {
    if (doneClearSearch) {
      handleClearSearch();
      setClearSearch(false);
    }
  }, [doneClearSearch]);

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

  if (loading)
    return (
      <h2 className="text-xl flex-1 text-center font-bold text-gray-500">
        Загрузка пользователей...
      </h2>
    );

  return (
    <div className={cn('w-full flex flex-col gap-3 px-2 py-2 mb-5', className)}>
      <div className="flex flex-col lg:flex-row w-full justify-around items-center lg:items-end gap-1 px-2 mb-3">
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

      <div className="flex flex-col lg:flex-row w-full lg:justify-around items-center gap-1 px-2 py-2">
        <Button
          variant={'outline'}
          className="w-[250px] border-black text-black bg-slate-100 mb-2"
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
  );
};
