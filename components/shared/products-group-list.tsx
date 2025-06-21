'use client';

import React, { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { Title } from './title';
import { cn } from '@/lib/utils';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/store/category';
import { transliterate } from '@/lib/transliterate';
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/store';

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  classname?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  categoryId,
  classname,
  listClassName,
}) => {
  // сохраняем id активной категории в глобальный стейт zustand
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  // получаем список товаров в корзине
  const { items: itemsInCart } = useCartStore((state) => state);

  // ref для intersection observer. Нужен для слежения за положением блока контента
  const intersectionRef = useRef(null);
  // слежение за положением блока контента на странице
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.1,
  });

  useEffect(() => {
    // если блок контента находится в зоне видимости, то устанавливаем активную категорию
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting]);

  return (
    <div className={classname} id={transliterate(title)} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      {/* Сетка товаров */}
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={i}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            manufacturer={product.gearboxesManufacturers}
            itemsInCart={itemsInCart}
            prodItems={product.items}
          />
        ))}
      </div>
    </div>
  );
};
