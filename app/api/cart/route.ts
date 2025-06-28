import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { findOrCreateCart } from '@/lib/find-or-create-cart';
import { CreateCartItemValues } from '@/services/dto/cart.dto';
import { updateCartTotalAmount } from '@/lib/update-cart-total-amount';
import { getUserSession } from '@/lib/get-user-session';

// GET-запрос на получение корзины
export async function GET(req: NextRequest) {
  try {
    const currentUser = await getUserSession();
    const userId = Number(currentUser?.id);
    const token = req.cookies.get('cartToken')?.value;

    if (!userId && !token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    // найти корзину, у которой есть такой токен или userId
    const userCart = await prisma.cart.findFirst({
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
      // вернуть все товары из корзины и отсортировать их по дате создания (по убыванию)
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          // вместе с items вернуть информацию о продукте, в которой сам продукт и ингредиенты
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (err) {
    console.log(err);
  }
}

// POST-запрос на добавление товара в корзину (и создание корзины, если её нет)
export async function POST(req: NextRequest) {
  try {
    const currentUser = await getUserSession();
    const userId = Number(currentUser?.id);
    let token = req.cookies.get('cartToken')?.value;

    // if (!userId) {
    //   if (!token) {
    //     token = crypto.randomUUID();
    //   }
    // }

    // найти корзину по токену или создать её
    const userCart = await findOrCreateCart(userId, token);

    // вытащить данные товара из запроса
    const data = (await req.json()) as CreateCartItemValues;

    // проверка, нет ли уже в корзине такого же товара с такими же ингредиентами. Если есть, то увеличить количество этого товара на один.
    // КОД НИЖЕ НЕ РАБОТАЕТ. ПРИЗМА НЕ УМЕЕТ ЧЕТКО ПРОХОДИТЬСЯ ПО ВСЕМ ИНГРЕДИЕНТАМ. НУЖНО ПИСАТЬ SQL-ЗАПРОС.
    // const findCartItem = await prisma.cartItem.findFirst({
    //   where: {
    //     cartId: userCart.id,
    //     productItemId: data.productItemId,
    //     ingredients: {
    //       // каждый id в этом ингредиенте должен соответствовать массиву, переданному от клиента
    //       every: {
    //         id: {
    //           in: data.ingredients,
    //         },
    //       },
    //     },
    //   },
    // });

    // и если такой товар есть, то обновить его количество на +1
    // if (findCartItem) {
    //   await prisma.cartItem.update({
    //     where: {
    //       id: findCartItem.id,
    //     },
    //     data: {
    //       quantity: findCartItem.quantity + 1,
    //     },
    //   });
    // } else {
    //   // если такого товара в корзине нет, то добавить его
    //   await prisma.cartItem.create({
    //     data: {
    //       cartId: userCart.id,
    //       productItemId: data.productItemId,
    //       quantity: 1,
    //       ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
    //     },
    //   });
    // }

    // костыль для кода вверху: найти товар по productItemId и вернуть его с ингредиентами. Затем найти такой товар, у которого каждый ингредиент совпадает с ингредиентами, переданными от клиента в запросе. Если такой товар есть, то обновить его количество на +1. Если такого нет, то добавить его.
    const findCartItemId = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productItemId: String(data.productItemId),
      },
      include: {
        ingredients: true,
      },
    });

    // поиск одинаковых товаров. Если есть ингредиенты, то они должны совпадать. Если ингредиентов нет, то productItemId должен совпадать
    const findCartItemWithSameIngredients = findCartItemId.find(
      (item) =>
        (item.ingredients.length === data.ingredients?.length &&
          item.ingredients.every((ingredient) => data.ingredients?.includes(ingredient.id))) ||
        (item.ingredients.length === 0 && item.productItemId === data.productItemId),
    );

    // если одинаковый товар нашелся, то прибавить его количество. Если такого нет, то добавить его в корзину
    if (findCartItemWithSameIngredients) {
      await prisma.cartItem.update({
        where: {
          id: findCartItemWithSameIngredients.id,
        },
        data: {
          quantity: findCartItemWithSameIngredients.quantity + data.quantity,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: data.quantity,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    // затем, обновить корзину
    const updatedUserCart = await updateCartTotalAmount(userCart.token as string);

    // генерируем ответ
    const resp = NextResponse.json(updatedUserCart);
    // добавить в ответ токен
    resp.cookies.set('cartToken', userCart.token as string, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
    // возвращаем ответ
    return resp;
  } catch (err) {
    console.log('[CART_POST] Server error', err);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
}
