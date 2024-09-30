import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { OilVolume, oilVolume } from '@/constants/oil';
import { useSet } from 'react-use';
import { ProductImage, GroupVariants, IngredientItem, Title } from '@/components/shared';
import { Ingredient, ProductItem } from '@prisma/client';
import { calcTotalOilPrice } from '@/lib';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
  className?: string;
}

export const ChooseOilForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  onClickAddCart,
  className,
}) => {
  const [oilCanVolume, setOilCanVolume] = React.useState<OilVolume>(1);

  // Кастомный хук useSet для хранения выбранных id ингредиентов
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const textDetails = `Канистра ${oilCanVolume} л.`;

  // const productPrice = items.find((item) => item.volume === oilCanVolume)?.price || 0;
  // const totalIngredientsPrice = ingredients
  //   .filter((ingredient) => selectedIngredients.has(ingredient.id))
  //   .reduce((acc, ingredient) => acc + ingredient.price, 0);
  const totalPrice = calcTotalOilPrice(items, ingredients, selectedIngredients, oilCanVolume);

  const handleClickAdd = () => {
    onClickAddCart?.();
    console.log(`volume: ${oilCanVolume}, ingredients: `, selectedIngredients);
  };

  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImage imageUrl={imageUrl} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400 mb-5">{textDetails}</p>

        <GroupVariants
          items={oilVolume}
          value={String(oilCanVolume)}
          onClick={(value) => setOilCanVolume(Number(value) as OilVolume)}
        />

        {/* Группа ингредиентов. Первый div для скроллбара. Класс scrollbar не из тэйлвинда, а кастомный и прописан в css*/}
        {ingredients.length > 0 && (
          <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
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
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
