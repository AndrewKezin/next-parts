import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { DateRange } from 'react-day-picker';
import { FetchUsers } from '@/hooks/use-users-profile';
import { User } from '@prisma/client';

// метод для получения пользователя по его id
// отправляет GET запрос на localhost:3000/api/users/:id
export const getUser = async (id: string) => {
  return (await axiosInstance.get<User>(ApiRoutes.USERS + '/' + id)).data;
};

// метод для получения всех пользователей по фильтрам
// отправляет GET запрос на localhost:3000/api/users
export const getUsers = async (
  searchQuery: string,
  currentUserStatus: string,
  currentUserRole: string,
  date: DateRange | undefined,
) => {
  return (
    await axiosInstance.get<FetchUsers>(ApiRoutes.USERS, {
      params: { searchQuery, currentUserStatus, currentUserRole, date },
    })
  ).data;
};
