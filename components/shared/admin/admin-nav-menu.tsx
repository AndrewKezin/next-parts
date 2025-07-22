import { ContactRound, PackageOpen, ScrollText, Settings2, UserRoundCog } from 'lucide-react';
import { AdminNavMenuItem } from './admin-nav-menu-item';

interface Props {
  page: 'dashboard' | 'profile' | 'orders' | 'products' | 'users';
}

export const AdminNavMenu: React.FC<Props> = ({ page }) => {
  return (
    <div className="flex flex-col items-center justify-center w-[250px] gap-1 p-3">
      {page !== 'dashboard' && (
        <AdminNavMenuItem url="/dashboard">
          <>
            <div className="w-9">
              <Settings2 className="w-6 h-6 text-primary" />
            </div>
            <span className="flex-1 text-center">Админпанель</span>
          </>
        </AdminNavMenuItem>
      )}
      {page !== 'profile' && (
        <AdminNavMenuItem url="/dashboard/profile">
          <>
            <div className="w-9">
              <UserRoundCog className="w-6 h-6 text-primary" />
            </div>
            <span className="flex-1 text-center">Профиль</span>
          </>
        </AdminNavMenuItem>
      )}
      {page !== 'orders' && (
        <AdminNavMenuItem url="/dashboard/orders">
          <>
            <div className="w-9">
              <ScrollText className="w-6 h-6 text-primary" />
            </div>
            <span className="flex-1 text-center">Заказы</span>
          </>
        </AdminNavMenuItem>
      )}
      {page !== 'products' && (
        <AdminNavMenuItem url="/dashboard/products">
          <>
            <div className="w-9">
              <PackageOpen className="w-6 h-6 text-primary" />
            </div>
            <span className="flex-1 text-center">Товары</span>
          </>
        </AdminNavMenuItem>
      )}
      {page !== 'users' && (
        <AdminNavMenuItem url="/dashboard/users">
          <>
            <div className="w-9">
              <ContactRound className="w-6 h-6 text-primary" />
            </div>
            <span className="flex-1 text-center">Клиенты</span>
          </>
        </AdminNavMenuItem>
      )}
    </div>
  );
};
