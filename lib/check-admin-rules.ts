// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { authOptions } from './auth-options';
import { getServerSession } from 'next-auth';

/**
 * Проверяет права администратора или менеджера
 * @param checkManagerRules 
 * @returns 
 */
export const checkAdminRules = async (checkManagerRules?: boolean): Promise<{ message: string; status: number }> => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { message: 'Вы не авторизованы', status: 401 };
  }

  if (session.user.role !== 'ADMIN' && (checkManagerRules && session.user.role !== 'MANAGER')) {
    return { message: 'Недостаточно прав', status: 403 };
  }
  return { message: '', status: 200 };
};
