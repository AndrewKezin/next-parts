import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button } from '../ui';

interface Props {
  totalAmount: number;
  hasDelivery: boolean;
  btnDisabled?: boolean;
  loading?: boolean;
  className?: string;
}

const VAT = 20;
const DELIVERY_PRICE = 500;

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  hasDelivery,
  btnDisabled,
  loading,
  className,
}) => {
  const deliveryPrice = hasDelivery ? DELIVERY_PRICE : 0;

  const totalPrice = totalAmount + deliveryPrice;

  return (
    <WhiteBlock className="p-6 sticky top-4 mb-3">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        <span className="text-[34px] font-extrabold">
          {loading ? 'Загрузка...' : `${totalPrice} ₽`}
        </span>
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={20} className="mr-2 text-gray-400" />
            Стоимость товара:
          </div>
        }
        value={loading ? 'Загрузка...' : `${totalAmount} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={20} className="mr-2 text-gray-400" />В т.ч. НДС 20%:
          </div>
        }
        value={loading ? 'Загрузка...' : `${(totalAmount * VAT) / 100} ₽`}
      />

      {hasDelivery && (
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Truck size={20} className="mr-2 text-gray-400" />
              Доставка:
            </div>
          }
          value={`${deliveryPrice} ₽`}
        />
      )}

      <Button
        type="submit"
        loading={loading}
        disabled={loading || btnDisabled}
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
