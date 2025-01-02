import { Ingredient } from '@prisma/client';
import { ApiRoutes } from './constants';
import { axiosInstance } from './instance';

// метод для получения всех ингредиентов
// отправляет GET запрос на localhost:3000/api/ingredients
export const getAll = async (): Promise<Ingredient[]> => {
  return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
};
