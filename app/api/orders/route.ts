import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { OrderStatus } from '@prisma/client';
import { checkAdminRules } from '@/lib/check-admin-rules';

// запрос на получение всех заказов для админки
//  поиск по заказам (api/orders?query=qweqwe)
// типизация запроса - NextRequest
// Vercel не обрабатывает регистры символов в посковых запросах на кириллице

export async function GET(req: NextRequest) {
  // вытащить значения параметров из адресной строки. Если нет параметра, то вернет пустую строку
  const query = req.nextUrl.searchParams.get('query') || '';
  const orderStatus = req.nextUrl.searchParams.get('orderStatus') || '';
  const dateFrom = req.nextUrl.searchParams.get('date[from]') || '';
  const dateTo = req.nextUrl.searchParams.get('date[to]') || '';
  const startIndex = req.nextUrl.searchParams.get('startIndex');
  const itemsPerPage = req.nextUrl.searchParams.get('itemsPerPage');

  // переменная modifiedQuery - это попытка обойти косяк Vercel с регистром в поисковых запросах на кириллице
  let modifiedQuery: string;
  query.length > 1 ? (modifiedQuery = query.slice(1)) : (modifiedQuery = query);

  try {
    const adminRules = await checkAdminRules(true);

    if (adminRules.status !== 200) {
      return NextResponse.json({ message: adminRules.message }, { status: adminRules.status });
    }

    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          OR: query
            ? [
                {
                  phone: {
                    contains: modifiedQuery,
                  },
                },
                {
                  fullName: {
                    contains: modifiedQuery,
                    mode: 'insensitive',
                  },
                },
                {
                  email: {
                    contains: modifiedQuery,
                    mode: 'insensitive',
                  },
                },
                {
                  address: {
                    contains: modifiedQuery,
                    mode: 'insensitive',
                  },
                },
              ]
            : undefined,
          status: orderStatus
            ? {
                equals: orderStatus as OrderStatus,
              }
            : undefined,
          createdAt: {
            gte: dateFrom ? new Date(dateFrom) : undefined,
            lte: dateTo ? new Date(dateTo) : undefined,
          },
        },
        skip: startIndex ? Number(startIndex) : undefined,
        take: itemsPerPage ? Number(itemsPerPage) : undefined,
      }),
      prisma.order.count({
        where: {
          OR: query
            ? [
                {
                  phone: {
                    contains: modifiedQuery,
                  },
                },
                {
                  fullName: {
                    contains: modifiedQuery,
                    mode: 'insensitive',
                  },
                },
                {
                  email: {
                    contains: modifiedQuery,
                    mode: 'insensitive',
                  },
                },
                {
                  address: {
                    contains: modifiedQuery,
                    mode: 'insensitive',
                  },
                },
              ]
            : undefined,
          status: orderStatus
            ? {
                equals: orderStatus as OrderStatus,
              }
            : undefined,
          createdAt: {
            gte: dateFrom ? new Date(dateFrom) : undefined,
            lte: dateTo ? new Date(dateTo) : undefined,
          },
        },
      }),
    ]);

    return NextResponse.json({ orders, totalCount });
  } catch (err) {
    console.log('[GET_ORDERS] Error', err);
    return NextResponse.json({ message: '[GET_ORDERS] Error' }, { status: 500 });
  }
}
