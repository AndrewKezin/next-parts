import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { FetchProducts } from '@/services/dto/cart.dto';
import { checkAdminRules } from '@/lib/check-admin-rules';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminRules = await checkAdminRules(true);

    if (adminRules.status !== 200) {
      return NextResponse.json({ message: adminRules.message }, { status: adminRules.status });
    }

    const product = await prisma.product.findFirst({
      where: {
        id: params.id,
      },
      include: {
        category: true,
        ingredients: true,
        items: true,
        gearboxesManufacturers: true,
      },
    });

    const products = product ? [product] : [];
    const totalCount = 1;
    const res: FetchProducts = { products, totalCount };

    return NextResponse.json(res);
  } catch (err) {
    console.log('[GET_PRODUCT] Error', err);
    return NextResponse.json({ message: '[GET_PRODUCT] Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminRules = await checkAdminRules(true);

    if (adminRules.status !== 200) {
      return NextResponse.json({ message: adminRules.message }, { status: adminRules.status });
    }

    if (!params.id) {
      return NextResponse.json({ message: 'Некорректные данные' }, { status: 400 });
    }

    await prisma.productItem.deleteMany({
      where: {
        productId: params.id,
      },
    });

    await prisma.product.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: 'Товар удален' }, { status: 200 });
  } catch (err) {
    console.log('[DELETE_PRODUCT] Error', err);
    return NextResponse.json({ message: '[DELETE_PRODUCT] Error', err }, { status: 500 });
  }
}
