import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { title } from 'process';

//  поиск по продуктам (api/products/search?query=qweqwe)
// типизация запроса - NextRequest
// Vercel не обрабатывает регистры символов в посковых запросах на кириллице, поэтому сделаем два варианта запроса
export async function GET(req: NextRequest) {
    // вытащить значение параметра query из адресной строки. Если нет параметра query, вернет пустую строку
  const query = req.nextUrl.searchParams.get('query') || '';
  // тот же запрос, но с заглавной буквы
  const titleQuery = query[0].toUpperCase() + query.slice(1);

  // получить список всех товаров
  const products = await prisma.product.findMany({
    where: {
        name: {
            // содержит строку query или начинается с заглавной буквы (это очень дурацкий код чтобы хоть как-то обойти неспособность Vercel с регистром в поисковых запросах на кириллице)
            contains: titleQuery && query.length > 1 ? query.slice(1) : titleQuery,
            // не учитывает регистр
            // mode: 'insensitive',
        },
    },
    // вернуть первые 5 товаров
    take: 5,
  });

  // вернуть список найденных товаров
  return NextResponse.json(products);
}
