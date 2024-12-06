import React from 'react';
import { CheckoutItem, WhiteBlock } from '../shared';
import { CartStateItem } from '@/lib/get-cart-details';
import { getCartItemDetails } from '@/lib';
import { Skeleton } from '../ui';

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  loading,
  className,
}) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(5)].map((_, index) => <Skeleton key={index} className="h-12 w-50" />)
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                disabled={item.disabled}
                imageUrl={item.imageUrl}
                details={
                  ((item.thickness || item.quantityOfTeeth) &&
                    getCartItemDetails(item.ingredients, item.thickness, item.quantityOfTeeth)) ||
                  (item.volume && getCartItemDetails(item.ingredients, null, null, item.volume)) ||
                  ''
                }
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
