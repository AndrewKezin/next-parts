import React from 'react';
import { cn } from '@/lib/utils';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';
import { Ingredient } from '@prisma/client';

interface Props extends CartItemProps {
  availableQuantity: number;
  isExceeding?: boolean;
  handleSetQuantity: (value: number) => void;
  onClickRemove?: () => void;
  ingredients?: Ingredient[];
  className?: string;
}

export const CheckoutItem = ({
  name,
  price,
  productItemId,
  imageUrl,
  availableQuantity,
  isExceeding,
  quantity,
  details,
  disabled,
  className,
  handleSetQuantity,
  onClickRemove,
}: Props) => {
  return (
    <div className="flex flex-col gap-1 border-b last:border-b-0 border-gray-200">
      {/* предупреждение если достигнут лимит количества */}
      <div
        className={cn('hidden', {
          'flex justify-end items-center text-md text-red-500': quantity === availableQuantity,
        })}>
        Доступно для заказа {availableQuantity}шт
      </div>

      {/* информация о товаре (десктопная версия) */}
      <CartItemDetails.BlockDesktop
        name={name}
        price={price}
        productItemId={productItemId}
        imageUrl={imageUrl}
        availableQuantity={availableQuantity}
        isExceeding={isExceeding}
        quantity={quantity}
        details={details}
        disabled={disabled}
        handleSetQuantity={handleSetQuantity}
        onClickRemove={onClickRemove}
        className={className}
      />

      {/* информация о товаре (мобильная версия) */}
      <CartItemDetails.BlockMobile
        name={name}
        price={price}
        productItemId={productItemId}
        imageUrl={imageUrl}
        availableQuantity={availableQuantity}
        isExceeding={isExceeding}
        quantity={quantity}
        details={details}
        disabled={disabled}
        handleSetQuantity={handleSetQuantity}
        onClickRemove={onClickRemove}
        className={className}
      />
    </div>
  );
};
