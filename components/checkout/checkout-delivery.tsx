import React from 'react';
import { FormTextarea } from '../shared';
import { UserAddresses } from '@prisma/client';
import { CheckoutAddressesBlock } from './checkout-addresses-block';

interface Props {
  addresses?: UserAddresses[];
  className?: string;
}

export const CheckoutDelivery: React.FC<Props> = ({ addresses, className }) => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-xl font-bold">Выберите адрес доставки:</h3>

      {addresses && <CheckoutAddressesBlock addresses={addresses} />}

      <FormTextarea
        name="comment"
        rows={5}
        className="text-base"
        placeholder="Комментарий к заказу"
      />
    </div>
  );
};
