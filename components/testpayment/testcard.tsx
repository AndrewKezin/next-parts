'use client';

import { PaymentData } from '@/@types/onlinekassa';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui';

interface Props {
  isPaid: boolean;
  testpayData: any;
}

export const TestCard: React.FC<Props> = ({ isPaid, testpayData }) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);

      if (!isPaid) {
        // добавить данные
        testpayData.status = 'SUCCESS';
        testpayData.createdAt = new Date();

        // передать данные на эндпоинт, который будет обрабатывать оплату и запишет данные в БД TestPayment
        const { data: result } = await axios.post<PaymentData>(
          ((((process.env.NEXT_PUBLIC_MAIN_PAGE_URL as string) +
            process.env.NEXT_PUBLIC_API_URL) as string) +
            process.env.NEXT_PUBLIC_TEST_PAYORDER_PAID_ENDPOINT) as string,
          testpayData,
        );

        if (!result) {
          toast.error('Ошибка оплаты', {
            icon: '❌',
          });
          return;
        }

        // передать данные на эндпоинт, который будет обрабатывать проведенную оплату и запишет данные в БД Order
        const { data } = await axios.post<PaymentData>(
          ((((process.env.NEXT_PUBLIC_MAIN_PAGE_URL as string) +
            process.env.NEXT_PUBLIC_API_URL) as string) +
            process.env.NEXT_PUBLIC_PAYORDER_CALLBACK_DATATRANSFER) as string,
          testpayData,
        );

        if (data.status !== 'SUCCESS') {
          toast.error(' Ошибка оплаты', {
            icon: '❌',
          });
        }

        toast.success(' Оплата прошла успешно', {
          icon: '✅',
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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

      {/* Кнопка оплаты */}
      <Button
        onClick={onSubmit}
        loading={loading}
        className="w-[500px] h-[50px] text-xl font-bold mb-7">
        ОПЛАТИТЬ
      </Button>
    </>
  );
};
