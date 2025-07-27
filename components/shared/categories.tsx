'use client';

import { transliterate } from '@/lib/transliterate';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store';
import { Category } from '@prisma/client';
import React from 'react';

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  // получить id активной категории из глобального стейта zustand
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl overflow-x-auto', className)}>
      {items.map(({ name, id }, index) => (
        <a
          key={index}
          href={`/#${transliterate(name)}`}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary',
          )}>
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
