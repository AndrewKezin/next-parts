import React from 'react';
import { ItemSktn } from './item-sktn';

interface Props {
  className?: string;
}
export const NewProductSktn: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex items-center justify-center w-full gap-3">
      <div className="w-full flex flex-col items-center justify-center gap-1 border border-gray-300 p-3">
        <ItemSktn text="ID товара" width={200} />

        <ItemSktn text="Название" width={'full'} />

        <ItemSktn text="Категория" width={300} />

        <ItemSktn text="URL фото" width={'full'} mb={1} />
        <div className="w-[200px] h-[200px] rounded-[5px] bg-gray-200 animate-pulse" />

        <ItemSktn text="Производители" width={300} />

        <ItemSktn text="Дополнительно к товару" width={'full'} mb={5} />

        <div className="w-full flex items-center justify-around p-1">
          <div className="flex items-center justify-center w-[300px] h-[50px] rounded-[5px] bg-gray-200 font-bold mb-5">
            2. Добавить вариант товара
          </div>
          <div className="flex items-center justify-center w-[100px] h-[50px] rounded-[5px] bg-gray-200 font-bold mb-5">
            Сброс
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-1 border border-gray-250 p-3">
        <div className="underline">Варианты исполнения:</div>

        <ItemSktn text="Артикул товара" width={300} mb={5} />

        <div className="w-full flex justify-around items-center gap-3">
          <div className="w-1/2 flex flex-col items-center justify-center p-1">
            <ItemSktn text="Количество зубов диска" width={100} mb={5} />
          </div>

          <div className="w-1/2 flex flex-col items-center justify-center p-1">
            <ItemSktn text="Толщина диска" width={100} mb={5} />
          </div>
        </div>

        <div className="w-full flex justify-around items-center gap-3">
          <div className="w-1/2 flex flex-col items-center justify-center p-1">
            <ItemSktn text="Количество, шт" width={100} mb={5} />
          </div>

          <div className="w-1/2 flex flex-col items-center justify-center p-1">
            <ItemSktn text="Стоимость, ₽" width={100} mb={5} />
          </div>
        </div>

        <div className="w-full flex items-center justify-around p-1">
          <div className="flex items-center justify-center w-[300px] h-[50px] rounded-[5px] bg-gray-200 font-bold mb-5">
            2. Добавить вариант товара
          </div>
          <div className="flex items-center justify-center w-[100px] h-[50px] rounded-[5px] bg-gray-200 font-bold mb-5">
            Сброс
          </div>
        </div>

        <div className="w-full h-[100px] rounded-[5px] bg-gray-200 mb-5 animate-pulse" />
      </div>
    </div>
  );
};
