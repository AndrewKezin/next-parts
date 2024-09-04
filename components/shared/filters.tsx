// 'use client';

import React from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';

interface Props {
  classname?: string;
}

export const Filters: React.FC<Props> = ({ classname }) => {
  return (
    <div className={classname}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      {/* Верхние чекбоксы */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно забирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={100000} defaultValue={0} />
          <Input type="number" min={100} max={100000} placeholder="100000" />
        </div>

        <RangeSlider min={0} max={100000} step={100} value={[0, 100000]} />
      </div>

      {/* Фильтр ингредиентов */}
      <CheckboxFiltersGroup
        title="Применимость"
        classname='mt-5'
        limit={6}
        defaultItems={[
          {
            text: "ZF",
            value: "1",
          },
          {
            text: "Aisin",
            value: "2",
          },
          {
            text: "Toyota",
            value: "3",
          },
          {
            text: "Jatco",
            value: "4",
          },
          {
            text: "Mercedes",
            value: "5",
          },
          {
            text: "VAG",
            value: "6",
          },
        ]}
        items={[{
          text: "ZF",
          value: "1",
        },
        {
          text: "Aisin",
          value: "2",
        },
        {
          text: "Toyota",
          value: "3",
        },
        {
          text: "Jatco",
          value: "4",
        },
        {
          text: "Mercedes",
          value: "5",
        },
        {
          text: "VAG",
          value: "6",
        },
        {
          text: "GM",
          value: "7",
        },
        {
          text: "Ford",
          value: "8",
        },
        {
          text: "Peugeot/Citroen",
          value: "9",
        },
        {
          text: "Getrag",
          value: "10",
        },
        {
          text: "China",
          value: "11",
        },
      ]}
      />
        
    </div>
  );
};
