import { PaymentData } from '@/@types/onlinekassa';
import { OrderSuccessTemplate } from '@/components/shared';
import { sendEmail } from '@/lib';
import { prisma } from '@/prisma/prisma-client';
import { CartItemDTO } from '@/services/dto/cart.dto';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // для ukassa есть интерфейс PaymentCallbackData
    const body = (await req.json()) as PaymentData;

    // найти заказ в БД по id из тела запроса
    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    // обновить статус заказа в БД
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: OrderStatus.SUCCESSED,
      },
    });

    body.status = 'SUCCESSED';

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
    return NextResponse.json({ error: 'Server error' });
  }
}
