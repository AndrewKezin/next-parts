import { NextRequest, NextResponse } from 'next/server';

// POST-запрос на api/order/testpayment
// POST-запрос на создание оплаты в онлайн-кассе. Это тестовая функция. Создает ссылку для редиректа на тестовую страницу оплаты и передает данные POST-запроса
export async function POST(req: NextRequest) {
  // вытаскиваем данные из запроса
  const data = await req.json();

  const redirectPaymentUrl = process.env.TEST_PAYODRER_PAGE_URL as string;

  data.confirmation = {
    ...data.confirmation,
    confirmation_url: redirectPaymentUrl,
  };

  return NextResponse.json(data);
}
