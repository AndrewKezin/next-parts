import { Variant } from '@/components/shared/group-variants';
import { getAvailableDiscThickness } from '@/lib';
import { ProductItem } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

interface ReturnProps {
  thickness: Number;
  quantityOfTeeth: Number;
  selectedIngredients: Set<number>;
  availableDiscThicknesses: Variant[];
  setThickness: (thickness: Number) => void;
  setQuantityOfTeeth: (quantityOfTeeth: Number) => void;
  addIngredient: (id: number) => void;
}

/**
 * Хук хранит состояния толщины и количества зубьев диска. Он возвращает список доступных вариантов толщины диска и disabled-варианты, которых нет для выбранного количества зубов. Он также хранит список выбранных ингредиентов.
 * 
 * @param items - все варианты диска
 * @param mapDiscThicknessObj - список возможных вариантов количества зубов диска
 * @returns Возвращает состояния выбранной толщины и количества зубьев диска и их методы. Возващает коллекцию выбанных ингредиентов и метод для их добавления. Возвращает список доступных вариантов толщины диска и disabled-варианты, которых нет для выбранного количества зубов.
 */
export const useDiscOptions = (items: ProductItem[], mapDiscThicknessObj: Variant[]): ReturnProps => {
  const [thickness, setThickness] = useState<Number>(1.5);
  const [quantityOfTeeth, setQuantityOfTeeth] = useState<Number>(55);

  // Кастомный хук useSet для хранения выбранных id ингредиентов
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const availableDiscThicknesses = getAvailableDiscThickness(
    quantityOfTeeth,
    mapDiscThicknessObj,
    items,
  );

  useEffect(() => {
    const isAvailableThickness = availableDiscThicknesses?.find(
      (item) => Number(item.value) === thickness && !item.disabled,
    );
    const availableThickness = availableDiscThicknesses?.find((item) => !item.disabled);

    if (!isAvailableThickness && availableThickness) {
      setThickness(Number(availableThickness.value));
    }
  }, [thickness, quantityOfTeeth]);

  return {
    thickness,
    quantityOfTeeth,
    selectedIngredients,
    availableDiscThicknesses,
    setThickness,
    setQuantityOfTeeth,
    addIngredient,
  };
};
