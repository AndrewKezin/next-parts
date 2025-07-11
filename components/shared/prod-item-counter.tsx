import React from 'react';
import { Counter } from './counter';
import { Button } from '../ui';

interface Props {
  currentItemIdCount: number;
  quantity: number;
  totalPrice: number;
  loading?: boolean;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  handleClickAdd: () => void;
}

export const ProdItemCounter: React.FC<Props> = ({
  currentItemIdCount,
  quantity,
  setQuantity,
  handleClickAdd,
  totalPrice,
  loading,
}) => {
  if (currentItemIdCount === 0) return <div className='pt-10 mb-5 text-center font-semibold'>Временно нет в наличии</div>;

  return (
    <>
      {/* Доступное количество */}
      <div className="mt-3 mb-3 flex justify-center items-center gap-1 text-gray-400 text-md">
        <span>В наличии:</span>
        <span>{currentItemIdCount}шт</span>
      </div>

      {/* Выбор количества */}
      <Counter setQuantity={setQuantity} availableQuantity={currentItemIdCount} />

      <Button
        loading={loading}
        disabled={quantity === 0}
        onClick={handleClickAdd}
        className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
        Добавить в корзину за {totalPrice} ₽
      </Button>
    </>
  );
};
