import { FetchUsers } from '@/hooks/use-users-profile';
import { User } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DateRange } from 'react-day-picker';

interface Props {
  searchQuery: string;
  currentUserStatus: string;
  currentUserRole: string;
  date: DateRange | undefined;
  startIndex: number;
  itemsPerPage: number;
}

// RTK Query
export const usersApi = createApi({
  // редьюсер
  reducerPath: 'usersApi',
  // базовый url
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.NEXT_PUBLIC_MAIN_PAGE_URL as string) + process.env.NEXT_PUBLIC_API_URL,
  }),
  // тэги
  tagTypes: ['Users', 'User'],
  // эндпоинты
  endpoints: (build) => ({
    // получить всех пользователей
    getAllUsers: build.query<FetchUsers, Props>({
      query: ({
        searchQuery,
        currentUserStatus,
        currentUserRole,
        date,
        startIndex,
        itemsPerPage,
      }) =>
        `/users?${new URLSearchParams({
          searchQuery,
          currentUserStatus,
          currentUserRole,
          date: date?.toString() || '',
          startIndex: String(startIndex),
          itemsPerPage: String(itemsPerPage),
        }).toString()}`,
      providesTags: ['Users'],
    }),
    // получить пользователя по id
    getUser: build.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: ['User'],
    }),
    // удаление пользователя
    removeUser: build.mutation({
      query: (password: string) => ({
        url: `/users`,
        body: password,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users', 'User'],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserQuery, useRemoveUserMutation } = usersApi;
