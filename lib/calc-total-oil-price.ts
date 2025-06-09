import { Ingredient, ProductItem } from '@prisma/client';

/**
 * Функция подсчета общей стоимости товара
 *
 * @param oilCanVolume - объём канистры масла
 * @param items - список вариаций товара
 * @param ingredients - список ингредиентов (дополнительных товаров)
 * @param selectedIngredients - выбранные ингредиенты
 *
 * @returns общая стоимость
 */
export const calcTotalOilPrice = (
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<string>,
  oilCanVolume: Number,
) => {
  const productPrice = items.find((item) => item.volume === oilCanVolume)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return productPrice + totalIngredientsPrice;
};
