import { prisma } from '@/prisma/prisma-client';

/**
 * Эта функция найдет корзину по токену или создаст её, если такой корзины нет в БД
 */
export const findOrCreateCart = async (token: string) => {
  let userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
  });

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        token,
      },
    });
  }

  return userCart;
};
