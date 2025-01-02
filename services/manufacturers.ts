import { GearboxManufacturer } from '@prisma/client';
import { ApiRoutes } from './constants';
import { axiosInstance } from './instance';

// метод для получения всех производителей трансмиссий
// отправляет GET запрос на localhost:3000/api/manufacturers
export const getManufacturers = async () => {
  return (await axiosInstance.get<GearboxManufacturer[]>(ApiRoutes.MANUFACTURERS)).data;
};
