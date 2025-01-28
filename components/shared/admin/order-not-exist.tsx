'use client';

import { Button } from '@/components/ui';
import React, { useEffect } from 'react';

interface Props {
  handleClearSearch: () => void;
  className?: string;
}

export const OrderNotExist: React.FC<Props> = ({ handleClearSearch, className }) => {
    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Backspace') {
          handleClearSearch();
        }
      };

    useEffect(() => {
          document.addEventListener('keydown', handleKeyPress);

          return () => {
            document.removeEventListener('keydown', handleKeyPress);
          };
    }, []);

  
  return (
    <div className={className}>
      <div className="flex flex-col items-center w-full mb-10">
        <h2 className="text-2xl font-bold mt-10 mb-7 text-center">Заказа с таким номером не существует, либо заказы по указанным параметрам поиска отсутствуют</h2>

        <Button variant={'outline'} className="w-[250px] mb-3" onClick={handleClearSearch}>
          Сбросить параметры поиска
        </Button>
        <p>или нажмите "backspace" на клавиатуре</p>
      </div>
    </div>
  );
};
