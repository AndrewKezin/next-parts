'use client';

import { transliterate } from '@/lib/transliterate';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';
import React from 'react';

interface Props {
  items: Category[];
  className?: string;
}

// const cats = [
//   { id: 1, name: 'Комплекты', catName: 'komplekty' },
//   { id: 2, name: 'Расходники', catName: 'raskhodniki' },
//   { id: 3, name: 'Диски', catName: 'diski' },
//   { id: 4, name: 'Железо', catName: 'zhelezo' },
//   { id: 5, name: 'Электрика', catName: 'elektrika' },
//   { id: 6, name: 'Гидроблоки', catName: 'gidrobloki' },
//   { id: 7, name: 'Масла', catName: 'masla' },
//   { id: 8, name: 'Инструмент', catName: 'instrument' },
// ];

export const Categories: React.FC<Props> = ({ items, className }) => {
  // получить id активной категории из глобального стейта zustand
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
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
