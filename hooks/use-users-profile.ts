import { Api } from '@/services/api-client';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

interface Props {
  isInterval: boolean;
  intervalTime: number;
  userId: string;
  currentUserStatus: string;
  searchQuery: string;
  currentUserRole: string;
  date: DateRange | undefined;
}

interface ReturnProps {
  users: FetchUsers;
  loading: boolean;
}

export interface FetchUsers {
  users: User[];
  totalCount?: number;
}

/**
 * хук для получения списка всех пользователей
 * @param isInterval
 * @param intervalTime
 * @returns возвращает список пользователей и статус загрузки
 */
export const useUsersProfile = ({
  isInterval = false,
  intervalTime = 60000,
  userId,
  currentUserStatus,
  searchQuery,
  currentUserRole,
  date,
}: Props): ReturnProps => {
  const [users, setUsers] = useState<FetchUsers>({users: []});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        userId
          ? setUsers({users: [await Api.users.getUser(userId)]})
          : setUsers(
              await Api.users.getUsers(searchQuery, currentUserStatus, currentUserRole, date),
            );
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
  }, [isInterval, intervalTime, userId, searchQuery, currentUserStatus, currentUserRole, date]);

  return { users, loading };
};
