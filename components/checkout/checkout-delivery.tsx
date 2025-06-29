'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { AddressInput, ErrorText, FormTextarea } from '../shared';

interface Props {
  defaultAddress: string | undefined;
  className?: string;
}

export const CheckoutDelivery: React.FC<Props> = ({ defaultAddress, className }) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-xl font-bold">Выберите адрес доставки:</h3>
      <Controller
        name="address"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <AddressInput defaultQuery={defaultAddress} onChange={field.onChange} />
            {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
          </>
        )}
      />
      <FormTextarea
        name="comment"
        rows={5}
        className="text-base"
        placeholder="Комментарий к заказу"
      />
    </div>
  );
};
