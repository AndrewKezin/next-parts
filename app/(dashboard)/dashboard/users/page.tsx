'use client';

import { AdminPagination, AdminUsersFilters, AdminUsersView } from '@/components/shared';
import { FetchUsers } from '@/hooks/use-users-profile';
import React, { useState } from 'react';

export default function DashboardUsers() {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [users, setUsers] = useState<FetchUsers>({ users: [] });
  const [loading, setLoading] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);

  const getUsers = (users: FetchUsers) => setUsers(users);
  const setIsLoading = (loading: boolean) => setLoading(loading);

  const handleClearSearch = () => {
    setClearSearch(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl lg:text-4xl font-bold mt-10 mb-5 text-center">
        Панель управления профилями пользователей
      </h1>

      <AdminUsersFilters
        startIndex={startIndex}
        itemsPerPage={itemsPerPage}
        getUsers={getUsers}
        setIsLoading={setIsLoading}
        doneClearSearch={clearSearch}
        setClearSearch={setClearSearch}
        className="w-full"
      />

      <AdminUsersView
        fetchUsers={users}
        handleClearSearch={handleClearSearch}
        className="w-full overflow-auto"
      />

      <AdminPagination
        totalCount={users?.totalCount || 0}
        setStartIndex={setStartIndex}
        setItemsPerPage={setItemsPerPage}
        className="flex flex-col lg:flex-row items-center justify-center w-full gap-7 p-3 mb-5"
      />
    </div>
  );
}
