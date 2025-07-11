import { PaymentData } from '@/@types/onlinekassa';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

// POST-запрос на api/order/testpayment
// POST-запрос на создание оплаты в онлайн-кассе. Это тестовая функция. Создает ссылку для редиректа на тестовую страницу оплаты и передает данные POST-запроса
export async function POST(req: NextRequest) {
  try {
    // !!!!!!!!!!!!!! СДЕЛАТЬ ЗАЩИТУ ОТ НЕСАНКЦИОНИРОВАННОГО ДОСТУПА !!!!!!!!!!!!!

    // вытаскиваем данные из запроса
    const data: PaymentData = await req.json();

    // не в рамках курса
    const paymentId = crypto.randomUUID();
    const redirectPaymentUrl =
      (process.env.NEXT_PUBLIC_MAIN_PAGE_URL as string) +
      process.env.NEXT_PUBLIC_TEST_PAYODRER_PAGE_URL +
      '/' +
      paymentId;

    data.id = paymentId;

    data.confirmation = {
      ...data.confirmation,
      confirmation_url: redirectPaymentUrl,
    };

    // не по курсу
    const amount = JSON.stringify(data.amount);
    const confirmation = JSON.stringify(data.confirmation);
    const metadata = JSON.stringify(data.metadata);
    const recipient = JSON.stringify(data.recipient);

    // не в рамках курса: создать запись в БД (тестовый платеж)
    await prisma.testPayment.create({
      data: {
        id: paymentId,
        amount: amount,
        confirmation: confirmation,
        metadata: metadata,
        status: 'PENDING',
        description: data.description,
        recipient: recipient,
        test: false,
        paid: false,
        refundable: false,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    console.log('[TEST_PAYMENT] Error', err);
    return NextResponse.json({ message: '[TEST_PAYMENT] Error' }, { status: 500 });
  }
}
