import { FetchOrders } from '@/hooks/use-orders';
import { axiosInstance } from '@/services/instance';
import { Order } from '@prisma/client';
import { createApi } from '@reduxjs/toolkit/query/react';

// RTK Query

interface Props {
  searchQuery: string;
  orderStatus: string;
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

export const ordersApi = createApi({
  // редьюсер
  reducerPath: 'ordersApi',
  //   базовый URL
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  //   теги
  tagTypes: ['Orders', 'Order'],
  //   эндпоинты
  endpoints: (build) => ({
    // получить все заказы с учетом фильтрации
    getAllOrders: build.query<FetchOrders, Props>({
      query: ({ searchQuery, orderStatus, dateFrom, dateTo, startIndex, itemsPerPage }) => ({
        url: `/orders`,
        method: 'GET',
        params: {
          searchQuery,
          orderStatus,
          dateFrom,
          dateTo,
          startIndex: String(startIndex),
          itemsPerPage: String(itemsPerPage),
        },
      }),
      providesTags: ['Orders'],
    }),
    // получить заказ по id
    getOrder: build.query<Order, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
  }),
});

export const { useGetAllOrdersQuery, useGetOrderQuery } = ordersApi;
