// этот файл не реэкспортировать, иначе будет ошибка (из-за выполнения на сервере)

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

/** Функция авторизации, которая вернет информацию о пользователе в виде сессии. Эта функция отрабатывает на сервере (благодаря getServerSession), поэтому выполняется еще до рендера страницы. Поэтому неавторизованный пользователь не увидит страницу, которая предназначена для авторизованных пользователей. */
export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  // вернуть пользователя или null
  return session?.user ?? null;
};
