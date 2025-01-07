'use server';

import { CheckoutFormValues } from '@/components/checkout/checkout-form-schema';
import { DeleteUserTemplate, PayOrderTemplate, VerificationUserTemplate } from '@/components/shared';
import { createPayment, sendEmail } from '@/lib';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus, Prisma } from '@prisma/client';
import { compareSync, hashSync } from 'bcrypt';
import { signOut } from 'next-auth/react';
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
      where: {
        token: cartToken,
      },
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
        userId: userCart.user?.id,
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
    return paymentData;
  } catch (err) {
    console.log('[CreateOrder] Server error: ', err);
  }
}

// Обновление информации о пользователе
export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    // получить пользователя из сессии
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    // обновить информацию о пользователе
    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (err) {
    console.log('[UpdateUserInfo] error: ', err);
  }
}

// Регистрация пользователя
export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    // проверить, что пользователь с таким email еще не зарегистрирован
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      // if (!user.verified) {
      //   throw new Error('Почта не подтверждена');
      // }

      throw new Error('Пользователь с таким email уже зарегистрирован');
    }

    // создать пользователя
    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password as string, 10),
      },
    });

    // создать код подтверждения
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // сохранить код в БД для пользователя
    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });
    // отправить письмо подтверждения регистрации на почту
    await sendEmail(
      createdUser.email,
      'NEXT PARTS - Подтверждение регистрации',
      VerificationUserTemplate({ code }),
    );
  } catch (err) {
    console.log('[RegisterUser] error: ', err);
    throw err;
  }
}

// Удаление пользователя
export async function deleteUserAccount({password}: {password: string}) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    if (!findUser) {
      throw new Error('Пользователь не найден');
    }

    if (!compareSync(password, findUser.password)) {
      throw new Error('Неверный пароль');
    }

    await prisma.user.delete({
      where: {
        id: Number(currentUser.id),
      }
    })

    await sendEmail(
      findUser.email,
      'NEXT PARTS - Удаление аккаунта',
      DeleteUserTemplate({})
    );

    return true;
  } catch(err) {
  console.log('[DeleteUserInfo] error: ',err);
  };
};

// Выход из аккаунта
export async function logoutUser() {
  try {
    const cookieStore = cookies();
    cookieStore.delete('cartToken');
    cookieStore.delete('privacy-consent');
  } catch (err) {
    console.log('[LogoutUser] error: ', err);
  }
}