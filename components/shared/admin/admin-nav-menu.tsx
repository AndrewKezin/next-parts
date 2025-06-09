import Link from 'next/link';

interface Props {
  page: 'profile' | 'orders' | 'products' | 'users';
}

export const AdminNavMenu: React.FC<Props> = ({ page }) => {
  return (
    <>
      <Link href="/dashboard" className="text-primary font-bold text-2xl mb-3">
        Вернуться в панель администратора
      </Link>
      {page !== 'profile' && (
        <Link href="/dashboard/profile" className="text-primary font-bold text-xl mb-3">
          Перейти в профиль администратора
        </Link>
      )}
      {page !== 'orders' && (
        <Link href="/dashboard/orders" className="text-primary font-bold text-xl mb-3">
          Перейти к управлению заказами
        </Link>
      )}
      {page !== 'products' && (
        <Link href="/dashboard/products" className="text-primary font-bold text-xl mb-3">
          Перейти к управлению товарами
        </Link>
      )}
      {page !== 'users' && (
        <Link href="/dashboard/users" className="text-primary font-bold text-xl mb-3">
          Перейти к управлению профилями пользователей
        </Link>
      )}
    </>
  );
};
