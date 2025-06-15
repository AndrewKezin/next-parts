import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';
import { Button } from '../ui';
import { GearboxManufacturer, Ingredient, ProductItem } from '@prisma/client';
import { useSet } from 'react-use';
import { IngredientItem, Title } from '@/components/shared';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  manufacturer: GearboxManufacturer[];
  loading?: boolean;
  onSubmit: VoidFunction;
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
  loading,
  className,
}) => {
  // Кастомный хук useSet для хранения выбранных id ингредиентов
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<string>([]));

  let textDetails
  manufacturer.length > 0 ?
    textDetails = `Для трансмиссий: ${manufacturer.map((item) => item.name).join(', ')} ` :
    textDetails = 'Детали уточняйте у менеджера';
  

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
  const totalPrice = items[0].price + totalIngredientsPrice;

  const handleClickAdd = () => {
    onSubmit();
  };

  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>
        <Image
          unoptimized
          priority={true}
          src={imageUrl}
          alt="Товар"
          className="relative left-2 top-2 transition-all z-10 duration-300"
          width={350}
          height={350}
        />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

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
