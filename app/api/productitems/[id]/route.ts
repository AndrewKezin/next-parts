import { prisma } from '@/prisma/prisma-client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { FetchProducts } from '@/services/dto/cart.dto';
import { checkAdminRules } from '@/lib/check-admin-rules';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminRules = await checkAdminRules(true);

    if (adminRules.status !== 200) {
      return NextResponse.json({ message: adminRules.message }, { status: adminRules.status });
    }

    const productItem = await prisma.productItem.findFirst({
      where: {
        id: params.id,
      },
      select: {
        product: {
          include: {
            category: true,
            ingredients: true,
            items: {
              where: {
                id: params.id,
              },
            },
            gearboxesManufacturers: true,
          },
        },
      },
    });

    const product = productItem?.product;
    const res: FetchProducts = { products: product ? [product] : [], totalCount: 1 };

    return NextResponse.json(res);
  } catch (err) {
    console.log('[GET_PRODUCTITEMS] Error', err);
    return NextResponse.json({ message: '[GET_PRODUCTITEMS] Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
    }

    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Недостаточно прав' }, { status: 403 });
    }

    if (!params.id) {
      return NextResponse.json({ message: 'Некорректные данные' }, { status: 400 });
    }

    const product = await prisma.product.findFirst({
      where: {
        items: {
          some: {
            id: params.id,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ message: 'Товар не найден' }, { status: 404 });
    }

    const itemsCount = await prisma.productItem.count({
      where: {
        productId: product.id,
      },
    });

    if (itemsCount < 2) {
      return NextResponse.json(
        { message: 'Нельзя удалить последний вариант товара! Сначала добавьте еще один вариант.' },
        { status: 400 },
      );
    }

    await prisma.productItem.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: 'Вариант товара удален' }, { status: 200 });
  } catch (err) {
    console.log('[DELETE_PRODUCTITEM] Error', err);
    return NextResponse.json({ message: '[DELETE_PRODUCTITEM] Error' }, { status: 500 });
  }
}
