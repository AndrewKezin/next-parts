import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

//  поиск по продуктам (api/products/search?query=qweqwe)
// типизация запроса - NextRequest
export async function GET(req: NextRequest) {
    // вытащить значение параметра query из адресной строки. Если нет параметра query, вернет пустую строку
  const query = req.nextUrl.searchParams.get('query') || '';

  // получить список всех товаров
  const products = await prisma.product.findMany({
    where: {
        name: {
            // содержит строку query
            contains: query,
            // не учитывает регистр
            mode: 'insensitive',
        },
    },
    // вернуть первые 5 товаров
    take: 5,
  });

  // вернуть список найденных товаров
  return NextResponse.json(products);
}
