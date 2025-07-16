import { FetchUsers } from '@/hooks/use-users-profile';
import { axiosInstance } from '@/services/instance';
import { User } from '@prisma/client';
import { createApi } from '@reduxjs/toolkit/query/react';

// RTK Query
interface Props {
  searchQuery: string;
  currentUserStatus: string;
  currentUserRole: string;
  dateFrom: string;
  dateTo: string;
  startIndex: number;
  itemsPerPage: number;
}

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({
    url,
    method,
    data,
    params,
    headers,
  }: {
    url: string;
    method?: string;
    data?: any;
    params?: any;
    headers?: any;
  }) => {
    try {
      const result = await axiosInstance({ url: baseUrl + url, method, data, params, headers });
      return { data: result.data };
    } catch (axiosError) {
      const err: any = axiosError;
      return { error: { status: err.response?.status, data: err.response?.data || err.message } };
    }
  };

export const usersApi = createApi({
  // редьюсер
  reducerPath: 'usersApi',
  // базовый url
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  // тэги
  tagTypes: ['Users', 'User'],
  // эндпоинты
  endpoints: (build) => ({
    // получить всех пользователей с учетом фильтрации
    getAllUsers: build.query<FetchUsers, Props>({
      query: ({
        searchQuery,
        currentUserStatus,
        currentUserRole,
        dateFrom,
        dateTo,
        startIndex,
        itemsPerPage,
      }) => ({
        url: `/users`,
        method: 'GET',
        params: {
          searchQuery,
          currentUserStatus,
          currentUserRole,
          dateFrom,
          dateTo,
          startIndex: String(startIndex),
          itemsPerPage: String(itemsPerPage),
        },
      }),
      providesTags: ['Users'],
    }),
    // получить пользователя по id
    getUser: build.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
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
