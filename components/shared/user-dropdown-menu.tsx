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
  CircleUser,
  ContactRound,
  LogOut,
  PackageOpen,
  ScrollText,
  Settings,
  Settings2,
  UserRoundCog,
} from 'lucide-react';
import logOut from '@/lib/log-out';

interface Props {
  className?: string;
}

export const UserDropdownMenu: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2 text-primary border border-primary py-1 px-3 rounded-2xl visited:text-primary">
              {/* <Settings className="w-5 h-5" /> */}
              {/* <CircleUser className="w-5 h-5" /> */}
              Профиль
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[180px] gap-8 z-[100]">
                <li>
                  <NavigationMenuLink asChild className="">
                    <Link
                      href="/profile"
                      className="flex items-center justify-start gap-2 p-3 hover:bg-gray-200 hover:text-primary rounded-2xl">
                      <UserRoundCog className="w-6 h-6 text-primary" />
                      Профиль
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/profile/orders"
                      className="flex items-center justify-start gap-2 p-3 hover:bg-gray-200 hover:text-primary rounded-2xl">
                      <ScrollText className="w-6 h-6 text-primary" />
                      Заказы
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <div
                      onClick={() => logOut()}
                      className="flex items-center justify-start gap-2 p-3 hover:bg-gray-200 hover:text-primary rounded-2xl cursor-pointer">
                      <LogOut size={23} className="w-6 h-6 text-primary" />
                      Выход
                    </div>
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
