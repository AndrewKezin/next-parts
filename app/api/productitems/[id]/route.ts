import { prisma } from '@/prisma/prisma-client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { FetchProducts } from '@/services/dto/cart.dto';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
    }

    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Недостаточно прав' }, { status: 403 });
    }

    const productItem = await prisma.productItem.findFirst({
      where: {
        id: Number(params.id),
      },
      select: {
          product: {
            include: {
              category: true,
              ingredients: true,
              items: {
                where: {
                    id: Number(params.id),
                }
              },
              gearboxesManufacturers: true,
            }
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
