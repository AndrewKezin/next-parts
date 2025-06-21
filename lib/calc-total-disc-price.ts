import { Ingredient, ProductItem } from '@prisma/client';

/**
 * Функция подсчета общей стоимости товара
 *
 * @param thickness - толщина диска
 * @param quantityOfTeeth - количество зубов
 * @param items - список вариаций товара
 * @param ingredients - список ингредиентов (дополнительных товаров)
 * @param selectedIngredients - выбранные ингредиенты
 * @param quantity - количество дисков
 *
 * @returns общая стоимость
 */
export const calcTotalDiscPrice = (
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<string>,
  thickness: number,
  quantityOfTeeth: number,
  quantity: number,
) => {
  const productPrice =
    items.find((item) => item.thickness === thickness && item.quantityOfTeeth === quantityOfTeeth)
      ?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return ((productPrice*quantity) + totalIngredientsPrice);
};
