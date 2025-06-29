'use client';

import { useState } from 'react';
import { WhiteBlock } from '../shared';
import { CheckoutDeliveryMethod } from './checkout-delivery-method';
import { CheckoutDelivery } from './checkout-delivery';
import { CheckoutPickup } from './checkout-pickup';

interface Props {
  inputValue?: string;
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ inputValue, className }) => {
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
        <CheckoutDelivery defaultAddress={inputValue} />
      ) : (
        <CheckoutPickup />
      )}
    </WhiteBlock>
  );
};
