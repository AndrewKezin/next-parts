import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

//  поиск по продуктам (api/products/search?query=qweqwe)
// типизация запроса - NextRequest
// Vercel не обрабатывает регистры символов в посковых запросах на кириллице, поэтому сделаем два варианта запроса
export async function GET(req: NextRequest) {
    // вытащить значение параметра query из адресной строки. Если нет параметра query, вернет пустую строку
  const query = req.nextUrl.searchParams.get('query') || '';

  // получить список всех товаров
  const products = await prisma.product.findMany({
    where: {
        name: {
            // содержит строку query или, если начинается с заглавной буквы, то искать со 2-го символа (это очень дурацкий код чтобы хоть как-то обойти неспособность Vercel с регистром в поисковых запросах на кириллице)
            contains: query.length > 1 ? query.slice(1) : query,
            // не учитывает регистр
            mode: 'insensitive',
        },
    },
    // вернуть первые 5 товаров
    // take: 5,
  });

  // вернуть список найденных товаров
  return NextResponse.json(products);
}
