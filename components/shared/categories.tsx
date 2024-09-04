'use client';

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import React from 'react';

interface Props {
  className?: string;
}

const cats = [
  { id: 0, name: 'Комплекты', catName: 'komplekty' },
  { id: 1, name: 'Расходники', catName: 'rashodniki' },
  { id: 2, name: 'Диски', catName: 'diski' },
  { id: 3, name: 'Железо', catName: 'zhelezo' },
  { id: 4, name: 'Электрика', catName: 'elektrika' },
  { id: 5, name: 'Гидроблоки', catName: 'gidrobloki' },
  { id: 6, name: 'Масла', catName: 'masla' },
  { id: 7, name: 'Инструмент', catName: 'instrument' },
];

export const Categories: React.FC<Props> = ({ className }) => {
  // получить id активной категории из глобального стейта zustand
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {cats.map(({name, id, catName}, index) => (
        <a
          key={index}
          href={`/#${catName}`}
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

