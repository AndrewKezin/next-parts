'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { ProductImage, GroupVariants, IngredientItem, ProdItemCounter } from '@/components/shared';
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
    <div
      className={cn(className, 'flex flex-col gap-1 py-3 lg:flex-row justify-center items-center')}>
      <ProductImage imageUrl={imageUrl} />

      <div className="flex-1 bg-[#f7f6f5] p-3 md:p-7 rounded-md">
        <h2 className="text-md md:text-xl font-extrabold mb-1">{name}</h2>

        <p className="text-gray-400 mb-2">Артикул: {currentItemId}</p>

        <p className="text-gray-400 mb-2">{textDetails}</p>

        <p className="text-gray-400 mb-5">{textManufacturer}</p>

        {/* Группа вариантов */}
        <div className="flex flex-col mt-5 mb-3">
          <GroupVariants
            items={availableOilCansVolume}
            value={String(oilCanVolume)}
            onClick={(value) => setOilCanVolume(Number(value))}
          />
        </div>

        {currentItemIdCount !== undefined && (
          <>
            {/* Группа ингредиентов. Первый div для скроллбара. Класс scrollbar не из тэйлвинда, а кастомный и прописан в css*/}
            {ingredients.length > 0 && (
              <div className="bg-gray-50 p-1 lg:p-3 rounded-md h-auto overflow-auto scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
