// УДАЛИТЬ




'use client';

import { PaymentData } from '@/@types/onlinekassa';
import { Button } from '@/components/ui';
import { useTestPayStore } from '@/store';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function TestPayOrderPage() {
  const testpayData = useTestPayStore((state) => state);

  const [loading, setLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);

      if (!testpayData.metadata.order_id) {
        return (location.href = process.env.NEXT_PUBLIC_MAIN_PAGE_URL as string);
      }
  
      if (!isRedirect) {
        // добавить данные
        const id =
          Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        testpayData.setId(id);
        testpayData.setPaid(true);
        testpayData.setStatus('SUCCESS');
        testpayData.setCreatedAt(new Date().toISOString());
  
        const { data } = await axios.post<PaymentData>(
          process.env.NEXT_PUBLIC_PAYORDER_CALLBACK_DATATRANSFER as string,
          testpayData,
        );

        if (data.status !== 'SUCCESS') {
          toast.error(' Ошибка оплаты', {
            icon: '❌',
          });
          return;
        }
  
        toast.success(' Оплата прошла успешно', {
          icon: '✅',
        });
  
        // очистить данные в сторе и localStorage
        testpayData.removeData();
  
        setIsRedirect(true);
      } else {
        location.href = process.env.NEXT_PUBLIC_PAYORDER_CALLBACK_URL as string;
      }
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-[50px] text-orange-500">Cтраница оплаты</h1>

      {/* Детали заказа */}
      <div className="mb-7 text-3xl text-center">
        <h2 className="text-3xl font-bold mb-3">Детали заказа:</h2>
        <p>
          Заказ # <b>{testpayData.metadata.order_id}</b>
        </p>
        <p>{isRedirect ? 'Заказ оплачен' : `Сумма к оплате: ${testpayData?.amount.value} ₽`}</p>
      </div>

      {/* Псевдокарта */}
      {(!isRedirect &&
        testpayData.metadata.order_id) && (
          <div className="flex flex-col items-center bg-gray-500 w-[500px] h-[300px] rounded-xl mb-7">
            <div className="h-2/6 text-amber-300 text-4xl pt-3">TESTBANK</div>
            <div className="h-1/6 w-[90%] flex items-end">
              <div className="bg-orange-300 w-[60px] h-[40px] rounded-xl"></div>
            </div>
            <div className="flex flex-row justify-around items-center px-5 w-[80%]">
              <div className="w-1/4 text-3xl text-white text-center">0000</div>
              <div className="w-1/4 text-3xl text-white text-center">1111</div>
              <div className="w-1/4 text-3xl text-white text-center">2222</div>
              <div className="w-1/4 text-3xl text-white text-center">3333</div>
            </div>
            <div className="h-1/6 flex justify-between items-center text-white text-2xl w-[90%] pl-5">
              <div>01/33</div>
              <div className="bg-white text-black ">CVV: 999</div>
            </div>
            <div className="h-1/6 text-white text-2xl w-[90%] pl-5 uppercase">cardholder name</div>
          </div>
        )}

      {/* Кнопка оплаты */}
      <Button onClick={onSubmit} loading={loading} className="w-[300px] mb-7">
        {isRedirect || !testpayData.metadata.order_id ? 'ВЕРНУТЬСЯ НА САЙТ МАГАЗИНА' : 'ОПЛАТИТЬ'}
      </Button>
    </div>
  );
}
