import React from 'react';

interface Props {
  className?: string;
}

export const NewProductSktn: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex items-center justify-center w-full gap-3">
      <div className="w-full flex flex-col items-center justify-center gap-1 border border-gray-300 p-3">
        <div className="mt-3">ID товара:</div>
        <div className="w-[200px] h-[40px] rounded-[5px] bg-gray-250 animate-pulse" />

        <div className="mt-3">Название:</div>
        <div className="w-full h-[40px] rounded-[5px] bg-gray-250 animate-pulse" />

        <div className="mt-3">Категория:</div>
        <div className="w-[300px] h-[40px] rounded-[5px] bg-gray-250 animate-pulse" />

        <div className="mt-3">URL фото:</div>
        <div className="w-full h-[40px] rounded-[5px] bg-gray-250 animate-pulse mb-1" />
        <div className="w-[200px] h-[200px] rounded-[5px] bg-gray-250 animate-pulse" />

        <div className="mt-3">Производители:</div>
        <div className="w-[300px] h-[40px] rounded-[5px] bg-gray-250 animate-pulse" />

        <div className="mt-3">Дополнительно к товару:</div>
        <div className="w-full h-[40px] rounded-[5px] bg-gray-250 animate-pulse mb-5" />

        <div className="w-full flex items-center justify-around p-1">
          <div className="flex items-center justify-center w-[300px] h-[50px] rounded-[5px] bg-gray-250 animate-pulse font-bold mb-5">2. Добавить вариант товара</div>
          <div className="flex items-center justify-center w-[100px] h-[50px] rounded-[5px] bg-gray-250 animate-pulse font-bold mb-5">Сброс</div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-1 border border-gray-250 p-3">
        <div className="underline">Варианты исполнения:</div>

        <div className="mt-3">Артикул товара:</div>
        <div className="w-[300px] h-[40px] rounded-[5px] bg-gray-250 animate-pulse mb-5" />

        <div className="w-full flex justify-around items-center gap-3">
          <div className="w-1/2 flex flex-col items-center justify-center p-1">
            <div className="mt-3">Количество зубов диска:</div>
            <div className="w-[100px] h-[40px] rounded-[5px] bg-gray-250 animate-pulse mb-5" />
          </div>

          <div className="w-1/2 flex flex-col items-center justify-center p-1">
            <div className="mt-3">Толщина диска:</div>
            <div className="w-[100px] h-[40px] rounded-[5px] bg-gray-250 animate-pulse mb-5" />
          </div>
        </div>

        <div className="w-full flex justify-around items-center gap-3">
          <div className="w-1/2 flex flex-col items-center justify-center p-1">
            <div className="mt-3">Количество, шт:</div>
            <div className="w-[100px] h-[40px] rounded-[5px] bg-gray-250 animate-pulse mb-5" />
          </div>

          <div className="w-1/2 flex flex-col items-center justify-center p-1">
            <div className="mt-3">Стоимость, ₽:</div>
            <div className="w-[100px] h-[40px] rounded-[5px] bg-gray-250 animate-pulse mb-5" />
          </div>
        </div>

        <div className="w-full flex items-center justify-around p-1">
          <div className="flex items-center justify-center w-[300px] h-[50px] rounded-[5px] bg-gray-250 animate-pulse font-bold mb-5">2. Добавить вариант товара</div>
          <div className="flex items-center justify-center w-[100px] h-[50px] rounded-[5px] bg-gray-250 animate-pulse font-bold mb-5">Сброс</div>
        </div>

        <div className='w-full h-[100px] rounded-[5px] bg-gray-250 animate-pulse mb-5' />
      </div>
    </div>
  );
};
