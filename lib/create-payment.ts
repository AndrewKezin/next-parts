import { PaymentData } from '@/@types/onlinekassa';
import axios from 'axios';

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  const { data } = await axios.post<PaymentData>(
    process.env.NEXT_PUBLIC_TEST_PAYODRER_QUERY_ENDPOINT as string,
    {
      // POST-информация (информация о платеже)
      amount: {
        value: details.amount,
        currency: 'RUB',
      },
      capture: true,
      // подробности заказа
      description: details.description,
      // данные о заказе - важно! Чтобы знать, какой именно заказ был оплачен
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.NEXT_PUBLIC_PAYORDER_CALLBACK_URL as string,
      },
      recipient: {
        account_id: '',
        gateway_is: '',
      },
    },
    {
      // авторизационная информация
      // auth: {
      //   username: process.env.ONLINEKASSA_USERNAME as string,
      //   password: process.env.ONLINEKASSA_API_KEY as string,
      // },
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    },
  );

  return data;
}
