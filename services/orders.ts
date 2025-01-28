import { Order } from '@prisma/client';
import { ApiRoutes } from './constants';
import { axiosInstance } from './instance';
import { DateRange } from 'react-day-picker';

// метод для получения всех заказов по заданным фильтрам
// отправляет GET запрос на localhost:3000/api/orders?query=qwe
export const getOrders = async (query: string, orderStatus: string, date: DateRange | undefined): Promise<Order[]> => {
  return (await axiosInstance.get<Order[]>(ApiRoutes.ORDERS, {params: { query, orderStatus, date }})).data;
};

// или по id заказа
// отправляет GET запрос на localhost:3000/api/orders/:id
export const getOrder = async (id: string): Promise<Order> => {
  return (await axiosInstance.get<Order>(ApiRoutes.ORDERS + '/' + id)).data;
}