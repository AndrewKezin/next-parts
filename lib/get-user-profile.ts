import { prisma } from "@/prisma/prisma-client";
import { UserDTO } from "@/services/dto/cart.dto";

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
          },
          addresses: true,
        },
      });

      return user as UserDTO;
}