import { FilePen, SearchCheck, Trash } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
}

export const ProductSktn: React.FC<Props> = ({ className }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-2">
      <div className="w-full flex-col border border-primary rounded bg-white p-2">
        {/* Верхний блок */}
        <div className="w-full flex bg-white p-2">
          <div className="w-[150px] flex flex-col items-center justify-center border border-gray-300">
            <div className="underline text-gray-300">ID товара:</div>
            <div className="flex flex-col gap-3 justify-center items-center">
              {/* Посмотреть товар в новом окне */}
              <div className="w-[100px] h-[30px] rounded-[5px] bg-gray-200 animate-pulse" />
              <SearchCheck className="text-gray-300" />
              {/* Удалить товар */}
              <Trash className="text-gray-300" />
              {/* Редактировать товар */}
              <FilePen className="text-gray-300 mb-2" />
            </div>
          </div>
          <div className="w-[300px] flex flex-col flex-1 items-center justify-center border border-gray-300">
            <div className="underline text-gray-300">Название:</div>
            <div className="w-[300px] h-[30px] rounded-[5px] bg-gray-200 animate-pulse" />
          </div>
          <div className="w-[100px] flex flex-col items-center justify-center border border-gray-300">
            <div className="underline text-gray-300">Категория:</div>
            <div className="w-[70px] h-[30px] rounded-[5px] bg-gray-200 animate-pulse" />
          </div>
          <div className="w-[150px] min-h-full flex flex-col items-center justify-center border border-gray-300 relative">
            <div className="h-full w-full rounded-[5px] bg-gray-200 animate-pulse" />
          </div>
          <div className="w-[200px] flex flex-col items-center justify-center border border-gray-300">
            <div className="underline text-gray-300">Производители:</div>
            <div className="w-[150px] h-[30px] rounded-[5px] bg-gray-200 animate-pulse" />
          </div>
        </div>

        {/* Нижний блок */}
        <div className="w-full flex justify-center items-center bg-white p-2">
          <div className="w-[500px] h-[80px] rounded-[5px] bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
