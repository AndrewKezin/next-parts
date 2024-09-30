import { Variant } from '@/components/shared/group-variants';
import { findAvailableDiscVariants, getMapDiscVariants } from '@/lib';
import { ProductItem } from '@prisma/client';
import { useEffect, useState } from 'react';

interface ReturnProps {
  mapDiscQuantityOfTeethObj: Variant[];
  mapDiscThicknessObj: Variant[];
}
/**
 * Хук для получения всех возможных толщин и количества зубьев дисков
 * 
 * @param items - все варианты диска
 * @returns возвращает объект с массивами возможных вариантов толщин и количества зубьев
 */
export const useDiscAllVariants = (items: ProductItem[]): ReturnProps => {
  const [mapDiscQuantityOfTeethObj, setMapDiscQuantityOfTeethObj] = useState<Variant[]>([]);
  const [mapDiscThicknessObj, setMapDiscThicknessObj] = useState<Variant[]>([]);

  useEffect(() => {
    const { discThicknessArr, discQuantityOfTeethArr } = findAvailableDiscVariants(items);

    const { mapDiscQuantityOfTeethObj, mapDiscThicknessObj } = getMapDiscVariants(
      discQuantityOfTeethArr,
      discThicknessArr,
    );

    setMapDiscQuantityOfTeethObj(mapDiscQuantityOfTeethObj);
    setMapDiscThicknessObj(mapDiscThicknessObj);

  }, [items]);

  return { mapDiscQuantityOfTeethObj, mapDiscThicknessObj };
};
