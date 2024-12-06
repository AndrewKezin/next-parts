import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import { useMemo, useState } from 'react';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  thickness: string;
  quantityOfTeeth: string;
  volume: string;
  ingredients: string;
}

export interface Filters {
  thickness: Set<string>;
  quantityOfTeeth: Set<string>;
  volume: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setDiscThinkness: (value: string) => void;
  setDiscQuantityOfTeeth: (value: string) => void;
  setVolume: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

/**
 * Этот хук будет отвечать только за фильтрацию и хранение её состояния
 */
export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  // Фильтр ингредиентов
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(',') || []),
  );

  // Фильтр толщины дисков
  const [thickness, { toggle: toggleThickness }] = useSet(
    new Set<string>(searchParams.has('thickness') ? searchParams.get('thickness')?.split(',') : []),
  );

  // Фильтр количества зубов
  const [quantityOfTeeth, { toggle: toggleQuantityOfTeeth }] = useSet(
    new Set<string>(
      searchParams.has('quantityOfTeeth') ? searchParams.get('quantityOfTeeth')?.split(',') : [],
    ),
  );

  // Фильтр объема канистры масла
  const [volume, { toggle: toggleVolume }] = useSet(
    new Set<string>(searchParams.has('volume') ? searchParams.get('volume')?.split(',') : []),
  );

  // const [volume, { toggle: toggleVolume }] = useSet(
  //   new Set<string>(searchParams.get('volume')?.split(',') || []),
  // );

  // Фильтр стоимости
  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')),
    priceTo: Number(searchParams.get('priceTo')),
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Необходимо закешировать объект, чтобы он пересоздавался только при изменении параметров фильтра. Иначе, не будет закрываться модальное окно товара при применении фильтрации
  return useMemo(
    () => ({
      thickness,
      quantityOfTeeth,
      volume,
      selectedIngredients,
      prices,
      setPrices: updatePrice,
      setDiscThinkness: toggleThickness,
      setDiscQuantityOfTeeth: toggleQuantityOfTeeth,
      setVolume: toggleVolume,
      setSelectedIngredients: toggleIngredients,
    }),
    [thickness, quantityOfTeeth, volume, selectedIngredients, prices],
  );
};
