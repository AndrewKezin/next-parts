'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { GearboxManufacturer, Ingredient, ProductItem } from '@prisma/client';
import { useSet } from 'react-use';
import { Counter, GroupVariants, IngredientItem, ProductImage, Title } from '@/components/shared';
import { useProductOptions } from '@/hooks';
import { calcTotalProductPrice } from '@/lib';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  manufacturer: GearboxManufacturer[];
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  loading?: boolean;
  onSubmit: (itemId: string, ingredients: string[]) => void;
  className?: string;
}

/** Форма выбора товара */
export const ChooseProductForm: React.FC<Props> = ({
  imageUrl,
  name,
  onSubmit,
  ingredients,
  items,
  manufacturer,
  quantity,
  setQuantity,
  loading,
  className,
}) => {
  // Кастомный хук useSet для хранения выбранных id ингредиентов
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<string>([]));

  const { prodItemVariant, currentItemId, availableProdVariants, setProdItemVariant } =
    useProductOptions(items);

  // const textDetails = `${prodItemVariant}`;
  const textManufacturer = `Для трансмиссий: ${manufacturer.map((item) => item.name).join(', ')} `;

  const totalPrice = calcTotalProductPrice(
    items,
    ingredients,
    selectedIngredients,
    prodItemVariant,
    quantity,
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

        <p className="text-gray-400 mb-2">Артикул: {currentItemId}</p>

        {/* <p className="text-gray-400">{textDetails}</p> */}

        <p className="text-gray-400 mb-5">{textManufacturer}</p>

        <GroupVariants
          items={availableProdVariants}
          value={String(prodItemVariant)}
          onClick={(value) => setProdItemVariant(String(value))}
        />

        {/* Группа ингредиентов. Первый div для скроллбара. Класс scrollbar не из тэйлвинда, а кастомный и прописан в css*/}
        {ingredients.length > 0 && (
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

        {/* Количество */}
        <Counter setQuantity={setQuantity} />

        <Button
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={handleClickAdd}>
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
