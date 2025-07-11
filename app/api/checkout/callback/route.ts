import { OrderSuccessTemplate } from '@/components/shared';
import { sendEmail } from '@/lib';
import { prisma } from '@/prisma/prisma-client';
import { CartItemDTO } from '@/services/dto/cart.dto';
import { OrderStatus, TestPayment } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // для ukassa есть интерфейс PaymentCallbackData
    const body: TestPayment = await req.json();

    const { order_id: orderId } = JSON.parse(body.metadata as string);

    // найти заказ в БД по id из тела запроса
    const order = await prisma.order.findFirst({
      where: {
        id: Number(orderId),
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Заказ не найден' }, { status: 404 });
    }

    // обновить статус заказа в БД
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: OrderStatus.SUCCESS,
      },
    });

    body.status = 'SUCCESS';

    // найти товары в заказе
    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    // отправить письмо
    await sendEmail(
      order.email,
      'Next Parts | Ваш заказ успешно оформлен',
      OrderSuccessTemplate({ orderId: order.id, items }),
    );

    return NextResponse.json(body);
  } catch (err) {
    console.log('[Checkout Callback] Error: ', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
