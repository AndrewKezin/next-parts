import { Api } from '@/services/api-client';
import { Order } from '@prisma/client';
import React from 'react';
import { DateRange } from 'react-day-picker';

interface Props {
  orderId: string;
  isInterval: boolean;
  intervalTime: number;
  searchQuery: string;
  orderStatus: string;
  date: DateRange | undefined;
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
  isInterval=false,
  intervalTime=60000,
  searchQuery,
  orderStatus,
  date,
}: Props): ReturnProps => {
  const [orders, setOrders] = React.useState<FetchOrders>({ orders: [] });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchOrders() {
      try {
        // отправить GET запрос на localhost:3000/api/orders?query=qwe чтобы через призму получить из БД список всех заказов
        orderId
          ? setOrders({ orders: [await Api.orders.getOrder(orderId)] })
          : setOrders(await Api.orders.getOrders(searchQuery, orderStatus, date));
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    let fetchInterval: NodeJS.Timeout;
    if (!isInterval) {
      fetchOrders();
    } else {
      fetchInterval = setInterval(() => {
        fetchOrders();
      }, intervalTime);
    }

    return () => {
      clearInterval(fetchInterval);
    };
  }, [orderId, isInterval, intervalTime, searchQuery, orderStatus, date]);

  return { orders, loading };
};
