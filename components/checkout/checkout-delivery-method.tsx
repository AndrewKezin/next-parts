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
    <div className="flex justify-around items-center gap-3 mb-9">
      <Controller
        name="deliveryMethod"
        control={control}
        render={({ field }) => (
          <>
            <div
              className={cn(
                'w-[200px] flex justify-center items-center rounded-md text-xl p-2 cursor-pointer',
                {
                  'bg-primary text-white': deliveryMethod === 'pickup',
                  'bg-gray-300 text-gray-600': deliveryMethod === 'delivery',
                },
              )}
              onClick={() => {
                field.onChange('pickup');
                setDeliveryMethod('pickup');
              }}>
              Самовывоз
            </div>
            <div
              className={cn(
                'w-[200px] flex justify-center items-center rounded-md text-xl p-2 cursor-pointer',
                {
                  'bg-primary text-white': deliveryMethod === 'delivery',
                  'bg-gray-300 text-gray-600': deliveryMethod === 'pickup',
                },
              )}
              onClick={() => {
                field.onChange('delivery');
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
