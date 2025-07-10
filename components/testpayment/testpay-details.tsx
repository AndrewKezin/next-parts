import React from 'react';

interface Props {
  orderId: string | number;
  amount: string;
  isPaid: boolean;
  className?: string;
}

export const TestPayDetails: React.FC<Props> = ({ orderId, amount, isPaid, className }) => {
  return (
    <div className="mb-7 text-3xl text-center">
      <h2 className="text-3xl font-bold mb-3">Детали заказа:</h2>
      <p>
        Заказ # <b>{orderId}</b>
      </p>
      <p>{isPaid ? 'Заказ оплачен' : `Сумма к оплате: ${amount} ₽`}</p>
    </div>
  );
};
