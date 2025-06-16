import { FilteredArray, ItemsType, SEARCHPRICERANGE } from '@/@types/products';

/**
 * Функция фильтрации товаров по стоимости
 * @param priceFrom
 * @param priceTo
 * @param arr
 * @param arrItems
 * @returns
 */
export const filterProdByPrice = (
  priceFrom: string | SEARCHPRICERANGE.FROM,
  priceTo: string | SEARCHPRICERANGE.TO,
  arr?: FilteredArray[] | null,
  arrItems?: ItemsType[] | null,
): string[] => {
  let resArr: string[] | undefined;

  if (arr) {
    resArr = arr
      .map((item) =>
        item.items
          .filter((i) => i.price >= Number(priceFrom) && i.price <= Number(priceTo))
          .map((i) => i.id),
      )
      .flat();
  }

  if (arrItems) {
    resArr = arrItems
      .filter((i) => i.price >= Number(priceFrom) && i.price <= Number(priceTo))
      .map((i) => i.id);
  }

  return resArr ? resArr : [];
};
