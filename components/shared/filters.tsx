'use client';

import React, { use } from 'react';
import { Title } from './title';
import { Button, Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilters, useIngredients, useQueryFilters } from '@/hooks';

interface Props {
  classname?: string;
}

export const Filters: React.FC<Props> = ({ classname }) => {
  // кастомный хук для ингредиантов
  const { ingredients, loading } = useIngredients();
  // кастомный хук для фильтров
  const filters = useFilters();
  // кастомный хук, вшивающий фильтрацию в url
  useQueryFilters(filters);

  // список ингредиантов для отображения
  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  // функция обновления фильтра цен по слайдеру
  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  // const clearFilters = useClearFilters();
  return (
    <div className={classname}>
      <Title text="Фильтры" size="sm" className="mb-5 font-bold" />

      {/* Верхние чекбоксы */}
      <div className="flex flex-col gap-4">
        <CheckboxFiltersGroup
          title="Толщина диска"
          name="thickness"
          classname="mb-5"
          onClickCheckbox={filters.setDiscThinkness}
          selected={filters.thickness}
          items={[
            { text: '1.5 мм', value: '1.5' },
            { text: '1.6 мм', value: '1.6' },
            { text: '1.7 мм', value: '1.7' },
            { text: '1.8 мм', value: '1.8' },
            { text: '1.9 мм', value: '1.9' },
          ]}
        />

        <CheckboxFiltersGroup
          title="Количество зубов"
          name="quantityOfTeeth"
          classname="mb-5"
          onClickCheckbox={filters.setDiscQuantityOfTeeth}
          selected={filters.quantityOfTeeth}
          items={[
            { text: '55', value: '55' },
            { text: '60', value: '60' },
          ]}
        />

        <CheckboxFiltersGroup
          title="Объем канистры масла"
          name="volume"
          classname="mb-5"
          onClickCheckbox={filters.setVolume}
          selected={filters.volume}
          items={[
            { text: '1 л', value: '1' },
            { text: '4 л', value: '4' },
            { text: '5 л', value: '5' },
          ]}
        />
      </div>

      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          {/* минимальная */}
          {/* !!!инпуты минимальной (и максимальной) цены выводят ошибки, если рендер в useEffect сделать без флага isMounted - при первом рендереподцепятся пустые фильтры и будет перезатираться адресная строка (например, localhost:3000/?paid) */}
          <Input
            type="number"
            placeholder="1"
            min={0}
            max={100000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          {/* максимальная */}
          <Input
            type="number"
            min={100}
            max={100000}
            placeholder="100000"
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>
        {/* слайдер цены */}
        <RangeSlider
          min={0}
          max={100000}
          step={100}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 100000]}
          onValueChange={updatePrices}
        />
      </div>

      {/* Фильтр ингредиентов */}
      <CheckboxFiltersGroup
        title="Применимость"
        name="ingredients"
        classname="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />

      {/* Сбросить фильтры */}
      <Button
        type="button"
        size="sm"
        className="w-full mt-5 mb-5"
        title="Сбросить фильтры"
        onClick={() => {
          const url = new URL(window.location.href);
          url.search = '';
          window.history.replaceState({}, '', url.toString());
          window.location.reload();
        }}>
        Сбросить фильтры
      </Button>
    </div>
  );
};
