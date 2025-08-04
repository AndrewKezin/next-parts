import React from 'react';
import { cn } from '@/lib/utils';
import { Trash } from 'lucide-react';
import * as CartItemDetails from '.';
import { Ingredient } from '@prisma/client';

interface Props {
  name: string;
  price: number;
  productItemId: string;
  imageUrl: string;
  availableQuantity: number;
  isExceeding?: boolean;
  quantity: number;
  details?: string;
  disabled?: boolean;
  handleSetQuantity: (value: number) => void;
  onClickRemove?: () => void;
  className?: string;
  ingredients?: Ingredient[];
}

export const CartItemBlockDesktop: React.FC<Props> = ({
  name,
  price,
  productItemId,
  imageUrl,
  availableQuantity,
  isExceeding,
  quantity,
  details,
  disabled,
  handleSetQuantity,
  onClickRemove,
  className,
}) => {
  return (
    <div
      className={cn(
        'hidden md:flex items-center justify-between gap-3 mb-5',
        { 'opacity-50 pointer-events-none': disabled },
        className,
      )}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info
          name={name}
          productItemId={productItemId}
          details={details}
          isExceeding={isExceeding}
        />
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
  );
};
