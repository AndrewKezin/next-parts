import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

//  поиск по продуктам (api/products/search?query=qweqwe)
// типизация запроса - NextRequest
// Vercel не обрабатывает регистры символов в посковых запросах на кириллице
export async function GET(req: NextRequest) {
  // вытащить значение параметра query из адресной строки. Если нет параметра query, вернет пустую строку
  const query = req.nextUrl.searchParams.get('query') || '';

  // переменная modifiedQuery - это попытка обойти косяк Vercel с регистром в поисковых запросах на кириллице
  let modifiedQuery: string;
  query.length > 1 ? (modifiedQuery = query.slice(1)) : (modifiedQuery = query);

  // получить список всех товаров
  const products = await prisma.product.findMany({
    where: {
      name: {
        // содержит строку query или, если начинается с заглавной буквы, то искать со 2-го символа (это очень дурацкий код чтобы хоть как-то обойти неспособность Vercel с регистром в поисковых запросах на кириллице)
        contains: modifiedQuery,
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
