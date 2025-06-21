'use client';

import { Variant } from '@/components/shared/group-variants';
import { ProductItem } from '@prisma/client';
import { useState } from 'react';
import { useSet } from 'react-use';

interface ReturnProps {
  prodItemVariant: string;
  currentItemId: string | undefined;
  selectedIngredients: Set<string>;
  availableProdVariants: Variant[];
  setProdItemVariant: (itemId: string) => void;
  addIngredient: (id: string) => void;
}

/**
 * Хук хранит состояние с артикулом товара. Он возвращает список доступных вариантов товара. Он также хранит список выбранных ингредиентов.
 * @param items 
 * @returns 
 */
export const useProductOptions = (items: ProductItem[]): ReturnProps => {
  const [prodItemVariant, setProdItemVariant] = useState<string>('');

  // Кастомный хук useSet для хранения выбранных id ингредиентов
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<string>([]));

  const availableVariants = (items: ProductItem[]): Variant[] => {
    const variants = Array.from(new Set(items.map((item) => item.id))).sort();

    return variants.map((item) => ({
      name: `Арт. ${item}`,
      value: String(item),
      disabled: false,
    }));
  };

  const availableProdVariants = availableVariants(items);

  // id масла, который имеет нужный объем канистры
  const currentItemId = items.find((item) => item.id === prodItemVariant)?.id;

  return {
    prodItemVariant,
    currentItemId,
    selectedIngredients,
    availableProdVariants,
    setProdItemVariant,
    addIngredient,
  };
};
