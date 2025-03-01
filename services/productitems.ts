import { ApiRoutes } from './constants';
import { axiosInstance } from './instance';

export interface ProductItemVariants {
  thickness: number;
  quantityOfTeeth: number;
  volume: number;
}

// метод для получения всех возможных вариантов толщины дисков, количества зубов и объема канистры масла
// отправляет GET запрос на localhost:3000/api/productitems
export const getAll = async () => {
  return (await axiosInstance.get<ProductItemVariants[]>(ApiRoutes.PRODUCTITEMS)).data;
};
