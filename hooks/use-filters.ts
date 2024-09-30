import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import { useState } from 'react';

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
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setDiscThinkness: (value: string) => void;
  setDiscQuantityOfTeeth: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

// этот хук будет отвечать только за фильтрацию и хранение её состояния
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

  // Фильтр стоимости
  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    thickness,
    quantityOfTeeth,
    selectedIngredients,
    prices,
    setPrices: updatePrice,
    setDiscThinkness: toggleThickness,
    setDiscQuantityOfTeeth: toggleQuantityOfTeeth,
    setSelectedIngredients: toggleIngredients,
  };
};
