'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import * as CartItem from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CountButton } from './count-button';
import { Trash2Icon } from 'lucide-react';
import { CartDrawerItemImage } from './cart-drawer-item-image';

interface Props extends CartItemProps {
  availableQuantity: number;
  handleSetQuantity: (value: number) => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  imageUrl,
  name,
  productItemId,
  price,
  availableQuantity,
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
        'flex flex-col items-center justify-center sm:flex-row bg-white p-5 gap-6',
        { 'opacity-50 pointer-events-none': disabled },
        className,
      )}>
      <CartDrawerItemImage src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} productItemId={productItemId} />

        <hr className="my-3" />

        <div className="w-full flex flex-col justify-center gap-2">
          <div className="text-md">Доступно для заказа: {availableQuantity}шт</div>

          <div className="flex items-center justify-between">
            <CountButton
              handleSetQuantity={(value) => handleSetQuantity(value)}
              availableQuantity={availableQuantity}
              value={quantity}
            />

            <div className="flex items-center gap-3">
              <CartItem.Price value={price} />
              <Trash2Icon
                onClick={onClickRemove}
                className="text-gray-400 cursor-pointer hover:text-gray-600"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
