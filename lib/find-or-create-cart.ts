import { prisma } from '@/prisma/prisma-client';

/**
 * Эта функция найдет корзину по токену или userId или создаст её, если такой корзины нет в БД
 */
export const findOrCreateCart = async (userId: number | undefined, token: string | undefined) => {
  // найти корзину по userId или токену
  let userCart = await prisma.cart.findFirst({
    where: {
      OR: [
        {
          userId,
        },
        {
          token,
        },
      ],
    },
  });

// если корзина не нашлась, то создать её
  if (!userCart) {
    token = crypto.randomUUID();

    userCart = await prisma.cart.create({
      data: {
        userId,
        token,
      },
    });
  }

  return userCart;
};
