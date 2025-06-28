import React from 'react';
import { CheckoutItem, WhiteBlock } from '../shared';
import { CartStateItem } from '@/lib/get-cart-details';
import { getCartItemDetails } from '@/lib';
import { Skeleton } from '../ui';

interface Props {
  items: CartStateItem[];
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  updateItemQuantity,
  removeCartItem,
  loading,
  className,
}) => {
  console.log("render checkout cart");
  

  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(5)].map((_, index) => <Skeleton key={index} className="h-[100px] w-50" />)
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
                  ''
                }
                name={item.name}
                price={item.price}
                availableQuantity={item.availableQuantity}
                quantity={item.quantity}
                handleSetQuantity={(value) => updateItemQuantity(item.id, value)}
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
