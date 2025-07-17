'use client';

import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import {
  ContactRound,
  PackageOpen,
  ScrollText,
  Settings,
  Settings2,
  UserRoundCog,
} from 'lucide-react';

interface Props {
  className?: string;
}

export const AdminDropdownMenu: React.FC<Props> = ({ className }) => {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2 text-primary border border-primary py-1 px-3 rounded-2xl visited:text-primary">
              <Settings className="w-5 h-5" />
              Admin
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[180px] gap-8 z-[100]">
                <li>
                  <NavigationMenuLink asChild className="">
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-start gap-2 p-3 hover:bg-gray-200 hover:text-primary rounded-2xl">
                      <Settings2 className="w-6 h-6 text-primary" />
                      Админпанель
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center justify-start gap-2 p-3 hover:bg-gray-200 hover:text-primary rounded-2xl">
                      <UserRoundCog className="w-6 h-6 text-primary" />
                      Профиль
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/dashboard/orders"
                      className="flex items-center justify-start gap-2 p-3 hover:bg-gray-200 hover:text-primary rounded-2xl">
                      <ScrollText className="w-6 h-6 text-primary" />
                      Заказы
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/dashboard/products"
                      className="flex items-center justify-start gap-2 p-3 hover:bg-gray-200 hover:text-primary rounded-2xl">
                      <PackageOpen className="w-6 h-6 text-primary" />
                      Товары
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/dashboard/users"
                      className="flex items-center justify-start gap-2 p-3 hover:bg-gray-200 hover:text-primary rounded-2xl">
                      <ContactRound className="w-6 h-6 text-primary" />
                      Клиенты
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
