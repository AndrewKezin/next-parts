import { Ingredient, ProductItem } from '@prisma/client';

/**
 * Функция подсчета общей стоимости товара
 *
 * @param prodItemVariant - вариант товара
 * @param items - список вариаций товара
 * @param ingredients - список ингредиентов (дополнительных товаров)
 * @param selectedIngredients - выбранные ингредиенты
 * @param quantity - количество товаров
 *
 * @returns общая стоимость
 */
export const calcTotalProductPrice = (
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<string>,
  prodItemVariant: string,
  quantity: number,
) => {
  const productPrice = items.find((item) => item.id === prodItemVariant)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return productPrice * quantity + totalIngredientsPrice;
};
