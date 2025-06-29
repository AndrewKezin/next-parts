import React from 'react';
import { FormTextarea } from '../shared';

interface Props {
  className?: string;
}

export const CheckoutPickup: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h3 className="text-2xl font-bold">Адрес магазина:</h3>
      <p className="text-xl">999999 Россия, г. Урюпинск, ул. Электронщиков, д. 10101</p>
      <p className="text-xl">Время работы: пн-пт с 10:00 до 19:00</p>
      <p className="text-xl">Телефон: +7 (000) 123-45-67</p>
      <p className="text-md text-center">
        Заказ можно получить через 30 мин после оформления до 18:00 по МСК, либо в течение 3-х дней
        после оформления
      </p>

      <FormTextarea
        name="comment"
        rows={5}
        className="w-full text-base"
        placeholder="Комментарий к заказу"
      />
    </div>
  );
};
