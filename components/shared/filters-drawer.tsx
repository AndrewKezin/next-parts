'use client';

import React, { useState } from 'react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { cn } from '@/lib/utils';
import { Filters } from './filters';

// Выезжающее окно корзины справа
export const FiltersDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Sheet>
      {/* Кнопка открытия фильтров */}
      <SheetTrigger asChild>{children}</SheetTrigger>

      {/* Контент фильтрации*/}
      <SheetContent
        aria-describedby={undefined}
        side="left"
        className="w-full sm:w-3/4 flex flex-col justify-between pb-0 pt-3 bg-[#f4f1ee] overflow-y-auto">
        <SheetTitle className="hidden">Фильтры</SheetTitle>
        <div className={cn('flex flex-col h-full justify-center py-3 mx-auto')}>
          <SheetHeader>
            <SheetTitle className="hidden">Фильтрация</SheetTitle>
          </SheetHeader>

          <Filters classname="h-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
