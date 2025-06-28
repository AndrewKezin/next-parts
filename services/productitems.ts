import { ApiRoutes } from './constants';
import { axiosInstance } from './instance';
import { ProductItem } from '@prisma/client';

export interface ProductItemVariants {
  thickness: number;
  quantityOfTeeth: number;
  volume: number;
}

// метод для получения всех возможных вариантов толщины дисков, количества зубов и объема канистры масла (всех productItem товара)
// отправляет GET запрос на localhost:3000/api/productitems
export const getAll = async () => {
  return (await axiosInstance.get<ProductItemVariants[]>(ApiRoutes.PRODUCTITEMS)).data;
};

// получение productItem по productItem.id
export const getItem = async (id: string) => {
  return (await axiosInstance.get<ProductItem>(ApiRoutes.PRODUCTITEM + '/' + id)).data;
};
