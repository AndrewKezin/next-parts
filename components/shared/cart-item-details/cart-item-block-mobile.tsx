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

export const CartItemBlockMobile: React.FC<Props> = ({
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
        'flex items-center justify-between gap-3 mb-5 md:hidden',
        { 'opacity-50 pointer-events-none': disabled },
        className,
      )}>
      <CartItemDetails.Image src={imageUrl} />

      <div className="flex-1 flex flex-col items-start gap-2">
        <CartItemDetails.Info
          name={name}
          productItemId={productItemId}
          details={details}
          isExceeding={isExceeding}
        />

        <CartItemDetails.Price
          value={price / quantity}
          className="text-sm md:text-md font-medium"
          endText="/шт"
        />

        <div className="w-full flex items-center justify-between gap-1">
          <CartItemDetails.CountButton
            availableQuantity={availableQuantity}
            handleSetQuantity={(value) => {
              handleSetQuantity(value);
            }}
            value={quantity}
          />

          <button type="button" onClick={onClickRemove}>
            <Trash className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
          </button>
        </div>

        <CartItemDetails.Price value={price} className="font-bold" />
      </div>
    </div>
  );
};
