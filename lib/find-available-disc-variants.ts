import { ProductItem } from "@prisma/client";

type AvailableDiscVariants = {
    discThicknessArr: (Number | null)[];
    discQuantityOfTeethArr: (Number | null)[];
}

 /**
  * Получить список всех возможных толщин и количества зубьев дисков
  * 
  * @param items - все варианты диска
  * @returns массив толщин и количества зубьев диска
  */
export const findAvailableDiscVariants = (items: ProductItem[]): AvailableDiscVariants => {
    const discThicknessSet = new Set(items.map((item) => item.thickness));
    const discQuantityOfTeethSet = new Set(items.map((item) => item.quantityOfTeeth));

    const discThicknessArr = Array.from(discThicknessSet).sort();
    const discQuantityOfTeethArr = Array.from(discQuantityOfTeethSet).sort();

    return {discQuantityOfTeethArr, discThicknessArr};
}