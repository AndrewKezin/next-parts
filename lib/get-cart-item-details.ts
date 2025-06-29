import { CartStateItem } from './get-cart-details';

/** Функция для получения информации о товаре в корзине (модификация товара и ингредиенты) */ 
export const getCartItemDetails = (
  ingredients: CartStateItem['ingredients'],
  thickness?: Number | null,
  quantityOfTeeth?: Number | null,
  volume?: Number | null,
): string => {
  // информация о товаре в корзине
  const details = [];

  // Если в корзине диск (определяем по наличию толщины)
  if (thickness && quantityOfTeeth) {
    details.push(`${thickness} мм ${quantityOfTeeth} зуб.`);
  }
  else if (volume) {

  // Если в корзине масло
    details.push(`${volume} л`);
  }

  // Если есть ингредиенты, то тоже добавляем их в массив
  if (ingredients) {
    details.push(...ingredients.map((ingredient) => `${ingredient.name} - ${ingredient.price} руб.`));
  }

  return details.join(', ');
};
