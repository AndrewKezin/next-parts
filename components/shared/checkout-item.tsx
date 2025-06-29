import React from 'react';
import { cn } from '@/lib/utils';
import { Trash } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';
import { Ingredient } from '@prisma/client';

interface Props extends CartItemProps {
  availableQuantity: number;
  handleSetQuantity: (value: number) => void;
  onClickRemove?: () => void;
  ingredients?: Ingredient[];
  className?: string;
}

export const CheckoutItem = ({
  name,
  price,
  imageUrl,
  availableQuantity,
  quantity,
  details,
  disabled,
  className,
  handleSetQuantity,
  onClickRemove,
}: Props) => {
  return (
    <div className="flex flex-col gap-1 border-b last:border-b-0 border-gray-200">
      <div
        className={cn('hidden', {
          'flex justify-end items-center text-md text-red-500': quantity === availableQuantity,
        })}>
        Доступно для заказа {availableQuantity}шт
      </div>
      <div
        className={cn(
          'flex items-center justify-between gap-3 mb-5 ',
          { 'opacity-50 pointer-events-none': disabled },
          className,
        )}>
        <div className="flex items-center gap-5 flex-1">
          <CartItemDetails.Image src={imageUrl} />
          <CartItemDetails.Info name={name} details={details} />
        </div>

        <CartItemDetails.Price value={price / quantity} className="font-medium" endText="/шт" />

        <div className="flex items-center gap-5 ml-5">
          <CartItemDetails.CountButton
            availableQuantity={availableQuantity}
            handleSetQuantity={(value) => {
              handleSetQuantity(value);
            }}
            value={quantity}
          />

          <CartItemDetails.Price value={price} className="font-bold" />

          <button type="button" onClick={onClickRemove}>
            <Trash className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
