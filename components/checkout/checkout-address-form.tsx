'use client';

import { AddressInput, ErrorText, FormTextarea, WhiteBlock } from '../shared';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  inputValue?: string;
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ inputValue, className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <AddressInput defaultQuery={inputValue} onChange={field.onChange} />
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
    </WhiteBlock>
  );
};
