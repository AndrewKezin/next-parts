import { filterProdByPrice } from './filter-prod-by-price';
import { getResultArrByIntersection } from './get-result-arr-by-intersection';
import { searchProdByParams } from './search-prod-by-params';

/**
 * Функция получает списки из запроса (из searchParams) и возвращает итговый массив, удовлетворяющий условиям фильтров
 * @param productName
 * @param prodManufIds
 * @param prodIngredIds
 * @param prodCatIds
 * @param productPriceFrom
 * @param productPriceTo
 * @param prodQuantVariants
 * @param prodThicknVariants
 * @param prodVolumeVariants
 * @param modifiedQuery
 * @returns
 */
export const getFilteredArr = async (
  productName: string,
  prodManufIds: string,
  prodIngredIds: string,
  prodCatIds: string,
  productPriceFrom: string,
  productPriceTo: string,
  prodQuantVariants: string,
  prodThicknVariants: string,
  prodVolumeVariants: string,
  modifiedQuery: string,
) => {
  // массивы товаров, удовлетворяющих условиям фильтров (из запроса)
  const { arrByName, arrByManuf, arrByIngred, arrByCat, arrByQuant, arrByThickn, arrByVolume } =
    await searchProdByParams(
      productName,
      prodManufIds,
      prodIngredIds,
      prodCatIds,
      prodQuantVariants,
      prodThicknVariants,
      prodVolumeVariants,
      modifiedQuery,
    );

  // массивы товаров, отфильтрованные по диапазону цен
  const nameInPriceRange =
    arrByName.length > 0 ? filterProdByPrice(productPriceFrom, productPriceTo, arrByName) : [];
  const manufInPriceRange =
    arrByManuf.length > 0 ? filterProdByPrice(productPriceFrom, productPriceTo, arrByManuf) : [];
  const ingredInPriceRange =
    arrByIngred.length > 0 ? filterProdByPrice(productPriceFrom, productPriceTo, arrByIngred) : [];
  const catInPriceRange =
    arrByCat.length > 0 ? filterProdByPrice(productPriceFrom, productPriceTo, arrByCat) : [];
  const quantInPriceRange =
    arrByQuant.length > 0
      ? filterProdByPrice(productPriceFrom, productPriceTo, null, arrByQuant)
      : [];
  const thicknInPriceRange =
    arrByThickn.length > 0
      ? filterProdByPrice(productPriceFrom, productPriceTo, null, arrByThickn)
      : [];
  const volumeInPriceRange =
    arrByVolume.length > 0
      ? filterProdByPrice(productPriceFrom, productPriceTo, null, arrByVolume)
      : [];

  // получаем итоговый массив
  const resultArr = getResultArrByIntersection(
    nameInPriceRange,
    manufInPriceRange,
    ingredInPriceRange,
    catInPriceRange,
    quantInPriceRange,
    thicknInPriceRange,
    volumeInPriceRange,
  );

  return resultArr;
};
