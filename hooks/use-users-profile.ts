import { useGetAllUsersQuery, useGetUserQuery } from '@/store/redux/usersApi';
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
  startIndex: number;
  itemsPerPage: number;
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
  startIndex,
  itemsPerPage,
}: Props): ReturnProps => {
  const [users, setUsers] = useState<FetchUsers>({ users: [] });
  const [loading, setLoading] = useState(false);

  const { data, isLoading, isError } = useGetUserQuery(userId);

  const {
    data: allUsers,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useGetAllUsersQuery(
    {
      searchQuery,
      currentUserStatus,
      currentUserRole,
      date,
      startIndex,
      itemsPerPage,
    },
    { pollingInterval: isInterval ? intervalTime : 0, refetchOnFocus: true },
  );

  useEffect(() => {
    setLoading(true);
    if (isError || isErrorAll) {
      console.log('Error fetching users');
      setLoading(false);
      return;
    }

    if (userId && data) setUsers({ users: [data] });
    if (!userId && allUsers) setUsers(allUsers);

    if (!isLoading && !isLoadingAll) {
      setLoading(false);
    }
  }, [isLoading, isError, isLoadingAll, isErrorAll, data, allUsers]);

  // useEffect(() => {
  //   async function fetchUsers() {
  //     try {
  //       setLoading(true);
  //       userId
  //         ? setUsers({ users: [await Api.users.getUser(userId)] })
  //         : setUsers(
  //             await Api.users.getUsers(
  //               searchQuery,
  //               currentUserStatus,
  //               currentUserRole,
  //               date,
  //               String(startIndex),
  //               String(itemsPerPage),
  //             ),
  //           );
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   let fetchInterval: NodeJS.Timeout;
  //   if (!isInterval) {
  //     fetchUsers();
  //   } else {
  //     fetchInterval = setInterval(() => {
  //       fetchUsers();
  //     }, intervalTime);
  //   }

  //   return () => {
  //     clearInterval(fetchInterval);
  //   };
  // }, [
  //   isInterval,
  //   intervalTime,
  //   userId,
  //   searchQuery,
  //   currentUserStatus,
  //   currentUserRole,
  //   date,
  //   startIndex,
  //   itemsPerPage,
  // ]);

  return { users, loading };
};
