import React from 'react';
import { ItemSktn } from './item-sktn';

export const ProdFiltersSktn: React.FC = () => {
  return (
    <div className="p-4 w-full border border-gray-300 mb-5">
      <div className="flex items-center justify-around border border-gray-300 gap-3 mb-3 p-3">
        <div className="flex flex-col items-center justify-center gap-1">
          <ItemSktn text="ID товара" width={250} isFilterItem />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <ItemSktn text="Артикул товара" width={250} isFilterItem />
        </div>
      </div>

      <div className="flex border border-gray-300 items-center justify-around gap-3 mb-3 p-3">
        <div className="flex flex-col items-center justify-center gap-1">
          <ItemSktn text="Название товара" width={250} isFilterItem />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <ItemSktn text="Производитель товара" width={250} isFilterItem />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <ItemSktn text="Категория товара" width={200} isFilterItem />
        </div>
      </div>

      <div className="flex border border-gray-300 items-center justify-around gap-3 mb-3 p-3">
        <div className="flex flex-col items-center justify-between gap-1">
          <ItemSktn text="Дополнительно к товару" width={250} isFilterItem />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <ItemSktn text="Остаток товара (не более), шт" width={150} isFilterItem />
        </div>

        <div className="flex items-center justify-center gap-5">
          <div className="flex flex-col items-center justify-center gap-1">
            <ItemSktn text="Цена товара, min" width={150} isFilterItem />
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <ItemSktn text="Цена товара, max" width={150} isFilterItem />
          </div>
        </div>
      </div>

      <div className="flex border border-gray-300 items-center justify-around gap-3 mb-5 p-3">
        <div className="flex flex-col items-center justify-center gap-1">
          <ItemSktn text="Толщина диска" width={180} isFilterItem />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <ItemSktn text="Количество зубьев" width={200} isFilterItem />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <ItemSktn text="Объем канистры масла" width={250} isFilterItem />
        </div>
      </div>

      <div className="flex items-center justify-center p-3 w-[280px] h-[38px] bg-gray-200 rounded-md text-[14px]">
        Сбросить параметры поиска
      </div>
    </div>
  );
};
