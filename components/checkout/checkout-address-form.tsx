'use client';

import { useEffect, useState } from 'react';
import { WhiteBlock } from '../shared';
import { CheckoutDeliveryMethod } from './checkout-delivery-method';
import { CheckoutDelivery } from './checkout-delivery';
import { CheckoutPickup } from './checkout-pickup';
import { UserAddresses } from '@prisma/client';
import { useFormContext } from 'react-hook-form';

interface Props {
  addresses?: UserAddresses[];
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ addresses, className }) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

  return (
    <WhiteBlock
      title={deliveryMethod === 'pickup' ? '3. Адрес магазина' : '3. Адрес доставки'}
      className={className}>
      <CheckoutDeliveryMethod
        deliveryMethod={deliveryMethod}
        setDeliveryMethod={setDeliveryMethod}
      />

      {deliveryMethod === 'delivery' ? (
        <CheckoutDelivery addresses={addresses} />
      ) : (
        <CheckoutPickup />
      )}
    </WhiteBlock>
  );
};
