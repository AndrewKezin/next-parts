import { Api } from '@/services/api-client';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';

interface ReturnProps {
    users: User[];
    loading: boolean;
}

/**
 * хук для получения списка всех пользователей
 * @param isInterval 
 * @param intervalTime 
 * @returns возвращает список пользователей и статус загрузки
 */
export const useUsersProfile = (isInterval: boolean = false, intervalTime: number = 60000): ReturnProps => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        // отправить GET запрос на localhost:3000/api/users чтобы через призму получить из БД список всех пользователей
        const data = await Api.users.getUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    let fetchInterval: NodeJS.Timeout;
    if (!isInterval) {
      fetchUsers();
    } else {
      fetchInterval = setInterval(() => {
        fetchUsers();
      }, intervalTime);
    }

    return () => {
      clearInterval(fetchInterval);
    };
  }, [ isInterval, intervalTime ]);

  return { users, loading };
};
