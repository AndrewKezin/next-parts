'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  deliveryMethod: 'pickup' | 'delivery';
  setDeliveryMethod: (method: 'pickup' | 'delivery') => void;
  className?: string;
}

export const CheckoutDeliveryMethod: React.FC<Props> = ({
  deliveryMethod,
  setDeliveryMethod,
  className,
}) => {
  const { control } = useFormContext();

  return (
    <div className="flex justify-around items-center gap-3 mb-3 sm:mb-9">
      <Controller
        name="deliveryMethod"
        control={control}
        render={({ field }) => (
          <>
            <div
              className={cn(
                'w-1/2 max-w-[200px] flex justify-center items-center rounded-md text-xl p-2 cursor-pointer transition ease-in-out',
                {
                  'bg-primary hover:bg-primary/80 text-white': deliveryMethod === 'pickup',
                  'bg-gray-300 hover:bg-gray-300/80 text-gray-600': deliveryMethod === 'delivery',
                },
              )}
              onClick={() => {
                field.onChange('PICKUP');
                setDeliveryMethod('pickup');
              }}>
              Самовывоз
            </div>
            <div
              className={cn(
                'w-1/2 max-w-[200px] flex justify-center items-center rounded-md text-xl p-2 cursor-pointer',
                {
                  'bg-primary hover:bg-primary/80 text-white': deliveryMethod === 'delivery',
                  'bg-gray-300 hover:bg-gray-300/80 text-gray-600': deliveryMethod === 'pickup',
                },
              )}
              onClick={() => {
                field.onChange('DELIVERY');
                setDeliveryMethod('delivery');
              }}>
              Доставка
            </div>
          </>
        )}
      />
    </div>
  );
};
