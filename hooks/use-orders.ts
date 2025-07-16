import { useGetAllOrdersQuery, useGetOrderQuery } from '@/store/redux/ordersApi';
import { Order } from '@prisma/client';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

interface Props {
  orderId: string;
  isInterval: boolean;
  intervalTime: number;
  searchQuery: string;
  orderStatus: string;
  date: DateRange | undefined;
  startIndex: number;
  itemsPerPage: number;
}

interface ReturnProps {
  orders: FetchOrders;
  loading: boolean;
}

export interface FetchOrders {
  orders: Order[];
  totalCount?: number;
}

/**
 * Хук для получения списка всех заказов с учетом фильтров
 * @param isInterval
 * @param intervalTime
 * @returns возвращает список заказов и статус загрузки
 */
export const useOrders = ({
  orderId,
  isInterval = false,
  intervalTime = 60000,
  searchQuery,
  orderStatus,
  date,
  startIndex,
  itemsPerPage,
}: Props): ReturnProps => {
  const [orders, setOrders] = useState<FetchOrders>({ orders: [] });
  const [loading, setLoading] = useState(true);

  const { data, isLoading, isError } = useGetOrderQuery(orderId);

  const {
    data: allOrders,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useGetAllOrdersQuery(
    {
      searchQuery,
      orderStatus,
      dateFrom: date?.from?.toISOString() || '',
      dateTo: date?.to?.toISOString() || '',
      startIndex,
      itemsPerPage,
    },
    { pollingInterval: isInterval ? intervalTime : 0, refetchOnFocus: true },
  );

  useEffect(() => {
    setLoading(true);
    if (isError || isErrorAll) {
      console.log('Error fetching users');
      setLoading(false);
      return;
    }

    if (!data) setOrders({ orders: [] });
    if (orderId && data?.id === Number(orderId)) {
      setOrders({ orders: [data] });
    }
    if (!orderId && allOrders) setOrders(allOrders);

    if (!isLoading && !isLoadingAll) {
      setLoading(false);
    }
  }, [isLoading, isError, isLoadingAll, isErrorAll, data, allOrders, orderId]);

  return { orders, loading };
};
