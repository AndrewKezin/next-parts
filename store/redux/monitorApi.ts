import { axiosInstance } from '@/services/instance';
import { createApi } from '@reduxjs/toolkit/query/react';

// RTK Query

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

export const monitorApi = createApi({
  // редьюсер
  reducerPath: 'monitorApi',
  //   базовый URL
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  //   теги
  tagTypes: ['Monitor'],
  //   эндпоинты
  endpoints: (build) => ({
    getMonitor: build.query({
      query: () => ({
        url: `/monitor`,
        method: 'GET',
      }),
      providesTags: ['Monitor'],
    }),
    deleteItem: build.mutation({
      query: (id) => ({
        url: `/monitor/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Monitor'],
    }),
  }),
});

export const { useGetMonitorQuery, useDeleteItemMutation } = monitorApi;
