import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/prisma/prisma-client';
import intersection from 'lodash/intersection';

export type ItemsType = {
  id: number;
  price: number;
};
export interface FilteredArray {
  items: ItemsType[];
}

// запрос на получение всех товаров для админки
//  поиск по товарам (api/products?query=qweqwe)
// типизация запроса - NextRequest
// Vercel не обрабатывает регистры символов в посковых запросах на кириллице
export async function GET(req: NextRequest) {
  const productName = req.nextUrl.searchParams.get('productName') || '';
  const prodManufIds = req.nextUrl.searchParams.get('manufacturers');
  const prodIngredIds = req.nextUrl.searchParams.get('ingredients');
  const prodCatIds = req.nextUrl.searchParams.get('categories');
  const productPriceFrom = req.nextUrl.searchParams.get('priceFrom') || '0';
  const productPriceTo = req.nextUrl.searchParams.get('priceTo') || '100000';
  const prodQuantVariants = req.nextUrl.searchParams.get('quantityOfTeeth');
  const prodThicknVariants = req.nextUrl.searchParams.get('thickness');
  const prodVolumeVariants = req.nextUrl.searchParams.get('volume');

  // переменная modifiedQuery - это попытка обойти косяк Vercel с регистром в поисковых запросах на кириллице
  let modifiedQuery: string;
  productName.length > 1 ? (modifiedQuery = productName.slice(1)) : (modifiedQuery = productName);

  enum SEARCHPRICERANGE {
    FROM = '0',
    TO = '100000',
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
    }

    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Недостаточно прав' }, { status: 403 });
    }

    if (Number(productPriceFrom) > Number(productPriceTo)) {
      return NextResponse.json({ message: 'Некорректные значения цен' }, { status: 400 });
    }

    // общее количество товаров в БД
    const totalCount = await prisma.product.count();

    // если все фильры (кроме цен) не заданы, то возвращаем все товары
    if (!productName && !prodManufIds && !prodIngredIds && !prodCatIds && !prodQuantVariants && !prodThicknVariants && !prodVolumeVariants) {
      const res = await prisma.product.findMany({
        orderBy: {
          name: 'asc',
        },
        include: {
          items: {
            where: {
              price: {
                gt: Number(productPriceFrom),
                lte: Number(productPriceTo),
              },
            },  
          },
          ingredients: true,
          category: true,
          gearboxesManufacturers: true,
        },
      });

      return NextResponse.json({products: res, totalCount});
    }

    // поиск по названию
    const arrByName: FilteredArray[] = productName
      ? [
          ...(await prisma.product.findMany({
            orderBy: {
              name: 'asc',
            },
            where: {
              name: {
                contains: modifiedQuery,
                mode: 'insensitive',
              },
            },
            select: {
              items: {
                select: {
                  id: true,
                  price: true,
                },
              },
            },
          })),
        ]
      : [];

    // поиск по производителям
    const arrByManuf: FilteredArray[] = prodManufIds
      ? [
          ...(await prisma.product.findMany({
            orderBy: {
              name: 'asc',
            },
            where: {
              gearboxesManufacturers: {
                some: {
                  id: {
                    in: prodManufIds.split(',').map(Number),
                  },
                },
              },
            },
            select: {
              items: {
                select: {
                  id: true,
                  price: true,
                },
              },
            },
          })),
        ]
      : [];

    // поиск по ингредиентам
    const arrByIngred: FilteredArray[] = prodIngredIds
      ? [
          ...(await prisma.product.findMany({
            orderBy: {
              name: 'asc',
            },
            where: {
              ingredients: {
                some: {
                  id: {
                    in: prodIngredIds.split(',').map(Number),
                  },
                },
              },
            },
            select: {
              items: {
                select: {
                  id: true,
                  price: true,
                },
              },
            },
          })),
        ]
      : [];

    // поиск по категориям
    const arrByCat: FilteredArray[] = prodCatIds
      ? [
          ...(await prisma.product.findMany({
            orderBy: {
              name: 'asc',
            },
            where: {
              category: {
                id: {
                  in: prodCatIds.split(',').map(Number),
                },
              },
            },
            select: {
              items: {
                select: {
                  id: true,
                  price: true,
                },
              },
            },
          })),
        ]
      : [];

    // поиск по количеству зубов диска
    const arrByQuant: ItemsType[] = prodQuantVariants
      ? [
          ...(await prisma.productItem.findMany({
            where: {
              quantityOfTeeth: {
                in: prodQuantVariants.split(',').map(Number),
              },
            },
            select: {
              id: true,
              price: true,
            },
          })),
        ]
      : [];

    // поиск по толщине диска
    const arrByThickn: ItemsType[] = prodThicknVariants
      ? [
          ...(await prisma.productItem.findMany({
            where: {
              thickness: {
                in: prodThicknVariants.split(',').map(Number),
              },
            },
            select: {
              id: true,
              price: true,
            },
          })),
        ]
      : [];

    // поиск по объему канистры масла
    const arrByVolume: ItemsType[] = prodVolumeVariants
      ? [
          ...(await prisma.productItem.findMany({
            where: {
              volume: {
                in: prodVolumeVariants.split(',').map(Number),
              },
            },
            select: {
              id: true,
              price: true,
            },
          })),
        ]
      : [];

    // функция фильтрации по стоимости
    const filterProdByPrice = (
      priceFrom: string | SEARCHPRICERANGE.FROM,
      priceTo: string | SEARCHPRICERANGE.TO,
      arr?: FilteredArray[] | null,
      arrItems?: ItemsType[] | null,
    ): number[] => {
      let resArr;

      if (arr) {
        resArr = arr
          .map((item) =>
            item.items
              .filter((i) => i.price >= Number(priceFrom) && i.price <= Number(priceTo))
              .map((i) => i.id),
          )
          .flat();
      }

      if (arrItems) {
        resArr = arrItems
          .filter((i) => i.price >= Number(priceFrom) && i.price <= Number(priceTo))
          .map((i) => i.id);
      }

      return resArr ? resArr : [];
    };

    // массивы товаров, отфильтрованные по диапазону цен
    const nameInPriceRange =
      arrByName.length > 0 ? filterProdByPrice(productPriceFrom, productPriceTo, arrByName) : [];
    const manufInPriceRange =
      arrByManuf.length > 0 ? filterProdByPrice(productPriceFrom, productPriceTo, arrByManuf) : [];
    const ingredInPriceRange =
      arrByIngred.length > 0
        ? filterProdByPrice(productPriceFrom, productPriceTo, arrByIngred)
        : [];
    const catInPriceRange =
      arrByCat.length > 0 ? filterProdByPrice(productPriceFrom, productPriceTo, arrByCat) : [];
    const quantInPriceRange =
      arrByQuant.length > 0
        ? filterProdByPrice(productPriceFrom, productPriceTo, null, arrByQuant)
        : [];
    const thicknInPriceRange =
      arrByThickn.length > 0
        ? filterProdByPrice(productPriceFrom, productPriceTo, null, arrByThickn)
        : [];
    const volumeInPriceRange =
      arrByVolume.length > 0
        ? filterProdByPrice(productPriceFrom, productPriceTo, null, arrByVolume)
        : [];

    // функция пересечения фильтров
    const getResultArr = (
      arr1: number[],
      arr2: number[],
      arr3: number[],
      arr4: number[],
      arr5: number[],
      arr6: number[],
      arr7: number[],
    ): number[] => {
      // пропускаем пустые массивы
      const tempArr = [arr1, arr2, arr3, arr4, arr5, arr6, arr7].filter((arr) => arr.length > 0);
      // выполняем пересечение (получаем итоговый массив, в котором есть только элементы, которые есть во всех массивах)
      const resultArr = intersection(...tempArr).sort((a, b) => a - b);
      return resultArr;
    };

    // финальный массив itemId из отфильтрованных товаров
    const resultArr = getResultArr(
      nameInPriceRange,
      manufInPriceRange,
      ingredInPriceRange,
      catInPriceRange,
      quantInPriceRange,
      thicknInPriceRange,
      volumeInPriceRange,
    );

    const products = await prisma.product.findMany({
      where: {
        items: {
          some: {
            id: {
              in: resultArr,
            },
          },
        },
      },
      include: {
        items: {
          where: {
            price: {
              gte: Number(productPriceFrom),
              lte: Number(productPriceTo),
            },
          },
        },
        ingredients: true,
        gearboxesManufacturers: true,
        category: true,
      },
    });

    // console.log('[GET_PRODUCTS 257] nameInPriceRange', nameInPriceRange);
    // console.log('[GET_PRODUCTS 258] manufInPriceRange', manufInPriceRange);
    // console.log('[GET_PRODUCTS 259] ingredInPriceRange', ingredInPriceRange);
    // console.log('[GET_PRODUCTS 260] catInPriceRange', catInPriceRange);
    // console.log('[GET_PRODUCTS 261] quantInPriceRange', quantInPriceRange);
    // console.log('[GET_PRODUCTS 262] thicknInPriceRange', thicknInPriceRange);
    // console.log('[GET_PRODUCTS 263] volumeInPriceRange', volumeInPriceRange);
    // console.log('[GET_PRODUCTS 264] resultArr', resultArr);
    // console.log('[GET_PRODUCTS 265] fetchedProducts', products);

    return NextResponse.json({ products, totalCount });
  } catch (err) {
    console.log('[GET_PRODUCTS] Error', err);
    return NextResponse.json({ message: '[GET_PRODUCTS] Error' }, { status: 500 });
  }
}
