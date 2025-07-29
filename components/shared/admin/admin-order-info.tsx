import { cn } from '@/lib/utils';
import { CartItemDTO } from '@/services/dto/cart.dto';
import { Order } from '@prisma/client';
import React from 'react';
import { CartItemsView } from '../cart-items-view';
import { OrderView } from '../order-view';

interface Props {
  order: Order;
  paymentUrl?: string;
  className?: string;
}

export const AdminOrderInfo: React.FC<Props> = ({ order, paymentUrl, className }) => {
  const items: CartItemDTO[] = JSON.parse(order.items as string);

  return (
    <div className={cn('w-full', className)}>
      <OrderView order={order} paymentUrl={paymentUrl} className="overflow-x-auto" />

      <h3 className="text-xl font-bold mb-3 text-center">Товары</h3>

      {items && items.length > 0 && <CartItemsView items={items} className="overflow-x-auto" />}
    </div>
  );
};
