import { cn } from '@/lib/utils';
import React from 'react';
import { ItemElementProp } from './item-element-prop';

interface Props {
  item: any;
  categoryId: string;
  className?: string;
}

export const ItemElement: React.FC<Props> = ({ item, categoryId, className }) => {
  return (
    <div
      className={cn(
        'w-full flex justify-center items-center gap-2 p-1 border border-gray-300 rounded-[3px] bg-white',
        className,
      )}>
      <ItemElementProp text="Артикул" value={item.id} />
      {categoryId === 'Диски' && (
        <>
          <ItemElementProp text="Кол-во зуб." value={item.quantityOfTeeth} />
          <ItemElementProp text="Толщина диска, мм" value={item.thickness} />
        </>
      )}
      {categoryId === 'Масла' && <p>Объем кан., л: {item.volume}</p>}
      <ItemElementProp text="Кол-во, шт" value={item.quantity} />
      <ItemElementProp text="Цена, ₽" value={item.price} />
    </div>
  );
};
