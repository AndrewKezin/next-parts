'use server';

import { CheckoutFormValues } from '@/components/checkout/checkout-form-schema';
import { PayOrderTemplate } from '@/components/shared';
import { createPayment, sendEmail } from '@/lib';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';

// серверные экшены

// Создание заказа
export async function createOrder(data: CheckoutFormValues) {
  try {
    // вытащить токен пользователя из куки при помощи next/headers
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Токен корзины не найден');
    }

    // найти корзину по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    // если корзина не найдена, возвращаем ошибку
    if (!userCart) {
      throw new Error('Корзина не найдена');
    }

    // если корзина пуста, возвращаем ошибку
    if (userCart.totalAmount === 0) {
      throw new Error('Корзина пуста');
    }

    // Создать заказ
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    // очистить корзину:
    // обнулить общую стоимость
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    // удалить товары в этой корзине
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // функция оплаты (создать платеж в онлайн-кассе)
    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: 'Оплата заказа # ' + order.id,
    });

    // если платеж не создан, возвращаем ошибку
    if (!paymentData) {
      throw new Error('Не удалось создать платеж');
    }

    // Если платеж был создан, то обновить заказ в БД
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        // уникальный идентификатор платежа (необходим для возврата денег в случае возврата)
        paymentId: paymentData.id,
      },
    });

    // получаем ссылку на оплату в онлайн-кассе
    const paymentUrl = paymentData.confirmation.confirmation_url;

    // отправляем письмо заказчику с ссылкой на оплату
    await sendEmail(
      data.email,
      'NextParts - Заказ # ' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      }),
    );

    // возвращаем ссылку на оплату (по курсу)
    // return paymentUrl;

    // возвращаем данные о заказе (мой вариант для тестовой оплаты)
    return paymentData
  } catch (err) {
    console.log('[CreateOrder] Server error: ', err);
  }
}
