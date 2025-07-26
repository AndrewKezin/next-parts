import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

// получение всех возможных вариантов толщины дисков, количества зубов и объема канистры масла в виде массива объектов
export async function GET(req: NextRequest) {
  const quantity = req.nextUrl.searchParams.get('quant') || '';

  const productItems = await prisma.productItem.findMany({
    where: quantity ? { quantity: { lte: Number(quantity) } } : {},
    select: {
      id: true,
      quantity: true,
      thickness: true,
      quantityOfTeeth: true,
      volume: true,
    },
  });

  return NextResponse.json(productItems);
}
