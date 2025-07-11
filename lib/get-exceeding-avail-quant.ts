import { CartStateItem } from './get-cart-details';

export type TCountOfSameItems = {
    productItemId: string;
    quantity: number;
    availableQuantity: number;
    isExceeding?: boolean;
}

interface ReturnProps {
  countOfSameItems: TCountOfSameItems[];
  isExceedingItems: boolean;
};

/**
 * Функция получения списка товаров, в котором подсчитано их общее количество в корзине по productItemId и указывается превышение доступного количества. В корзине могут быть одинаковые товары с разными дополнительными услугами (ингредиентами). Эта функция отслеживает количество каждого товара в корзине и сравнивает его с доступным количеством.
 * @param items
 * @returns
 */
export const getExceedingAvailQuant = (items: CartStateItem[]): ReturnProps => {
  let countOfSameItems: {
    productItemId: string;
    quantity: number;
    availableQuantity: number;
    isExceeding: boolean;
  }[] = [];
  items.forEach((item) => {
    const index = countOfSameItems.findIndex((i) => i.productItemId === item.productItemId);
    if (index !== -1) {
      countOfSameItems[index].quantity += item.quantity;
      countOfSameItems[index].isExceeding =
        countOfSameItems[index].quantity > countOfSameItems[index].availableQuantity;
    } else {
      countOfSameItems.push({
        productItemId: item.productItemId,
        quantity: item.quantity,
        availableQuantity: item.availableQuantity,
        isExceeding: item.quantity > item.availableQuantity,
      });
    }
  });

  return {
    countOfSameItems,
    isExceedingItems: countOfSameItems.some((item) => item.isExceeding),
  };
};
