import { Variant } from '@/components/shared/group-variants';
import { getAvailableDiscThickness } from '@/lib';
import { ProductItem } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

interface ReturnProps {
  thickness: number;
  quantityOfTeeth: number;
  currentItemId: string | undefined;
  currentItemIdCount: number | undefined;
  selectedIngredients: Set<string>;
  availableDiscThicknesses: Variant[];
  setThickness: (thickness: number) => void;
  setQuantityOfTeeth: (quantityOfTeeth: number) => void;
  addIngredient: (id: string) => void;
}

/**
 * Хук хранит состояния толщины и количества зубьев диска. Он возвращает список доступных вариантов толщины диска и disabled-варианты, которых нет для выбранного количества зубов. Он также хранит список выбранных ингредиентов.
 *
 * @param items - все варианты диска
 * @param mapDiscThicknessObj - список возможных вариантов количества зубов диска
 * @returns Возвращает состояния выбранной толщины и количества зубьев диска и их методы. Возващает коллекцию выбанных ингредиентов и метод для их добавления. Возвращает список доступных вариантов толщины диска и disabled-варианты, которых нет для выбранного количества зубов.
 */
export const useDiscOptions = (
  items: ProductItem[],
  mapDiscThicknessObj: Variant[],
): ReturnProps => {
  const [thickness, setThickness] = useState<number>(1.5);
  const [quantityOfTeeth, setQuantityOfTeeth] = useState<number>(55);

  // Кастомный хук useSet для хранения выбранных id ингредиентов
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<string>([]));

  const availableDiscThicknesses = getAvailableDiscThickness(
    quantityOfTeeth,
    mapDiscThicknessObj,
    items,
  );

  // id диска, который имеет нужное количество зубьев и нужную толщину
  const currentItemId = items.find(
    (item) => item.quantityOfTeeth === quantityOfTeeth && item.thickness === thickness,
  )?.id;

  // количество выбранного варианта товара
  const currentItemIdCount = items.find((item) => item.id === currentItemId)?.quantity;

  useEffect(() => {
    if (availableDiscThicknesses.length > 0) {
      const isAvailableThickness = availableDiscThicknesses?.find(
        (item) => Number(item.value) === thickness && !item.disabled,
      );

      const availableThickness = availableDiscThicknesses?.find((item) => !item.disabled);

      if (!isAvailableThickness && availableThickness) {
        setThickness(Number(availableThickness.value));
      }
    }
  }, [thickness, quantityOfTeeth, availableDiscThicknesses]);

  return {
    thickness,
    quantityOfTeeth,
    currentItemId,
    currentItemIdCount,
    selectedIngredients,
    availableDiscThicknesses,
    setThickness,
    setQuantityOfTeeth,
    addIngredient,
  };
};
