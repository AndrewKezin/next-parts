'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui';
import {
  ProductImage,
  GroupVariants,
  IngredientItem,
  Title,
  Counter,
  ProdItemCounter,
} from '@/components/shared';
import { GearboxManufacturer, Ingredient, ProductItem } from '@prisma/client';
import { calcTotalOilPrice } from '@/lib';
import { useOilOptions } from '@/hooks';

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

/** Форма выбора масла */
export const ChooseOilForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  manufacturer,
  quantity,
  setQuantity,
  loading,
  onSubmit,
  className,
}) => {
  const {
    oilCanVolume,
    currentItemId,
    currentItemIdCount,
    selectedIngredients,
    availableOilCansVolume,
    setOilCanVolume,
    addIngredient,
  } = useOilOptions(items);

  const textDetails = `Канистра ${oilCanVolume} л.`;
  const textManufacturer = `Для трансмиссий: ${manufacturer.map((item) => item.name).join(', ')}`;

  const totalPrice = calcTotalOilPrice(
    items,
    ingredients,
    selectedIngredients,
    oilCanVolume,
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

        <p className="text-gray-400 mb-2">{textDetails}</p>

        <p className="text-gray-400 mb-5">{textManufacturer}</p>

        <GroupVariants
          items={availableOilCansVolume}
          value={String(oilCanVolume)}
          onClick={(value) => setOilCanVolume(Number(value))}
        />

        {currentItemIdCount !== undefined && (
          <>
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

            <ProdItemCounter
              currentItemIdCount={currentItemIdCount}
              quantity={quantity}
              setQuantity={setQuantity}
              handleClickAdd={handleClickAdd}
              totalPrice={totalPrice}
              loading={loading}
            />
          </>
        )}
      </div>
    </div>
  );
};
