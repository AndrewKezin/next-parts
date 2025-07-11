import { TCountOfSameItems } from "./get-exceeding-avail-quant";

/**
 * Функция проверяет, есть ли по данному товару превышение доступного количества
 * @param productItemId 
 * @param countOfSameItems 
 * @returns 
 */
export const checkExceeding = (productItemId: string, countOfSameItems: TCountOfSameItems[]) => {
    if (countOfSameItems) {
      const item = countOfSameItems.filter((item) => item.productItemId === productItemId);
      return item[0].isExceeding;
    }
    return false;
  }