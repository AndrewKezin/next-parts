import { getSession } from 'next-auth/react';

export const confirmAdminPassword = async (password: string, id: string, isManagToo?: boolean) => {
  const session = await getSession();

  if (!session) {
    return { isConfirm: false, errorMessage: 'Вы не авторизованы' };
  }

  if (session.user.role !== 'ADMIN' && isManagToo && session.user.role !== 'MANAGER') {
    return { isConfirm: false, errorMessage: 'Недостаточно прав' };
  }

  if (password !== id) {
    return { isConfirm: false, errorMessage: 'Неверный код подтверждения' };
  }
  return { isConfirm: true };
};
