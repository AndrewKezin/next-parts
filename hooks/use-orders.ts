import { Api } from '@/services/api-client';
import { Order } from '@prisma/client';
import React from 'react';
import { DateRange } from 'react-day-picker';

interface ReturnProps {
  orders: Order[];
  loading: boolean;
}

/**
 * Хук для получения списка всех заказов с учетом фильтров
 * @param isInterval
 * @param intervalTime
 * @returns возвращает список заказов и статус загрузки
 */
export const useOrders = (
  orderId: string = '',
  isInterval: boolean = false,
  intervalTime: number = 5000,
  searchQuery: string = '',
  orderStatus: string = '',
  date: DateRange | undefined,
): ReturnProps => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchOrders() {
      try {
        // отправить GET запрос на localhost:3000/api/orders?query=qwe чтобы через призму получить из БД список всех заказов
        orderId ? setOrders([await Api.orders.getOrder(orderId)]) : (setOrders(await Api.orders.getOrders(searchQuery, orderStatus, date)));
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
