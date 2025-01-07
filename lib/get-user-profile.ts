import { prisma } from "@/prisma/prisma-client";

/**
 * Получить информацию о пользователе и его заказах
 * @param id пользователя
 * @returns 
 */
export const getUserProfile = async (id: string) => {
    const user = await prisma.user.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          orders: true,
          cart: {
            include: {
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
          }
        },
      });

      return user;
}