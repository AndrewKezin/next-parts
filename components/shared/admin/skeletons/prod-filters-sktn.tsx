import React from 'react';

export const ProdFiltersSktn: React.FC = () => {
  return (
    <div className="p-4 w-full border border-gray-300 mb-5">
      <div className="flex items-center justify-around border border-gray-300 gap-3 mb-3 p-3">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="text-[14px] text-gray-600">ID товара</div>
          <div className="w-[250px] h-[38px] bg-gray-200 animate-pulse rounded-[5px]" />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="text-[14px] text-gray-600">Артикул товара</div>
          <div className="w-[250px] h-[38px] bg-gray-200 rounded-[5px]" />
        </div>
      </div>

      <div className="flex border border-gray-300 items-center justify-around gap-3 mb-3 p-3">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="text-[14px] text-gray-600">Название товара</div>
          <div className="w-[250px] h-[38px] bg-gray-200 rounded-[5px]" />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="text-[14px] text-gray-600">Производитель товара</div>
          <div className="w-[250px] h-[38px] bg-gray-200 rounded-[5px]" />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="text-[14px] text-gray-600">Категория товара</div>
          <div className="w-[200px] h-[38px] bg-gray-200 rounded-[5px]" />
        </div>
      </div>

      <div className="flex border border-gray-300 items-center justify-around gap-3 mb-3 p-3">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="text-[14px] text-gray-600">Дополнительно к товару</div>
          <div className="w-[250px] h-[38px] bg-gray-200 rounded-[5px]" />
        </div>

        <div className="flex items-center justify-center gap-5">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="text-[14px] text-gray-600">Цена товара, min</div>
            <div className="w-[150px] h-[38px] bg-gray-200 rounded-[5px]" />
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="text-[14px] text-gray-600">Цена товара, max</div>
            <div className="w-[150px] h-[38px] bg-gray-200 rounded-[5px]" />
          </div>
        </div>
      </div>

      <div className="flex border border-gray-300 items-center justify-around gap-3 mb-5 p-3">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="text-[14px] text-gray-600">Толщина диска</div>
          <div className="w-[180px] h-[38px] bg-gray-200 rounded-[5px]" />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="text-[14px] text-gray-600">Количество зубьев</div>
          <div className="w-[200px] h-[38px] bg-gray-200 rounded-[5px]" />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="text-[14px] text-gray-600">Объем канистры масла</div>
          <div className="w-[250px] h-[38px] bg-gray-200 rounded-[5px]" />
        </div>
      </div>

      <div className="flex items-center justify-center p-3 w-[280px] h-[38px] bg-gray-200 rounded-md text-[14px]">
        Сбросить параметры поиска
      </div>
    </div>
  );
};
