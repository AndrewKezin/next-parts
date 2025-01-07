import { signOut } from 'next-auth/react';
import { logoutUser } from '@/app/actions';

/**
 * Функция для выхода из аккаунта и удаления куки
 */
export default function logOut() {
  signOut({
    callbackUrl: '/',
  });

  // Удаление куки через серверный экшен
  logoutUser();
}
