import { updateCartTotalAmount } from '@/lib/update-cart-total-amount';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

// запрос на обновление количества товаров в корзине
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Токен корзины не найден' });
    }

    const carItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!carItem) {
      return NextResponse.json({ error: 'Такой элемент корзины не найден' });
    }

    // обновляем количество товара в корзине
    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: data.quantity,
      },
    });

    // получить обновленную корзину
    const updatedUserCart = await updateCartTotalAmount(token);

    // вернуть обновленную корзину пользователю (на клиенте)
    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_PATCH] Server error', error);
    return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 });
  }
}

// Запрос на удаление товара из корзины
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Токен корзины не найден' });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Такой элемент корзины не найден' });
    }

    await prisma.cartItem.delete({
      where: {
        id: Number(params.id),
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (err) {
    console.log('[CART_DELETE] Server error', err);
    return NextResponse.json({ message: 'Не удалось удалить элемент из корзины' }, { status: 500 });
  }
}
