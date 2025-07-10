import React from 'react';
import { CheckoutItem, WhiteBlock } from '../shared';
import { CartStateItem } from '@/lib/get-cart-details';
import { checkExceeding, getCartItemDetails } from '@/lib';
import { Skeleton } from '../ui';
import { TCountOfSameItems } from '@/lib/get-exceeding-avail-quant';

interface Props {
  items: CartStateItem[];
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  isExceedingItems: boolean;
  countOfSameItems: TCountOfSameItems[];
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  updateItemQuantity,
  removeCartItem,
  isExceedingItems,
  countOfSameItems,
  loading,
  className,
}) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      {isExceedingItems && (
        <h3 className="text-red-500 text-center p-3 mb-5">
          В корзине имеются товары (выделены красным), общее количество которых превышает доступное
          для заказа! Пожалуйста, отредактируйте их количество.
        </h3>
      )}
      <div className="flex flex-col gap-5">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-[80px] w-full" />
            ))
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                productItemId={item.productItemId}
                disabled={item.disabled}
                imageUrl={item.imageUrl}
                details={
                  ((item.thickness || item.quantityOfTeeth) &&
                    getCartItemDetails(item.ingredients, item.thickness, item.quantityOfTeeth)) ||
                  (item.volume && getCartItemDetails(item.ingredients, null, null, item.volume)) ||
                  getCartItemDetails(item.ingredients)
                }
                name={item.name}
                price={item.price}
                availableQuantity={item.availableQuantity}
                quantity={item.quantity}
                isExceeding={checkExceeding(item.productItemId, countOfSameItems)}
                handleSetQuantity={(value) => updateItemQuantity(item.id, value)}
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
