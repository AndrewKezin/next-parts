import { Variant } from '@/components/shared/group-variants';
import { ProductItem } from '@prisma/client';

/**
 * Функция, которая возвращает список доступных и недоступных толщин диска
 *
 * @param quantityOfTeeth - количество зубов диска
 * @param items - вариации дисков
 * @param mapDiscThicknessObj - список возможных толщин диска
 * @returns возвращает список доступных толщин диска и disabled-варианты, которых нет для выбранного количества зубов
 */
export const getAvailableDiscThickness = (
  quantityOfTeeth: Number,
  mapDiscThicknessObj: Variant[],
  items: ProductItem[],
): Variant[] => {
  const filteredDiscByQuantityOfTeeth = items.filter((item) => item.quantityOfTeeth === quantityOfTeeth);

  return mapDiscThicknessObj.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredDiscByQuantityOfTeeth.some(
      (disc) => Number(disc.thickness) === Number(item.value),
    ),
  }));
};
