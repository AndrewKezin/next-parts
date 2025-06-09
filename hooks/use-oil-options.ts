import { Variant } from '@/components/shared/group-variants';
import { ProductItem } from '@prisma/client';
import { useState } from 'react';
import { useSet } from 'react-use';

interface ReturnProps {
  oilCanVolume: number;
  currentItemId: string | undefined;
  selectedIngredients: Set<string>;
  availableOilCansVolume: Variant[];
  setOilCanVolume: (volume: number) => void;
  addIngredient: (id: string) => void;
}

/**
 * Хук хранит состояние объёма канистры масла. Он возвращает список доступных вариантов объёма канистры. Он также хранит список выбранных ингредиентов.
 *
 * @param items
 * @returns Возвращает состояние выбранного объёма канистры масла. Возващает коллекцию выбанных ингредиентов и метод для их добавления. Возвращает список доступных вариантов объема канистры масла.
 */
export const useOilOptions = (items: ProductItem[]): ReturnProps => {
  const [oilCanVolume, setOilCanVolume] = useState<number>(1);

  // Кастомный хук useSet для хранения выбранных id ингредиентов
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<string>([]));

  const availableVolumes = (items: ProductItem[]): Variant[] => {
    const volumes = Array.from(new Set(items.map((item) => item.volume))).sort();

    return volumes.map((item) => ({
      name: `${item} л`,
      value: String(item),
      disabled: false,
    }));
  };

  const availableOilCansVolume = availableVolumes(items);

  // id масла, который имеет нужный объем канистры
  const currentItemId = items.find((item) => item.volume === oilCanVolume)?.id;

  return {
    oilCanVolume,
    currentItemId,
    selectedIngredients,
    availableOilCansVolume,
    setOilCanVolume,
    addIngredient,
  };
};
