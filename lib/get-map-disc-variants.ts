import { Variant } from '@/components/shared/group-variants';

type ReturnProps = {
    mapDiscQuantityOfTeethObj: Variant[];
    mapDiscThicknessObj: Variant[];
}

/**
 * Функция, возвращающая массив объектов с доступными вариантами дисков с параметрами name, value и disabled
 *
 * @param discQuantityOfTeethArr - массив имеющихся вариантов количества зубьев дисков
 * @param discThicknessArr - массив имеющихся вариантов толщин дисков
 * @returns массив объектов с доступными вариантами дисков
 */
export const getMapDiscVariants = (
  discQuantityOfTeethArr: (Number | null)[],
  discThicknessArr: (Number | null)[],
): ReturnProps => {
  const mapDiscQuantityOfTeethObj = discQuantityOfTeethArr.map((value) => ({
    name: `${value} зуб.`,
    value: String(value),
    disabled: false,
  }));

  const mapDiscThicknessObj = discThicknessArr.map((value) => ({
    name: `${value} мм`,
    value: String(value),
    disabled: false,
  }));

  return {mapDiscQuantityOfTeethObj, mapDiscThicknessObj};
};
