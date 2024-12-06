'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { Ingredient, ProductItem } from '@prisma/client';
import { ProductImage, GroupVariants, IngredientItem, Title } from '@/components/shared';
import { calcTotalDiscPrice } from '@/lib';
import { useDiscOptions, useDiscAllVariants } from '@/hooks';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

/** Форма выбора диска */
export const ChooseDiscForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  loading,
  onSubmit,
  className,
}) => {
  // Получить список всех возможных вариантов толщины диска и количества зубьев диска. Схема работы такая: получить все доступные варианты количества зубьев диска. Отрендерить их в компоненте GroupVariants. По ним же с помощью хука useDiscOptions определить доступные варианты толщины диска и выбрать первый доступный вариант. Недоступные варианты сделать disabled.
  const { mapDiscQuantityOfTeethObj, mapDiscThicknessObj } = useDiscAllVariants(items);

  // Хук, который возвращает список доступных вариантов толщины диска для рендера в компоненте GroupVariants. Сохраняет выбранные ингредиенты в хранилище.
  const {
    thickness,
    quantityOfTeeth,
    currentItemId,
    selectedIngredients,
    availableDiscThicknesses,
    setThickness,
    setQuantityOfTeeth,
    addIngredient,
  } = useDiscOptions(items, mapDiscThicknessObj);

  const textDetails = `${thickness} мм, ${quantityOfTeeth} зуб.`;

  const totalPrice = calcTotalDiscPrice(
    items,
    ingredients,
    selectedIngredients,
    thickness,
    quantityOfTeeth,
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImage imageUrl={imageUrl} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400 mb-5">{textDetails}</p>

        {/* Группа вариантов */}
        <div className="flex flex-col gap-4 mt-5 mb-3">
          <GroupVariants
            items={availableDiscThicknesses}
            value={String(thickness)}
            onClick={(value) => setThickness(Number(value))}
          />

          <GroupVariants
            items={mapDiscQuantityOfTeethObj}
            value={String(quantityOfTeeth)}
            onClick={(value) => setQuantityOfTeeth(Number(value))}
          />
        </div>

        {/* Группа ингредиентов. Первый div для скроллбара. Класс scrollbar не из тэйлвинда, а кастомный и прописан в css*/}
        {ingredients.length > 0 && (
          /* Группа ингредиентов. Первый div для скроллбара. Класс scrollbar не из тэйлвинда, а кастомный и прописан в css*/
          <div className="bg-gray-50 p-5 rounded-md h-[320px] overflow-auto scrollbar">
            <div className="grid grid-cols-3 gap-3">
              {ingredients?.map((ingredients) => (
                <IngredientItem
                  key={ingredients.id}
                  imageUrl={ingredients.imageUrl}
                  name={ingredients.name}
                  price={ingredients.price}
                  onClick={() => {
                    addIngredient(ingredients.id);
                  }}
                  active={selectedIngredients.has(ingredients.id)}
                />
              ))}
            </div>
          </div>
        )}

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
