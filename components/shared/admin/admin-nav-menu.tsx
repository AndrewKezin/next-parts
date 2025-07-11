import { ContactRound, PackageOpen, ScrollText, Settings2, UserRoundCog } from 'lucide-react';
import { AdminNavMenuItem } from './admin-nav-menu-item';

interface Props {
  page: 'dashboard' | 'profile' | 'orders' | 'products' | 'users';
}

export const AdminNavMenu: React.FC<Props> = ({ page }) => {
  return (
    <div className="flex flex-col gap-1 mb-5">
      {page !== 'dashboard' && (
        <AdminNavMenuItem url="/dashboard">
          <>
            <div className="w-9">
              <Settings2 className="w-6 h-6 text-primary" />
            </div>
            <span className="flex-1 text-center">Вернуться в панель администратора</span>
          </>
        </AdminNavMenuItem>
      )}
      {page !== 'profile' && (
        <AdminNavMenuItem url="/dashboard/profile">
          <>
            <div className="w-9">
              <UserRoundCog className="w-6 h-6 text-primary" />
            </div>
            <span className="flex-1 text-center">Перейти в профиль администратора</span>
          </>
        </AdminNavMenuItem>
      )}
      {page !== 'orders' && (
        <AdminNavMenuItem url="/dashboard/orders">
          <>
            <div className="w-9">
              <ScrollText className="w-6 h-6 text-primary" />
            </div>
            <span className="flex-1 text-center">Перейти к управлению заказами</span>
          </>
        </AdminNavMenuItem>
      )}
      {page !== 'products' && (
        <AdminNavMenuItem url="/dashboard/products">
          <>
            <div className="w-9">
              <PackageOpen className="w-6 h-6 text-primary" />
            </div>
            <span className="flex-1 text-center">Перейти к управлению товарами</span>
          </>
        </AdminNavMenuItem>
      )}
      {page !== 'users' && (
        <AdminNavMenuItem url="/dashboard/users">
          <>
            <div className="w-9">
              <ContactRound className="w-6 h-6 text-primary" />
            </div>
            <span className="flex-1 text-center">Перейти к управлению профилями пользователей</span>
          </>
        </AdminNavMenuItem>
      )}
    </div>
  );
};
